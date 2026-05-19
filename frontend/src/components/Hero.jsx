import { motion } from "framer-motion";

const HERO_BG =
  "https://static.prod-images.emergentagent.com/jobs/348839a8-0406-492d-9aad-6bd977e41575/images/9189a4adca60b82de849789e25a2e91edb0239131657ee7d97bba2e729617ad6.png";

const ease = [0.76, 0, 0.24, 1];

const titleLines = ["Building", "calm", "software"];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen w-full overflow-hidden vignette"
      data-testid="hero-section"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/30 to-[#050505]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 pt-32 lg:pt-40 pb-16 min-h-screen flex flex-col justify-between">
        {/* Top meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="flex items-start justify-between gap-8 flex-wrap"
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="label">Portfolio — Vol. 01 / 2026</span>
          </div>
          <div className="label max-w-xs hidden sm:block text-right">
            [01] Software developer &nbsp;//&nbsp; student of computer science,
            and of paying attention.
          </div>
        </motion.div>

        {/* Title */}
        <div className="mt-12">
          <h1
            className="font-display text-white text-[14vw] sm:text-[13vw] md:text-[11vw] lg:text-[10vw] leading-[0.86] tracking-[-0.04em]"
            data-testid="hero-title"
          >
            {titleLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease, delay: 0.6 + i * 0.12 }}
                  className="block"
                >
                  {line === "calm" ? (
                    <span className="italic text-[var(--accent)] font-display">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end"
        >
          <div className="md:col-span-5">
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-md">
              I&apos;m a software developer and CS student crafting interfaces,
              systems, and small experiments at the intersection of design and
              engineering. Currently free for select freelance and collab.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <div className="label mb-2">Focus</div>
            <div className="text-white text-sm">
              Web platform · UI engineering · LLM tooling
            </div>
          </div>
          <div className="md:col-span-2 md:col-start-11 flex md:justify-end">
            <a
              href="#work"
              className="group flex items-center gap-3 label hover:text-[var(--accent)]"
              data-testid="hero-scroll-cue"
              data-cursor="scroll"
            >
              <span>Scroll</span>
              <span className="block w-10 h-px bg-current relative overflow-hidden">
                <span className="absolute inset-0 bg-[var(--accent)] animate-[marquee_2s_linear_infinite]" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Side index */}
      <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
        <span className="label">No. 0001 — Folio</span>
      </div>
    </section>
  );
}
