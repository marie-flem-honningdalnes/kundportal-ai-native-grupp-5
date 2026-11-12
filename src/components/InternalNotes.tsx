"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { NoteActionState } from "@/app/(portal)/tickets/actions";
import type { TicketNoteComment } from "@/db/schema";
import type { NoteWithComments } from "@/tickets/ticketRepository";

type Action = (state: NoteActionState, formData: FormData) => Promise<NoteActionState>;

type InternalNotesProps = {
  ticketId: number;
  notes: NoteWithComments[];
  addNote: Action;
  addNoteComment: Action;
  deleteNote: Action;
  deleteNoteComment: Action;
};

const dateTimeFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });

const textareaClass =
  "block w-full rounded-xl border-2 border-ink/20 bg-surface px-3 py-2 text-ink focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/20 aria-invalid:border-danger";
const buttonClass =
  "card cursor-pointer rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-60";

export function InternalNotes({ ticketId, notes, addNote, addNoteComment, deleteNote, deleteNoteComment }: InternalNotesProps) {
  const [alert, setAlert] = useState<string>();
  // Four actions write to one alert area: a new alert replaces the old one, a save clears it.
  const withAlert =
    (action: Action): Action =>
    async (prev, formData) => {
      const next = await action(prev, formData);
      // A new alert replaces the old one, a failed validation leaves it, a success clears it.
      if (next?.alert) setAlert(next.alert);
      else if (!next?.error) setAlert(undefined);
      return next;
    };
  const [state, formAction, pending] = useActionState(withAlert(addNote), undefined);
  const { error, dismiss, ref } = useDismissableError(state);

  return (
    <section aria-labelledby="internal-notes-heading" className="space-y-4">
      <h2 id="internal-notes-heading" className="font-display text-xl font-bold">
        Internal notes
      </h2>
      <div role="alert" className="text-sm text-danger">
        {alert}
      </div>
      {/* Remount with the returned values: React resets a form after its action runs. */}
      <form key={JSON.stringify(state)} action={formAction} noValidate className="space-y-2">
        <input type="hidden" name="ticketId" value={ticketId} />
        <label htmlFor="note-body" className="block text-sm font-semibold text-ink">
          Note
        </label>
        <textarea
          ref={ref}
          onBlur={dismiss}
          onChange={dismiss}
          id="note-body"
          name="body"
          maxLength={500}
          rows={3}
          defaultValue={state?.value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "note-body-error" : undefined}
          className={textareaClass}
        />
        {error && (
          <p id="note-body-error" className="text-sm text-danger">
            {error}
          </p>
        )}
        <button type="submit" disabled={pending} className={buttonClass}>
          Add note
        </button>
      </form>
      {notes.length > 0 && (
        <ul className="space-y-3">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              addComment={withAlert(addNoteComment)}
              deleteNote={withAlert(deleteNote)}
              deleteComment={withAlert(deleteNoteComment)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function NoteItem({ note, addComment, deleteNote, deleteComment }: { note: NoteWithComments; addComment: Action; deleteNote: Action; deleteComment: Action }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(addComment, undefined);
  const { error, dismiss, ref } = useDismissableError(state);

  return (
    <li className="card rounded-2xl bg-highlight-soft p-4 odd:rotate-[0.5deg] even:-rotate-[0.5deg] rose:rotate-0">
      <p className="wrap-break-word whitespace-pre-wrap text-ink">{note.body}</p>
      <time dateTime={note.createdAt.toISOString()} className="mt-2 block text-xs text-ink/70">
        {dateTimeFormat.format(note.createdAt)}
      </time>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => {
          dismiss();
          setOpen(!open);
        }}
        className="mt-2 inline-flex cursor-pointer items-center gap-1 rounded-full border-2 border-ink bg-surface px-3 py-1 text-sm font-semibold text-ink hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span aria-hidden="true">{open ? "▾" : "▸"}</span>
        Comments ({note.comments.length})
      </button>
      <DeleteControl
        action={deleteNote}
        field="noteId"
        id={note.id}
        label="Delete note"
        warning={commentWarning(note.comments.length)}
      />
      {open && (
        <div className="mt-2 space-y-2">
          {note.comments.length > 0 && (
            <ul className="space-y-2">
              {note.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} deleteComment={deleteComment} />
              ))}
            </ul>
          )}
          <form key={JSON.stringify(state)} action={formAction} noValidate className="space-y-2">
            <input type="hidden" name="noteId" value={note.id} />
            <label htmlFor={`comment-body-${note.id}`} className="block text-sm font-semibold text-ink">
              Comment
            </label>
            <textarea
              ref={ref}
              onBlur={dismiss}
              onChange={dismiss}
              id={`comment-body-${note.id}`}
              name="body"
              maxLength={500}
              rows={2}
              defaultValue={state?.value}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `comment-body-${note.id}-error` : undefined}
              className={textareaClass}
            />
            {error && (
              <p id={`comment-body-${note.id}-error`} className="text-sm text-danger">
                {error}
              </p>
            )}
            <button type="submit" disabled={pending} className={buttonClass}>
              Add comment
            </button>
          </form>
        </div>
      )}
    </li>
  );
}

function CommentItem({ comment, deleteComment }: { comment: TicketNoteComment; deleteComment: Action }) {
  return (
    <li className="rounded-xl border-2 border-ink/15 bg-surface p-3">
      <p className="wrap-break-word whitespace-pre-wrap text-ink">{comment.body}</p>
      <time dateTime={comment.createdAt.toISOString()} className="mt-1 block text-xs text-ink/70">
        {dateTimeFormat.format(comment.createdAt)}
      </time>
      <DeleteControl action={deleteComment} field="commentId" id={comment.id} label="Delete comment" />
    </li>
  );
}

// An error stays until the handler closes the form, leaves the field or types. A new result shows it again.
function useDismissableError(state: NoteActionState) {
  const [dismissed, setDismissed] = useState<NoteActionState>();
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const field = ref.current;
    if (!state?.error || !field) return;
    field.focus();
    // Focus puts the cursor at the start; keep typing after the existing text.
    field.setSelectionRange(field.value.length, field.value.length);
  }, [state]);

  return {
    error: state?.error && dismissed !== state ? state.error : undefined,
    dismiss: () => setDismissed(state),
    ref,
  };
}

function commentWarning(count: number) {
  if (count === 0) return undefined;
  return count === 1 ? "This also deletes 1 comment." : `This also deletes ${count} comments.`;
}

// Two steps, because a delete cannot be undone. Each control keeps its own state.
function DeleteControl({ action, field, id, label, warning }: { action: Action; field: "noteId" | "commentId"; id: number; label: string; warning?: string }) {
  const [confirming, setConfirming] = useState(false);
  const [, formAction, pending] = useActionState(action, undefined);

  if (!confirming) {
    return (
      <button
        type="button"
        aria-label={label}
        onClick={() => setConfirming(true)}
        className="mt-2 ml-2 inline-flex cursor-pointer items-center rounded-full border-2 border-danger bg-surface px-3 py-1 text-sm font-semibold text-danger hover:bg-danger-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
      >
        Delete
      </button>
    );
  }
  return (
    <form action={formAction} className="mt-2 flex flex-wrap items-center gap-2 text-sm">
      <input type="hidden" name={field} value={id} />
      {warning && <p className="text-danger">{warning}</p>}
      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer rounded-full bg-danger px-3 py-1 font-semibold text-white hover:bg-danger/90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
      >
        Confirm delete
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="cursor-pointer rounded-full border-2 border-ink bg-surface px-3 py-1 font-semibold text-ink hover:bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Cancel
      </button>
    </form>
  );
}
