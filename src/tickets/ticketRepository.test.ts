// @vitest-environment node
import { beforeEach, describe, expect, it } from "vitest";
import type { Db } from "@/db/client";
import { tickets } from "@/db/schema";
import { createTestDb, insertCustomer } from "@/test-utils/testDb";
import { createTicket, listTicketsForCustomer } from "./ticketRepository";

let db: Db;

beforeEach(async () => {
  db = await createTestDb();
});

describe("createTicket", () => {
  it("stores the ticket for the customer with status open", async () => {
    const customer = await insertCustomer(db);

    const ticket = await createTicket(db, customer.id, {
      subject: "Login fails",
      description: "I get a 500 error.",
      priority: "high",
    });

    expect(ticket).toMatchObject({
      customerId: customer.id,
      subject: "Login fails",
      description: "I get a 500 error.",
      priority: "high",
      status: "open",
    });
    expect(ticket.id).toBeTypeOf("number");
    expect(ticket.createdAt).toBeInstanceOf(Date);
  });
});

describe("listTicketsForCustomer", () => {
  it("returns only that customer's tickets, newest first", async () => {
    const ada = await insertCustomer(db);
    const grace = await insertCustomer(db, { name: "Grace Hopper" });
    await db.insert(tickets).values([
      { customerId: ada.id, subject: "Older", description: "d", createdAt: new Date("2026-01-01") },
      { customerId: grace.id, subject: "Not Ada's", description: "d", createdAt: new Date("2026-01-02") },
      { customerId: ada.id, subject: "Newer", description: "d", createdAt: new Date("2026-01-03") },
    ]);

    const result = await listTicketsForCustomer(db, ada.id);

    expect(result.map((t) => t.subject)).toEqual(["Newer", "Older"]);
  });

  it("returns an empty list for a customer without tickets", async () => {
    const customer = await insertCustomer(db);
    expect(await listTicketsForCustomer(db, customer.id)).toEqual([]);
  });
});
