from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    index: str
    title: str
    role: str
    year: str
    stack: List[str]
    description: str
    image: str
    url: Optional[str] = None
    rarity: str = "Rare"


class Experience(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    level: int
    company: str
    role: str
    period: str
    description: str
    stack: List[str]
    location: str
    current: bool = False


class Achievement(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    sub: str
    rank: str  # "1st", "2nd", "Finalist", "Lead", etc.


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=4000)


# ---------- Seeded Data ----------
PROJECTS: List[Project] = [
    Project(
        id="proj-orbit",
        index="I",
        title="Orbit Console",
        role="Solo · Lead Engineer",
        year="2025",
        stack=["React", "FastAPI", "MongoDB", "WebSockets"],
        description=(
            "A real-time observability dashboard for distributed systems. "
            "Streaming metrics, log search, and incident timelines, all "
            "steered by a single keyboard-driven command bar."
        ),
        image="https://static.prod-images.emergentagent.com/jobs/348839a8-0406-492d-9aad-6bd977e41575/images/31f11aec0fb31305869326c5954a7046d4d58351bd0b10714338c9e6a88d2d08.png",
        rarity="Legendary",
        url=None,
    ),
    Project(
        id="proj-glass",
        index="II",
        title="Glasshouse Studio",
        role="Design Engineer",
        year="2025",
        stack=["Next.js", "GSAP", "Three.js"],
        description=(
            "Award-leaning marketing site for an indie design studio. WebGL "
            "transitions, magnetic interactions, and a custom asset pipeline."
        ),
        image="https://static.prod-images.emergentagent.com/jobs/348839a8-0406-492d-9aad-6bd977e41575/images/97d9015ae76ec2301f4b9c6db61b94a4cf97f9cf0a076873db41b099ac3b11a8.png",
        rarity="Epic",
        url=None,
    ),
    Project(
        id="proj-paper",
        index="III",
        title="Paperweight",
        role="Founder · Engineer",
        year="2024",
        stack=["Python", "LLMs", "React"],
        description=(
            "A research note-taking tool that turns scattered PDFs into a "
            "queryable, citation-aware knowledge graph. Built as a side "
            "quest during sophomore year."
        ),
        image="https://static.prod-images.emergentagent.com/jobs/348839a8-0406-492d-9aad-6bd977e41575/images/9189a4adca60b82de849789e25a2e91edb0239131657ee7d97bba2e729617ad6.png",
        rarity="Rare",
        url=None,
    ),
    Project(
        id="proj-signal",
        index="IV",
        title="Signal/Noise",
        role="Engineer · Sound Design",
        year="2024",
        stack=["Web Audio", "Canvas", "React"],
        description=(
            "An interactive zine exploring information overload. Generative "
            "audio reacts to scroll position; every section speaks a "
            "different visual language."
        ),
        image="https://static.prod-images.emergentagent.com/jobs/348839a8-0406-492d-9aad-6bd977e41575/images/aadeaa0e389885bb0a9234114eb15dbf2f293d48ed8108912489b6d9f4d4fe81.png",
        rarity="Rare",
        url=None,
    ),
]

EXPERIENCES: List[Experience] = [
    Experience(
        id="exp-aurora",
        level=22,
        company="Aurora Labs",
        role="Software Engineer (Intern)",
        period="May 2025 — Aug 2025",
        description=(
            "Owned the rebuild of the in-product analytics surface. Shipped "
            "a new event pipeline, cut p95 query latency by 38%, and led "
            "two cross-team design reviews."
        ),
        stack=["TypeScript", "React", "Postgres", "Kafka"],
        location="Remote",
        current=True,
    ),
    Experience(
        id="exp-foundry",
        level=20,
        company="The Foundry Co.",
        role="Frontend Engineer (Part-time)",
        period="Sep 2024 — Apr 2025",
        description=(
            "Rebuilt the marketing site with a custom CMS and a motion "
            "system used across all studio sites. Mentored two juniors on "
            "accessibility and component patterns."
        ),
        stack=["Next.js", "GSAP", "Sanity"],
        location="Hybrid",
        current=False,
    ),
    Experience(
        id="exp-camp",
        level=18,
        company="CampusOS",
        role="Open-Source Maintainer",
        period="Jan 2024 — Present",
        description=(
            "Maintain a small framework used by student clubs to run "
            "internal tooling. ~1.2k stars, weekly releases, very kind "
            "issue threads."
        ),
        stack=["Python", "FastAPI", "Vite"],
        location="GitHub",
        current=False,
    ),
    Experience(
        id="exp-uni",
        level=16,
        company="State University · CS",
        role="B.S. Computer Science",
        period="2022 — 2026",
        description=(
            "Coursework in distributed systems, ML, HCI. TA'd intro to "
            "programming for three semesters. Built a small lecture-notes "
            "search tool that is somehow still alive."
        ),
        stack=["Algorithms", "Systems", "HCI"],
        location="Campus",
        current=False,
    ),
]

ACHIEVEMENTS: List[Achievement] = [
    Achievement(id="a1", title="Hackathon Open", sub="Campus · Winners", rank="1st"),
    Achievement(id="a2", title="NASA Space Apps", sub="Global · Nominee", rank="Nominee"),
    Achievement(id="a3", title="Founders Showcase", sub="Demo Day", rank="2nd"),
    Achievement(id="a4", title="GDSC Chapter", sub="Lead · 1y", rank="Lead"),
    Achievement(id="a5", title="ICPC Regional", sub="Round of 32", rank="Finalist"),
    Achievement(id="a6", title="Type-A-Day", sub="365 days of writing", rank="Streak"),
]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Portfolio API online"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.get("/projects", response_model=List[Project])
async def list_projects():
    return PROJECTS


@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    for p in PROJECTS:
        if p.id == project_id:
            return p
    raise HTTPException(status_code=404, detail="Project not found")


@api_router.get("/experiences", response_model=List[Experience])
async def list_experiences():
    return EXPERIENCES


@api_router.get("/achievements", response_model=List[Achievement])
async def list_achievements():
    return ACHIEVEMENTS


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(
        name=payload.name.strip(),
        email=payload.email,
        message=payload.message.strip(),
    )
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for c in items:
        if isinstance(c.get('created_at'), str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return items


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
