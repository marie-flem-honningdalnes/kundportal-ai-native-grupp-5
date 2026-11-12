import type { Metadata } from "next";
import { TicketForm } from "@/components/TicketForm";
import { submitTicket } from "../actions";

export const metadata: Metadata = { title: "New ticket" };

export default function NewTicketPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="w-fit bg-[linear-gradient(transparent_62%,var(--color-cap-green-soft)_62%)] px-1 font-display text-5xl font-extrabold tracking-[-0.03em] sm:text-6xl">
        New ticket
      </h1>
      <div className="sticker overflow-hidden rounded-2xl bg-white">
        <div aria-hidden="true" className="h-2 bg-cap-green" />
        <div className="p-6">
          <TicketForm action={submitTicket} />
        </div>
      </div>
    </div>
  );
}
