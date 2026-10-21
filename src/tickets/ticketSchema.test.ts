import { describe, expect, it } from "vitest";
import { newTicketSchema } from "./ticketSchema";

const valid = { subject: "Cannot download invoice", description: "The PDF link returns an error." };

describe("newTicketSchema", () => {
  it("accepts a valid ticket and defaults priority to normal", () => {
    const result = newTicketSchema.safeParse(valid);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ ...valid, priority: "normal" });
  });

  it("trims whitespace around subject and description", () => {
    const result = newTicketSchema.safeParse({ subject: "  Hello there  ", description: "  Body  " });
    expect(result.data).toMatchObject({ subject: "Hello there", description: "Body" });
  });

  it.each([
    ["empty", ""],
    ["too short", "ab"],
    ["too long", "x".repeat(121)],
  ])("rejects a subject that is %s", (_case, subject) => {
    const result = newTicketSchema.safeParse({ ...valid, subject });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toEqual(["subject"]);
  });

  it("rejects an empty description and one over 5000 characters", () => {
    expect(newTicketSchema.safeParse({ ...valid, description: "" }).success).toBe(false);
    expect(newTicketSchema.safeParse({ ...valid, description: "x".repeat(5001) }).success).toBe(false);
  });

  it("accepts known priorities and rejects unknown ones", () => {
    expect(newTicketSchema.safeParse({ ...valid, priority: "high" }).data?.priority).toBe("high");
    expect(newTicketSchema.safeParse({ ...valid, priority: "urgent" }).success).toBe(false);
  });

  it("strips unknown fields such as status or customerId", () => {
    const result = newTicketSchema.safeParse({ ...valid, status: "closed", customerId: 99 });
    expect(result.data).not.toHaveProperty("status");
    expect(result.data).not.toHaveProperty("customerId");
  });
});
