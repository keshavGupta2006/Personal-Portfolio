import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ExternalLink, Play } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ease = [0.76, 0, 0.24, 1];

function rarityColor(r) {
  if (r === "Legendary") return "#ff8128";
  if (r === "Epic") return "#b86bd6";
  if (r === "Rare") return "#5fa8d4";
  return "#9c7e4a";
}

export default function Work() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let m = true;
    axios
      .get(`${API}/projects`)
      .then((r) => m && setProjects(r.data || []))
      .catch(() => {});
    return () => {
      m = false;
    };
  }, []);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 lg:py-40 border-t border-[var(--border)]"
      data-testid="work-section"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="label mb-4">✦ Quest Log ✦</div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--fg)]">
            <span className="italic text-[var(--accent)]">Projects</span>
          </h2>
          <p className="mt-4 text-[var(--fg-dim)] text-sm">
            Legendary encounters conquered. Each worth remembering.
          </p>
        </motion.div>

        <div className="space-y-6 lg:space-y-7">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-80px" }}
              className="parchment rounded-md p-6 sm:p-8 relative group"
              data-testid={`project-row-${p.id}`}
            >
              <span className="corner-tl" />
              <span className="corner-tr" />
              <span className="corner-bl" />
              <span className="corner-br" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Thumbnail */}
                <div className="md:col-span-4 lg:col-span-3">
                  <div className="relative overflow-hidden rounded-sm aspect-[4/3] border border-[var(--border-strong)]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f24]/80 to-transparent" />
                    <div className="absolute top-2 left-2 label-dim flex items-center gap-2">
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ background: rarityColor(p.rarity) }}
                      />
                      <span style={{ color: rarityColor(p.rarity) }}>
                        {p.rarity}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 label-dim text-[var(--fg-dim)]">
                      {p.year}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-8 lg:col-span-7">
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <span className="label-dim">QUEST {p.index}</span>
                    <h3 className="font-display text-3xl lg:text-4xl text-[var(--fg)] leading-tight">
                      {p.title}
                    </h3>
                  </div>
                  <div className="mt-2 text-[var(--accent-2)] text-sm">
                    {p.role}
                  </div>
                  <p className="mt-4 text-[var(--fg-dim)] text-sm leading-relaxed max-w-2xl">
                    {p.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--border-strong)] text-[var(--fg-dim)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-12 lg:col-span-2 flex flex-row lg:flex-col gap-3 lg:items-end">
                  <a
                    href={p.url || "#"}
                    onClick={(e) => !p.url && e.preventDefault()}
                    className="btn-ghost"
                    data-testid={`project-link-${p.id}`}
                  >
                    <ExternalLink size={12} /> Link
                  </a>
                  <button
                    className="btn-ghost"
                    onClick={(e) => e.preventDefault()}
                    data-testid={`project-demo-${p.id}`}
                  >
                    <Play size={12} /> Demo
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
