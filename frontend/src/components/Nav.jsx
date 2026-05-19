import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#connect", label: "Connect" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
      data-testid="site-nav"
    >
      <div
        className={`pointer-events-auto flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0f24]/85 backdrop-blur-md border-[var(--border-strong)]"
            : "bg-[#0a0f24]/60 backdrop-blur-sm border-[var(--border)]"
        }`}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="px-4 py-2 rounded-full text-[13px] text-[var(--fg-dim)] hover:text-[var(--fg)] hover:bg-[rgba(255,129,40,0.08)] transition-colors font-sans"
            data-testid={`nav-link-${l.label.toLowerCase()}`}
          >
            {l.label}
          </a>
        ))}
      </div>
    </motion.header>
  );
}
