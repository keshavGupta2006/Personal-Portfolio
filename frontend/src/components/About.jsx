import { motion } from "framer-motion";

const ABOUT_IMG =
  "https://static.prod-images.emergentagent.com/jobs/348839a8-0406-492d-9aad-6bd977e41575/images/aadeaa0e389885bb0a9234114eb15dbf2f293d48ed8108912489b6d9f4d4fe81.png";

const ease = [0.76, 0, 0.24, 1];

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "FastAPI",
  "Node.js",
  "MongoDB",
  "Postgres",
  "Framer Motion",
  "Three.js",
  "Tailwind",
  "Figma",
];

const facts = [
  ["Currently", "B.S. Computer Science · Year 3"],
  ["Now", "Studio side projects + freelance"],
  ["Loves", "Type, terminals, slow design"],
  ["Stack", "TS · Py · Go (learning)"],
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 lg:py-48"
      data-testid="about-section"
    >
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sticky label */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="label mb-6">[02] — About</div>
              <h2 className="font-display text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tight">
                A short
                <br />
                <span className="italic text-[var(--accent)]">note</span> from
                <br />
                the desk.
              </h2>

              <div className="mt-12 hidden lg:block relative overflow-hidden border border-white/10">
                <motion.img
                  src={ABOUT_IMG}
                  alt="Portrait"
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.4, ease }}
                  viewport={{ once: true }}
                  className="w-full h-auto grayscale hover:grayscale-0 transition-[filter] duration-700"
                  data-testid="about-image"
                />
                <div className="absolute bottom-3 left-3 label text-white/80">
                  ⎯ The workshop, 03:14 AM
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8 space-y-16">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6 max-w-2xl"
            >
              <p className="text-white/85 text-lg leading-relaxed">
                I&apos;m a software developer and a student — somewhere between
                a sophomore&apos;s curiosity and a senior&apos;s discipline. I
                build interfaces that feel quiet on purpose, systems that
                don&apos;t ask for attention, and tools I&apos;d actually open
                on a Sunday.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                My work lives at the seam of design and engineering. I care a
                lot about typography, micro-interactions, and the moment a
                project stops being a prototype and starts being{" "}
                <span className="text-[var(--accent)]">a thing</span>.
              </p>
            </motion.div>

            {/* Facts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {facts.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="border-t border-white/10 pt-5"
                  data-testid={`about-fact-${i}`}
                >
                  <div className="label mb-2">{k}</div>
                  <div className="text-white text-base">{v}</div>
                </motion.div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <div className="label mb-6">— Toolkit</div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ y: 12, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease, delay: i * 0.025 }}
                    viewport={{ once: true }}
                    className="font-mono text-xs tracking-tight border border-white/15 px-3 py-2 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    data-testid={`skill-${s.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Mobile image */}
            <div className="lg:hidden relative overflow-hidden border border-white/10">
              <img
                src={ABOUT_IMG}
                alt="Portrait"
                className="w-full h-auto grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
