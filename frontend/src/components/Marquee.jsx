const items = [
  "By candlelight",
  "Software Developer",
  "Wandering Student",
  "Currently building",
  "Open to quests",
  "Camp open · 2026",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      className="border-y border-white/10 overflow-hidden py-6"
      data-testid="marquee-band"
    >
      <div className="marquee-track">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display text-white text-4xl md:text-6xl px-8 flex items-center gap-8 whitespace-nowrap"
          >
            {t}
            <span className="w-3 h-3 rounded-full bg-[var(--accent)]" />
          </span>
        ))}
      </div>
    </div>
  );
}
