import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ease = [0.76, 0, 0.24, 1];

export default function Work() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API}/projects`)
      .then((r) => {
        if (mounted) setProjects(r.data || []);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const move = (e) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const node = sectionRef.current;
    if (node) node.addEventListener("mousemove", move);
    return () => {
      if (node) node.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 border-t border-white/10"
      data-testid="work-section"
    >
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex items-end justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <div className="label mb-4">[03] — Selected Work</div>
            <h2 className="font-display text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
              The
              <span className="italic text-[var(--accent)]"> archive</span>.
            </h2>
          </div>
          <div className="label hidden sm:block">
            {String(projects.length).padStart(2, "0")} projects
          </div>
        </div>

        <ul className="border-t border-white/10">
          {projects.map((p, i) => (
            <li
              key={p.id}
              onMouseEnter={() => setActive(p)}
              onMouseLeave={() => setActive(null)}
              className="group border-b border-white/10"
              data-testid={`project-row-${p.id}`}
            >
              <a
                href={p.url || "#"}
                onClick={(e) => !p.url && e.preventDefault()}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 py-8 lg:py-10 px-2 lg:px-4 transition-colors duration-500 group-hover:bg-white/[0.02]"
                data-cursor="view"
              >
                <div className="flex items-baseline gap-6 lg:gap-10 min-w-0 flex-1">
                  <span className="label shrink-0">{p.index}</span>
                  <h3 className="font-display text-white text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-none transition-transform duration-700 ease-out group-hover:translate-x-3 truncate">
                    {p.title}
                  </h3>
                </div>
                <div className="flex items-center gap-6 lg:gap-12 shrink-0">
                  <span className="label hidden md:inline">{p.role}</span>
                  <span className="label">{p.year}</span>
                  <span
                    className="text-[var(--accent)] text-2xl transition-transform duration-500 group-hover:rotate-45"
                    aria-hidden
                  >
                    ↗
                  </span>
                </div>
              </a>

              {/* Mobile description */}
              <div className="lg:hidden px-2 pb-8 -mt-2 text-white/60 text-sm max-w-md">
                {p.description}
              </div>
            </li>
          ))}
        </ul>

        {/* Hover image */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.35, ease }}
              className="hidden lg:block fixed pointer-events-none z-30"
              style={{
                left: `${pos.x + (sectionRef.current?.getBoundingClientRect().left || 0)}px`,
                top: `${pos.y + (sectionRef.current?.getBoundingClientRect().top || 0)}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative w-[26rem] h-[18rem] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between label text-white/90">
                  <span>{active.title}</span>
                  <span>{active.stack[0]}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
