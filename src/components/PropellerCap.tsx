// Decorative logo: the propeller spins two turns and slows down when the parent `group` is hovered.
export function PropellerCap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 36" aria-hidden="true" data-logo="propeller" className={className}>
      <g className="origin-center transform-fill transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[720deg] motion-reduce:transition-none">
        <ellipse cx="16" cy="6" rx="8" ry="2.5" fill="var(--color-cap-red)" />
        <ellipse cx="32" cy="6" rx="8" ry="2.5" fill="var(--color-cap-blue)" />
      </g>
      <rect x="23" y="6" width="2" height="8" fill="var(--color-ink)" />
      <path d="M24 32 L6 32 A18 18 0 0 1 11.27 19.27 Z" fill="var(--color-cap-red)" />
      <path d="M24 32 L11.27 19.27 A18 18 0 0 1 24 14 Z" fill="var(--color-cap-yellow)" />
      <path d="M24 32 L24 14 A18 18 0 0 1 36.73 19.27 Z" fill="var(--color-cap-blue)" />
      <path d="M24 32 L36.73 19.27 A18 18 0 0 1 42 32 Z" fill="var(--color-cap-green)" />
      <rect x="2" y="31" width="44" height="4" rx="2" fill="var(--color-ink)" />
    </svg>
  );
}
