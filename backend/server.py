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
    index: str  # "001"
    title: str
    role: str
    year: str
    stack: List[str]
    description: str
    image: str
    url: Optional[str] = None


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


# ---------- Seeded Projects (static portfolio data) ----------
PROJECTS: List[Project] = [
    Project(
        id="proj-orbit",
        index="001",
        title="Orbit Console",
        role="Full-Stack / UI Engineering",
        year="2025",
        stack=["React", "FastAPI", "MongoDB", "WebSockets"],
        description=(
            "A real-time observability dashboard for distributed systems. "
            "Streaming metrics, log search, and incident timelines built around "
            "a single keyboard-driven command bar."
        ),
        image="https://static.prod-images.emergentagent.com/jobs/348839a8-0406-492d-9aad-6bd977e41575/images/31f11aec0fb31305869326c5954a7046d4d58351bd0b10714338c9e6a88d2d08.png",
        url=None,
    ),
    Project(
        id="proj-glass",
        index="002",
        title="Glasshouse Studio",
        role="Design Engineer",
        year="2025",
        stack=["Next.js", "GSAP", "Three.js"],
        description=(
            "Award-leaning marketing site for an indie design studio. WebGL "
            "transitions, magnetic interactions, and a custom asset pipeline."
        ),
        image="https://static.prod-images.emergentagent.com/jobs/348839a8-0406-492d-9aad-6bd977e41575/images/97d9015ae76ec2301f4b9c6db61b94a4cf97f9cf0a076873db41b099ac3b11a8.png",
        url=None,
    ),
    Project(
        id="proj-paper",
        index="003",
        title="Paperweight",
        role="Founder / Engineer",
        year="2024",
        stack=["Python", "LLMs", "React"],
        description=(
            "A research note-taking tool that turns scattered PDFs into a "
            "queryable, citation-aware knowledge graph. Built as a side "
            "project during sophomore year."
        ),
        image="https://static.prod-images.emergentagent.com/jobs/348839a8-0406-492d-9aad-6bd977e41575/images/9189a4adca60b82de849789e25a2e91edb0239131657ee7d97bba2e729617ad6.png",
        url=None,
    ),
    Project(
        id="proj-signal",
        index="004",
        title="Signal/Noise",
        role="Engineer / Sound Design",
        year="2024",
        stack=["Web Audio", "Canvas", "React"],
        description=(
            "An interactive zine exploring information overload. Generative "
            "audio reacts to scroll position, and every section is a fully "
            "different visual language."
        ),
        image="https://static.prod-images.emergentagent.com/jobs/348839a8-0406-492d-9aad-6bd977e41575/images/aadeaa0e389885bb0a9234114eb15dbf2f293d48ed8108912489b6d9f4d4fe81.png",
        url=None,
    ),
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
