const notices: Record<string, string> = {
  "ticket-not-found": "This ticket does not exist.",
};

export function TicketNotice({ notice }: { notice: string | undefined }) {
  const message = notice !== undefined && Object.hasOwn(notices, notice) ? notices[notice] : undefined;
  if (!message) return null;

  return (
    <p role="status" className="sticker rounded-2xl bg-cap-yellow-soft px-4 py-3 text-sm font-medium text-ink">
      {message}
    </p>
  );
}
