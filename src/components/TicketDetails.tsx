import Link from "next/link";
import type { ReactNode } from "react";
import type { Ticket, TicketStatusChange } from "@/db/schema";
import type { ChangeStatusState } from "@/tickets/changeStatusState";
import { StatusForm } from "./StatusForm";
import { statusLabels } from "@/tickets/statusLabels";
import type { TicketPriority, TicketStatus } from "@/tickets/ticketSchema";

const statusStyles: Record<TicketStatus, string> = {
  open: "bg-cap-blue-soft text-cap-blue",
  in_progress: "bg-cap-yellow-soft text-ink",
  closed: "bg-cap-green-soft text-cap-green-deep",
};

const priorityLabels: Record<TicketPriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
};

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });

type TicketDetailsProps = {
  ticket: Ticket;
  changes: TicketStatusChange[];
  statusAction: (state: ChangeStatusState, formData: FormData) => Promise<ChangeStatusState>;
  children?: ReactNode;
};

export function TicketDetails({ ticket, changes, statusAction, children }: TicketDetailsProps) {
  return (
    <article className="max-w-3xl space-y-6">
      <Link
        href="/tickets"
        className="sticker inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ink hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cap-blue"
      >
        Back to tickets
      </Link>
      <div className="sticker rounded-3xl bg-cap-red-soft p-6 sm:p-8">
        <h1 className="wrap-break-word font-display text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
          {ticket.subject}
        </h1>
      </div>
      <dl className="sticker grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 rounded-2xl bg-white p-5 text-sm">
        <dt className="font-semibold text-ink/70">Status</dt>
        <dd>
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[ticket.status]}`}>
            {statusLabels[ticket.status]}
          </span>
        </dd>
        <dt className="font-semibold text-ink/70">Priority</dt>
        <dd className="text-ink">{priorityLabels[ticket.priority]}</dd>
        <dt className="font-semibold text-ink/70">Created</dt>
        <dd className="text-ink">
          <time dateTime={ticket.createdAt.toISOString()}>{dateFormat.format(ticket.createdAt)}</time>
        </dd>
        <dt className="font-semibold text-ink/70">Requester</dt>
        <dd className="text-ink">{ticket.requesterName}</dd>
        <dt className="font-semibold text-ink/70">Email</dt>
        <dd className="text-ink">{ticket.requesterEmail ?? "No email given"}</dd>
      </dl>
      <section aria-label="Description" className="space-y-2">
        <h2 className="font-display text-xl font-bold">Description</h2>
        <p className="wrap-break-word whitespace-pre-wrap sticker rounded-2xl bg-white p-4 text-ink">
          {ticket.description}
        </p>
      </section>
      <section aria-label="Status and history" className="space-y-4">
        <StatusForm ticketId={ticket.id} status={ticket.status} action={statusAction} />
        <h2 className="text-lg font-semibold">Status history</h2>
        {changes.length === 0 ? (
          <p className="text-sm text-slate-600">No status changes yet.</p>
        ) : (
          <ol className="space-y-1 text-sm text-slate-700">
            {changes.map((change) => (
              <li key={change.id}>
                {statusLabels[change.fromStatus]} → {statusLabels[change.toStatus]} ·{" "}
                <time dateTime={change.changedAt.toISOString()}>{dateFormat.format(change.changedAt)}</time>
              </li>
            ))}
          </ol>
        )}
      </section>
      {children}
    </article>
  );
}
