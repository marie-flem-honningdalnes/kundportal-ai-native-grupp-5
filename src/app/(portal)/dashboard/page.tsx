import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="sticker -rotate-1 space-y-6 rounded-3xl bg-cap-yellow p-8 sm:p-12">
      <h1 className="font-display text-6xl font-extrabold tracking-[-0.03em] text-balance sm:text-8xl">Dashboard</h1>
      <p className="max-w-prose text-lg text-ink">Register customer cases and follow them through to resolution.</p>
      <Link
        href="/tickets"
        className="sticker inline-block rounded-full bg-ink px-5 py-3 font-semibold text-cream transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transition-none"
      >
        View all tickets →
      </Link>
    </div>
  );
}
