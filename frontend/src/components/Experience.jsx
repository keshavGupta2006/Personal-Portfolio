import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { MapPin } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ease = [0.76, 0, 0.24, 1];

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let m = true;
    axios
      .get(`${API}/experiences`)
      .then((r) => m && setExperiences(r.data || []))
      .catch(() => {});
    return () => {
      m = false;
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative py-24 sm:py-32 lg:py-40 border-t border-[var(--border)]"
      data-testid="experience-section"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="label mb-4">✦ Journey so far ✦</div>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[var(--fg)]">
            <span className="italic text-[var(--accent)]">Experience</span>
          </h2>
          <p className="mt-4 text-[var(--fg-dim)] text-sm">
            Every stop, a story. Every role, a reason.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Trail map */}
          <div className="lg:col-span-5 relative">
            <div className="parchment rounded-md p-6 sm:p-8 relative min-h-[500px]">
              <span className="corner-tl" />
              <span className="corner-tr" />
              <span className="corner-bl" />
              <span className="corner-br" />

              <div className="label-dim mb-6 flex items-center gap-2">
                <MapPin size={12} className="text-[var(--accent)]" />
                <span>Campsites along the trail</span>
              </div>

              <TrailMap
                items={experiences}
                active={active}
                onSelect={setActive}
              />
            </div>
          </div>

          {/* Card list */}
          <div className="lg:col-span-7 space-y-5">
            {experiences.map((exp, i) => (
              <motion.button
                key={exp.id}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                viewport={{ once: true }}
                className={`w-full text-left parchment rounded-md p-6 sm:p-7 relative block transition-all duration-500 ${
                  active === i
                    ? "border-[var(--accent)] shadow-[0_0_0_1px_rgba(255,129,40,0.3),0_20px_60px_-20px_rgba(255,129,40,0.25)]"
                    : "hover:border-[var(--border-strong)]"
                }`}
                data-testid={`experience-card-${exp.id}`}
              >
                <span className="corner-tl" />
                <span className="corner-tr" />
                <span className="corner-bl" />
                <span className="corner-br" />

                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display text-2xl text-[var(--fg)]">
                        {exp.company}
                      </h3>
                      {exp.current && (
                        <span className="text-[10px] font-mono text-[var(--accent)] border border-[var(--accent)]/40 px-2 py-0.5 rounded-full">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] mr-1.5 ember-pulse" />
                          Active quest
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-[var(--accent-2)] text-sm">
                      {exp.role}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="label-dim">Lv. {exp.level}</div>
                    <div className="text-xs text-[var(--fg-dim)] mt-1 font-mono tracking-wider">
                      {exp.period}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-[var(--fg-dim)] text-sm leading-relaxed">
                  {exp.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--border-strong)] text-[var(--fg-dim)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrailMap({ items, active, onSelect }) {
  if (!items.length) return null;
  const w = 280;
  const h = 440;
  const points = items.map((_, i) => {
    const t = i / Math.max(1, items.length - 1);
    const x = w / 2 + Math.sin(i * 1.4) * 70;
    const y = 60 + t * (h - 120);
    return { x, y };
  });

  // build a smooth curve through points
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const cx = (prev.x + cur.x) / 2;
    const cy = (prev.y + cur.y) / 2;
    d += ` Q ${prev.x} ${cy}, ${cx} ${cy} T ${cur.x} ${cur.y}`;
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-auto"
      data-testid="trail-map-svg"
    >
      {/* Soft background terrain */}
      <defs>
        <radialGradient id="terrain" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a2240" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0e1428" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="trail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff8128" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d4a13a" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <rect width={w} height={h} fill="url(#terrain)" />

      {/* Mountains decoration */}
      {[
        { x: 30, y: 110, s: 24 },
        { x: 220, y: 80, s: 30 },
        { x: 60, y: 290, s: 22 },
        { x: 240, y: 360, s: 28 },
        { x: 140, y: 410, s: 20 },
      ].map((m, i) => (
        <polygon
          key={i}
          points={`${m.x},${m.y} ${m.x - m.s},${m.y + m.s} ${m.x + m.s},${m.y + m.s}`}
          fill="#0a0f24"
          stroke="#2a3050"
          strokeWidth="0.6"
        />
      ))}

      {/* Dashed trail */}
      <path
        d={d}
        fill="none"
        stroke="url(#trail)"
        strokeWidth="2"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />

      {/* Nodes */}
      {points.map((p, i) => (
        <g
          key={i}
          onClick={() => onSelect(i)}
          style={{ cursor: "pointer" }}
          data-testid={`trail-node-${i}`}
        >
          <circle
            cx={p.x}
            cy={p.y}
            r={active === i ? 14 : 10}
            fill={active === i ? "#ff8128" : "#0e1428"}
            stroke={active === i ? "#ffd58a" : "#d4a13a"}
            strokeWidth="1.5"
          />
          <text
            x={p.x}
            y={p.y + 3}
            fill={active === i ? "#0a0a14" : "#d4a13a"}
            fontFamily="Cinzel, serif"
            fontSize="9"
            fontWeight="700"
            textAnchor="middle"
          >
            {items[i].level}
          </text>
          {active === i && (
            <text
              x={p.x + 22}
              y={p.y + 4}
              fill="#f3e7cf"
              fontFamily="Manrope, sans-serif"
              fontSize="10"
              fontWeight="600"
            >
              {items[i].company}
            </text>
          )}
        </g>
      ))}

      {/* Start label */}
      <text
        x={points[0].x}
        y={points[0].y - 18}
        fill="#b3a37e"
        fontFamily="Cinzel, serif"
        fontSize="8"
        letterSpacing="2"
        textAnchor="middle"
      >
        START
      </text>
      <text
        x={points[points.length - 1].x}
        y={points[points.length - 1].y + 26}
        fill="#ff8128"
        fontFamily="Cinzel, serif"
        fontSize="8"
        letterSpacing="2"
        textAnchor="middle"
      >
        WHAT&apos;S NEXT?
      </text>
    </svg>
  );
}
