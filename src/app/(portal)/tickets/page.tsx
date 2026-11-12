import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { TicketList } from "@/components/TicketList";
import { TicketNotice } from "@/components/TicketNotice";
import { getDb } from "@/db/client";
import { listTickets } from "@/tickets/ticketRepository";

export const metadata: Metadata = { title: "Tickets" };

async function AllTickets() {
  // Ticket data is per request: render it at request time, never at build time.
  await connection();
  const tickets = await listTickets(getDb());
  return <TicketList tickets={tickets} />;
}

async function Notice({ searchParams }: { searchParams: Promise<{ notice?: string | string[] }> }) {
  const { notice } = await searchParams;
  return <TicketNotice notice={typeof notice === "string" ? notice : undefined} />;
}

export default function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string | string[] }>;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="bg-[linear-gradient(transparent_62%,var(--color-accent-soft)_62%)] px-1 font-display text-5xl font-extrabold tracking-[-0.03em] sm:text-6xl">
          Tickets
        </h1>
        <Link
          href="/tickets/new"
          className="card rounded-full bg-action px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transition-none"
        >
          New ticket
        </Link>
      </div>
      <Suspense>
        <Notice searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<p className="text-ink/70">Loading tickets…</p>}>
        <AllTickets />
      </Suspense>
    </div>
  );
}
