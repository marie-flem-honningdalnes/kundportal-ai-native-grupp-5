import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { SubmitTicketState } from "@/app/(portal)/tickets/actions";
import { TicketForm } from "./TicketForm";

describe("TicketForm", () => {
  it("has labelled subject, description and priority fields", () => {
    render(<TicketForm action={vi.fn()} />);
    expect(screen.getByLabelText("Subject")).toBeRequired();
    expect(screen.getByLabelText("Description")).toBeRequired();
    expect(screen.getByLabelText("Priority")).toHaveValue("normal");
  });

  it("sends the entered values to the action", async () => {
    const action = vi.fn<(s: SubmitTicketState, f: FormData) => Promise<SubmitTicketState>>(async () => undefined);
    render(<TicketForm action={action} />);

    await userEvent.type(screen.getByLabelText("Subject"), "Late delivery");
    await userEvent.type(screen.getByLabelText("Description"), "Order 42 has not arrived.");
    await userEvent.selectOptions(screen.getByLabelText("Priority"), "high");
    await userEvent.click(screen.getByRole("button", { name: "Submit ticket" }));

    const sent = action.mock.calls[0]![1];
    expect(Object.fromEntries(sent)).toMatchObject({
      subject: "Late delivery",
      description: "Order 42 has not arrived.",
      priority: "high",
    });
  });

  it("shows the errors returned by the action and keeps the entered values", async () => {
    const action = vi.fn(async (): Promise<SubmitTicketState> => ({
      errors: { subject: ["Subject must be at least 3 characters."] },
      values: { subject: "Hi", description: "Something broke", priority: "low" },
    }));
    render(<TicketForm action={action} />);

    await userEvent.type(screen.getByLabelText("Subject"), "Hi");
    await userEvent.type(screen.getByLabelText("Description"), "Something broke");
    await userEvent.click(screen.getByRole("button", { name: "Submit ticket" }));

    expect(await screen.findByText("Subject must be at least 3 characters.")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Subject")).toHaveValue("Hi");
    expect(screen.getByLabelText("Description")).toHaveValue("Something broke");
    expect(screen.getByLabelText("Priority")).toHaveValue("low");
  });

  it("disables the submit button while the action is pending", async () => {
    let finish!: () => void;
    const action = vi.fn(() => new Promise<SubmitTicketState>((resolve) => (finish = () => resolve(undefined))));
    render(<TicketForm action={action} />);

    await userEvent.type(screen.getByLabelText("Subject"), "Pending case");
    await userEvent.type(screen.getByLabelText("Description"), "Wait");
    await userEvent.click(screen.getByRole("button", { name: "Submit ticket" }));

    expect(await screen.findByRole("button", { name: "Submitting…" })).toBeDisabled();
    finish();
    expect(await screen.findByRole("button", { name: "Submit ticket" })).toBeEnabled();
  });
});
