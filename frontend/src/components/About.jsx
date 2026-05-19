import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Github,
  Mail,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
  FileText,
  Award,
} from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ease = [0.76, 0, 0.24, 1];

const PORTRAIT =
  "https://static.prod-images.emergentagent.com/jobs/348839a8-0406-492d-9aad-6bd977e41575/images/aadeaa0e389885bb0a9234114eb15dbf2f293d48ed8108912489b6d9f4d4fe81.png";

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "FastAPI",
  "Node.js",
  "MongoDB",
  "Postgres",
  "Three.js",
  "Tailwind",
  "Docker",
  "AWS",
  "Figma",
  "Git",
];

const socials = [
  { Icon: Linkedin, href: "https://linkedin.com", label: "linkedin" },
  { Icon: Mail, href: "mailto:hello@wanderer.dev", label: "email" },
  { Icon: Github, href: "https://github.com", label: "github" },
  { Icon: Youtube, href: "https://youtube.com", label: "youtube" },
  { Icon: Twitter, href: "https://x.com", label: "twitter" },
  { Icon: Globe, href: "#", label: "blog" },
];

function rankColor(rank) {
  if (rank === "1st" || rank === "Lead") return "#d4a13a";
  if (rank === "2nd" || rank === "Finalist") return "#c0c8d4";
  if (rank === "Nominee") return "#ff8128";
  return "#9c7e4a";
}

export default function About() {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    let m = true;
    axios
      .get(`${API}/achievements`)
      .then((r) => m && setAchievements(r.data || []))
      .catch(() => {});
    return () => {
      m = false;
    };
  }, []);

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
      data-testid="about-section"
    >
      {/* Side torch decorations */}
      <Torch position="left" />
      <Torch position="right" />

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="label mb-4">✦ About ✦</div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--fg)]">
            Character <span className="text-[var(--accent)] italic">Sheet</span>
          </h2>
        </motion.div>

        {/* Character sheet card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
          data-testid="character-sheet"
        >
          {/* Portrait card */}
          <div className="lg:col-span-5">
            <div className="parchment rounded-md p-1 relative">
              <span className="corner-tl" />
              <span className="corner-tr" />
              <span className="corner-bl" />
              <span className="corner-br" />
              <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
                <img
                  src={PORTRAIT}
                  alt="Portrait"
                  className="w-full h-full object-cover grayscale-[20%] sepia-[15%]"
                  data-testid="about-portrait"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f24] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-2">
                  <div>
                    <div className="font-display text-3xl sm:text-4xl text-[var(--fg)] leading-none">
                      Wanderer
                    </div>
                    <div className="label-dim mt-2 text-[var(--accent)]">
                      ✦ Explorer ✦
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="label-dim">Lv.</div>
                    <div className="font-display text-3xl text-[var(--gold)] leading-none">
                      22
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio + skills + connect */}
          <div className="lg:col-span-7">
            <div className="parchment rounded-md p-7 sm:p-9 relative h-full">
              <span className="corner-tl" />
              <span className="corner-tr" />
              <span className="corner-bl" />
              <span className="corner-br" />

              <p className="text-[var(--fg)] text-base leading-relaxed">
                Hi, I&apos;m a{" "}
                <span className="text-[var(--accent)] font-semibold">
                  software developer
                </span>{" "}
                and a{" "}
                <span className="text-[var(--accent)] font-semibold">
                  computer science student
                </span>{" "}
                — somewhere between a sophomore&apos;s curiosity and a
                senior&apos;s discipline. I love building things, picking up
                new stacks, and exploring weird corners of the web. I&apos;m a
                generalist who enjoys taking problems from idea → prototype →
                product.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 chip">
                <Award size={14} className="text-[var(--accent)]" />
                <span>State University CS · 2022–2026</span>
              </div>

              {/* Skills */}
              <div className="mt-8">
                <div className="label mb-4">Skills</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, ease, delay: i * 0.02 }}
                      viewport={{ once: true }}
                      className="chip"
                      data-testid={`skill-${s.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Connect */}
              <div className="mt-8">
                <div className="label mb-4">Connect</div>
                <div className="flex flex-wrap items-center gap-3">
                  {socials.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-btn"
                      aria-label={label}
                      data-testid={`social-${label}`}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                  <a
                    href="#"
                    className="btn-quest"
                    data-testid="resume-btn"
                  >
                    <FileText size={14} />
                    Resume
                  </a>
                </div>
                <div className="mt-4 label-dim">
                  Loves doodling · Loves travelling · Loves playing chess
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <div className="mt-20 lg:mt-24" data-testid="achievements-section">
          <div className="text-center mb-10">
            <div className="label mb-3">✦ Achievements Unlocked ✦</div>
            <div className="ornament max-w-md mx-auto">
              <span className="font-mono text-xs">VI of VI</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease, delay: i * 0.06 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
                data-testid={`achievement-${a.id}`}
              >
                <Medallion rank={a.rank} color={rankColor(a.rank)} />
                <div className="mt-3 text-[var(--fg)] text-sm font-medium">
                  {a.title}
                </div>
                <div className="label-dim mt-1 text-[10px]">{a.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Medallion({ rank, color }) {
  return (
    <div
      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
      style={{
        background:
          "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.08), transparent 60%), #0e1428",
        border: `1.5px solid ${color}`,
        boxShadow: `0 0 20px -2px ${color}40, inset 0 0 16px -4px ${color}30`,
      }}
    >
      <div
        className="absolute inset-2 rounded-full border"
        style={{ borderColor: `${color}55` }}
      />
      <span
        className="font-display text-xl sm:text-2xl"
        style={{ color }}
      >
        {rank}
      </span>
    </div>
  );
}

function Torch({ position }) {
  return (
    <div
      className={`hidden lg:flex absolute top-32 ${
        position === "left" ? "left-6" : "right-6"
      } flex-col items-center pointer-events-none z-0`}
    >
      <div className="torch-flame relative">
        <div
          className="w-3 h-6 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, #ffd58a 0%, #ff8128 60%, transparent 100%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute inset-0 w-3 h-6 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, #fff1c2 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="w-2 h-16 bg-[#3a2810] mt-1 rounded-sm" />
      <div className="w-px h-24 bg-gradient-to-b from-[var(--gold)]/30 to-transparent mt-1" />
    </div>
  );
}
