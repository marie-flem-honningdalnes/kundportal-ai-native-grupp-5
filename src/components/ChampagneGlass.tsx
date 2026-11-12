const bubbles = [
  { cx: 18, cy: 14.5, r: 1, delay: "0ms" },
  { cx: 24, cy: 13.5, r: 1.2, delay: "350ms" },
  { cx: 29.5, cy: 14, r: 0.9, delay: "700ms" },
  { cx: 21, cy: 11.5, r: 0.8, delay: "1050ms" },
  { cx: 27, cy: 11, r: 0.8, delay: "200ms" },
];

// Decorative Rosé logo: the bubbles rise and pop while the parent `group` is hovered.
export function ChampagneGlass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 36" aria-hidden="true" data-logo="rose" className={className}>
      <path d="M10.5 9 H37.5 C36.8 14 31 16.8 24 16.8 C17 16.8 11.2 14 10.5 9 Z" fill="var(--color-glass-rose)" />
      <path d="M10.5 9 H37.5" stroke="var(--color-glass-foam)" strokeWidth="1.2" />
      {bubbles.map((bubble) => (
        <circle
          key={`${bubble.cx}-${bubble.cy}`}
          cx={bubble.cx}
          cy={bubble.cy}
          r={bubble.r}
          fill="var(--color-glass-foam)"
          style={{ animationDelay: bubble.delay }}
          className="motion-safe:group-hover:animate-bubble-rise"
        />
      ))}
      <path
        d="M9 6 H39 C39 13.5 32 18 24 18 C16 18 9 13.5 9 6 Z"
        fill="none"
        stroke="var(--color-glass-gold)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="23.25" y="18" width="1.5" height="11" fill="var(--color-glass-gold)" />
      <ellipse cx="24" cy="31" rx="9" ry="2.2" fill="var(--color-glass-gold)" />
    </svg>
  );
}
