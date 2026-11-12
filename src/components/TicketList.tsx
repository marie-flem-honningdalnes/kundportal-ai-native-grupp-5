import Link from "next/link";
import type { Ticket } from "@/db/schema";
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

export function TicketList({ tickets }: { tickets: Ticket[] }) {
  if (tickets.length === 0) {
    return (
      <p className="sticker rounded-2xl bg-white p-8 text-center text-ink/70">
        No tickets yet.
      </p>
    );
  }

  return (
    <div className="sticker overflow-x-auto rounded-2xl bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-cap-blue-soft text-ink">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">Subject</th>
            <th scope="col" className="px-4 py-3 font-semibold">Requester</th>
            <th scope="col" className="px-4 py-3 font-semibold">Status</th>
            <th scope="col" className="px-4 py-3 font-semibold">Priority</th>
            <th scope="col" className="px-4 py-3 font-semibold">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-cream">
              <td className="wrap-break-word px-4 py-3 font-medium text-ink">
                <Link
                  href={`/tickets/${ticket.id}`}
                  className="underline decoration-cap-blue decoration-2 underline-offset-4 hover:text-cap-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cap-blue"
                >
                  {ticket.subject}
                </Link>
              </td>
              <td className="px-4 py-3 text-ink/80">{ticket.requesterName}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[ticket.status]}`}>
                  {statusLabels[ticket.status]}
                </span>
              </td>
              <td className="px-4 py-3 text-ink/80">
                {ticket.priority === "high" && (
                  <span aria-hidden="true" className="mr-1.5 inline-block size-2 rounded-full bg-cap-red-deep" />
                )}
                {priorityLabels[ticket.priority]}
              </td>
              <td className="px-4 py-3 text-ink/80">
                <time dateTime={ticket.createdAt.toISOString()}>{dateFormat.format(ticket.createdAt)}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
