"use client";

import { useActionState } from "react";
import type { ChangeStatusState } from "@/tickets/changeStatusState";
import { statusLabels } from "@/tickets/statusLabels";
import { ticketStatuses, type TicketStatus } from "@/tickets/ticketSchema";

type StatusFormProps = {
  ticketId: number;
  status: TicketStatus;
  action: (state: ChangeStatusState, formData: FormData) => Promise<ChangeStatusState>;
};

export function StatusForm({ ticketId, status, action }: StatusFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const error = state?.error;

  return (
    // Remount when the saved status changes, so the dropdown starts on the new status.
    <form key={status} action={formAction} className="flex flex-wrap items-start gap-3">
      <input type="hidden" name="ticketId" value={ticketId} />
      <div>
        <label htmlFor="status" className="block text-sm font-semibold text-ink">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={status}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "status-error" : undefined}
          className="mt-1 block rounded-xl border-2 border-ink/20 bg-surface px-3 py-2 text-ink focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/20 aria-invalid:border-danger"
        >
          {ticketStatuses.map((s) => (
            <option key={s} value={s}>
              {statusLabels[s]}
            </option>
          ))}
        </select>
        {error && (
          <p id="status-error" className="mt-1 text-sm text-danger">
            {error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="card mt-6 cursor-pointer rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-60"
      >
        Save
      </button>
    </form>
  );
}
