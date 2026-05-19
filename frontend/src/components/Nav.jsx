import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours().toString().padStart(2, "0");
      const m = d.getMinutes().toString().padStart(2, "0");
      const s = d.getSeconds().toString().padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-[#050505]/70 backdrop-blur-md" : "bg-transparent"
      }`}
      data-testid="site-nav"
    >
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 py-5 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-3 group"
          data-testid="nav-logo"
          data-cursor="home"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] inline-block" />
          <span className="font-display text-lg leading-none tracking-tight">
            studio/<span className="text-[var(--accent)]">k.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label link-underline hover:text-white"
              data-testid={`nav-link-${l.label.toLowerCase()}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <span className="label">LOCAL // {time}</span>
          <a
            href="#contact"
            className="label px-4 py-2 border border-white/15 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            data-testid="nav-cta"
            data-cursor="say hi"
          >
            Available — 2026
          </a>
        </div>

        <a
          href="#contact"
          className="md:hidden label border border-white/15 px-3 py-2"
          data-testid="nav-mobile-cta"
        >
          Contact
        </a>
      </div>
    </motion.header>
  );
}
