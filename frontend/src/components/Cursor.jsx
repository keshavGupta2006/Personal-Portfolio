import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (window.matchMedia("(max-width: 1024px)").matches) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      }
    };

    const tick = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    const over = (e) => {
      const t = e.target.closest(
        "a, button, [data-cursor], input, textarea, [data-testid]"
      );
      if (t) {
        setHover(true);
        const l = t.getAttribute("data-cursor");
        setLabel(l || "");
      }
    };
    const out = (e) => {
      const t = e.target.closest(
        "a, button, [data-cursor], input, textarea, [data-testid]"
      );
      if (t) {
        setHover(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[var(--accent)] rounded-full pointer-events-none z-[100] hidden lg:block"
      />
      <div
        ref={ring}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[100] hidden lg:flex items-center justify-center text-[10px] uppercase tracking-[0.2em] ${
          hover
            ? "w-20 h-20 -ml-7 -mt-7 bg-[var(--accent)] text-black"
            : "w-9 h-9 border border-white/40 text-transparent"
        }`}
        style={{ transition: "width 280ms, height 280ms, background 200ms, color 200ms, margin 280ms" }}
      >
        {label}
      </div>
    </>
  );
}
