# Week 5 Status Update

### Planned

- Fork the course repository and add all team members as collaborators.
- Document team members, project brief, and tech stack in separate docs under `docs/`.
- Create the initial boilerplate with Next.js 16, TypeScript, Tailwind CSS, libSQL/SQLite, and Drizzle ORM.
- Connect UI, application logic, and persistent storage for a minimal working baseline.
- Open the continuous Pull Request from fork `main` to course repo `main`.

### Completed

- Team fork created and documentation started on `main` (`3ba996a`, `4da8bb4`).
- [docs/team.md](../team.md): members, working agreement, and a component ownership / AI-task tracking table (owners still TBD).
- [docs/project-brief.md](../project-brief.md): overview, target users, key workflows, tech stack, MVP scope, and initial milestone.
- Placeholder docs added for [decisions](../decisions/README.md), [AI usage](../ai/README.md), and [status](README.md).
- Continuous Pull Request opened from fork `main` to course repo `main`.

### Uncertain / Incomplete

- The boilerplate branch is not in the committed repository, so the baseline cannot yet be reproduced by the other team members. It needs to be committed or recovered.
- The README quickstart (`npm install`, `npm run db:push`, `npm run dev`) describes scripts that do not exist in the repo yet.
- Component owners, reviewers, and AI-agent usage in `docs/team.md` are still TBD.
- `docs/decisions/README.md` and `docs/ai/README.md` are still placeholders.

### Next Steps

- Commit the boilerplate (`package.json`, lockfile, Drizzle config and schema, app code) so everyone can run it, and update the README quickstart to match.
- Add a status history table to the Drizzle schema and define the allowed status values.
- Write acceptance criteria for the four key workflows: submit, list, detail, and status tracking.
- Build the ticket submission form with server-side validation.
- Add the first Vitest tests for validation and database logic.
- Assign owners and reviewers in `docs/team.md` and start logging AI-agent usage.
- Record the stack choices as decisions in `docs/decisions/`.
