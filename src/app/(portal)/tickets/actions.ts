"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db/client";
import { getCurrentCustomerId } from "@/lib/currentCustomer";
import { createTicket } from "@/tickets/ticketRepository";
import { newTicketSchema } from "@/tickets/ticketSchema";

type TicketFormValues = { subject: string; description: string; priority: string };

export type SubmitTicketState =
  | {
      errors: Partial<Record<keyof TicketFormValues, string[]>>;
      values: TicketFormValues;
    }
  | undefined;

export async function submitTicket(_prev: SubmitTicketState, formData: FormData): Promise<SubmitTicketState> {
  const values: TicketFormValues = {
    subject: String(formData.get("subject") ?? ""),
    description: String(formData.get("description") ?? ""),
    priority: String(formData.get("priority") ?? ""),
  };

  const parsed = newTicketSchema.safeParse({ ...values, priority: values.priority || undefined });
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return { errors: fieldErrors, values };
  }

  const db = getDb();
  await createTicket(db, await getCurrentCustomerId(db), parsed.data);

  revalidatePath("/tickets");
  redirect("/tickets");
}
