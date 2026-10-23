# Project Brief: Kundserviceportalen

## Overview

Kundserviceportalen is a customer portal where customers submit support tickets and follow them over time. A customer can see all tickets they have submitted, open a ticket to read its details, and track status updates as the ticket progresses.

## Target users

- **Customers** who need help and want to know what happened to their request.
- **Support staff** (secondary, for the MVP): change a ticket's status so customers can see progress.

## Key workflows

1. **Submit a ticket.** The customer fills in a form (e.g. subject, description, category). Input is validated on the server and the ticket is saved with an initial status.
2. **View ticket list.** The customer sees their previously submitted tickets with subject, status, and date.
3. **View ticket details.** The customer opens a ticket to see the full description and its history.
4. **Track status changes.** Each status change (e.g. Open, In progress, Resolved) is stored and shown on the ticket.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | SQLite via libSQL (local file in development, Turso when hosted) |
| ORM | Drizzle ORM (schema, migrations, queries) |
| Testing | Vitest (logic, validation, route tests) |

## MVP scope boundaries

- **Local-first.** Runs as a local application; data persists in a local SQLite file and survives restarts.
- **Fake data only.** All customers and tickets are invented.
- **Zero external dependencies.** No cloud infrastructure, no external email APIs, no external authentication services (e.g. Okta).
- Hosting on Turso is a possible later step, not part of the MVP.

## Initial milestone

Deliver a minimal, functional full-stack boilerplate that connects:

- the **UI** (Next.js pages styled with Tailwind),
- **server logic** (route handlers or server actions with validation), and
- **persistent storage** (Drizzle ORM on a local libSQL/SQLite file).

Success means the app builds, the database schema can be pushed, the dev server runs, and data written through the UI is still there after a restart.
