import { motion } from "framer-motion";
import BonfireScene from "./BonfireScene";

const ease = [0.76, 0, 0.24, 1];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden"
      data-testid="hero-section"
    >
      {/* Sky background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f24] via-[#0e1530] to-[#0a0a14]" />
      <div className="starfield opacity-90" />

      {/* Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease, delay: 0.2 }}
        className="absolute top-[18%] right-[10%] w-16 h-16 rounded-full bg-[#cfe4ff] hidden md:block"
        style={{
          boxShadow:
            "0 0 60px 10px rgba(207, 228, 255, 0.4), inset -8px -6px 0 0 rgba(0,0,0,0.08)",
        }}
      />

      {/* 3D bonfire scene, positioned at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[55vh] pointer-events-none">
        <BonfireScene />
      </div>

      {/* Bottom horizon gradient to blend scene */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg)] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 pt-32 lg:pt-36 min-h-screen flex flex-col items-center">
        {/* Top kicker */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.6 }}
          className="label-dim mb-8 text-center"
          data-testid="hero-kicker"
        >
          ✦ &nbsp; A new quest begins &nbsp; ✦
        </motion.div>

        {/* Massive name */}
        <h1
          className="font-display text-center leading-[0.86] tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 13vw, 13rem)" }}
          data-testid="hero-title"
        >
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease, delay: 0.85 }}
              className="block text-[var(--accent)]"
              style={{
                textShadow:
                  "0 4px 30px rgba(255, 129, 40, 0.35), 0 0 80px rgba(255, 129, 40, 0.15)",
              }}
            >
              The
            </motion.span>
          </span>
          <span className="block overflow-hidden -mt-2">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease, delay: 1 }}
              className="block text-[var(--fg)]"
            >
              Wanderer
            </motion.span>
          </span>
        </h1>

        {/* Class tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.3 }}
          className="mt-6 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-[var(--gold)] opacity-60" />
          <span className="label-dim">
            Software Developer &nbsp;·&nbsp; Computer Science Student
          </span>
          <span className="h-px w-10 bg-[var(--gold)] opacity-60" />
        </motion.div>

        {/* Venture forth */}
        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.6 }}
          className="mt-auto mb-16 flex flex-col items-center gap-2 group"
          data-testid="hero-scroll-cue"
          data-cursor="enter"
        >
          <span className="label-dim group-hover:text-[var(--accent)] transition-colors">
            ↓ Venture forth ↓
          </span>
        </motion.a>
      </div>
    </section>
  );
}
