# Kundserviceportalen

Kundserviceportalen is a customer service portal where customers submit support tickets and view their previously submitted tickets with status updates. It is a local-first app built with Next.js 16, TypeScript, Tailwind CSS, SQLite (libSQL) and Drizzle ORM, using fake customer data only.

## Documentation

- [Project brief](docs/project-brief.md): overview, workflows, tech stack, MVP scope
- [Team](docs/team.md): members, working agreement, ownership
- [Status updates](docs/status/): weekly status (planned, completed, verified, uncertain, next steps)
- [Decisions](docs/decisions/README.md): architecture and project decisions (placeholder)
- [AI usage](docs/ai/README.md): AI governance and task log (placeholder)

## Quickstart

The boilerplate is still being set up, so the scripts below are the intended ones and may not exist yet.

```bash
npm install
npm run db:push   # sync the Drizzle schema to the local SQLite file
npm run dev       # start the dev server at http://localhost:3000
```

---

## Om kursrepot

Här samlar ni teamets arbete med Kundserviceportalen i kursen AI Native Development. Ni väljer teknik och bygger en mindre fullstacklösning med AI-stöd. Använd bara påhittade kunduppgifter.

**Uppgift, betygskriterier, veckoförväntningar och deadline finns under Kursexamination i Disco.** Börja där och återvänd dit under arbetet.
[Länk till Disco](https://technigo.disco.co/p/fall-2026-ai-native-development/collection/Q29sbGVjdGlvbjozNzg3Ng==?u=25dab1f8-7abb-463e-a19e-d379efb7caae&drawerTab=comments)

## Kom igång

Projektarbetet börjar vecka 5. Ni får börja frivilligt vecka 4; den veckans fristående kodövning finns kvar.

1. Läs uppgiften och veckans förväntningar i Disco.
2. **En person i teamet skapar en publik fork** från [kursens repository](https://github.com/Technigo/kundportal-ai-native-development) på sitt GitHub-konto. Den personen bjuder in övriga teammedlemmar som **collaborators** via **Settings -> Collaborators -> Add people**. Alla accepterar sin inbjudan och kontrollerar att de kan pusha till teamets fork. Vi kan läsa koden och underlagen i den publika forken utan en separat inbjudan.
3. Klona teamets fork till era datorer.
4. Gör en första förändring: beskriv teamet och er första plan i er dokumentation. Committa och pusha förändringen till `main` i teamets fork. Körbar kod behövs inte för att öppna PR:n.
5. Öppna teamets löpande PR enligt nästa avsnitt.
6. Fortsätt med projektarbetet enligt vecka 5 i Disco.

Ni arbetar i **samma fork** under projektet. Det räcker att en person skapar den. Se [GitHubs instruktion för att bjuda in collaborators](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/inviting-collaborators-to-a-personal-repository) om ni behöver hjälp.

## Branches och pull requests

Teamets löpande PR går **från `main` i teamets fork till `main` i kursens repository**.

| Val i GitHub | Ange |
|---|---|
| Base repository | `Technigo/kundportal-ai-native-development` |
| Base | `main` |
| Head repository | Teamets fork |
| Compare | `main` |

Välj **compare across forks** om båda repositories inte visas. Använd teamets namn i PR-rubriken. Kopiera innehållet i [PR-mallen för teamets projekt](.github/PULL_REQUEST_TEMPLATE/teamets-projekt.md) till beskrivningen och fyll i det som finns vid starten. Resten växer fram under projektet.

Håll samma PR öppen under projektperioden. Den används för uppföljning och inlämning och ska inte mergas till kursens repository under arbetet. Nya commits på teamets `main` syns i samma PR.

Inom teamets fork kan ni använda separata branches för mindre uppgifter och granska dem i interna PR:er till **teamets egen `main`**. Kontrollera vilket repository som är mål innan ni öppnar en intern PR. Gör granskningen spårbar: vem granskade, vad kontrollerades och vad ledde återkopplingen till?

[GitHubs guide för PR från en fork](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork) beskriver valen i gränssnittet.

## Er dokumentation

Ni utformar själva dokumentationen och styrningen av era AI-verktyg utifrån uppgiften i Disco. Länka till teamets gemensamma underlag från den löpande PR:n, så att vi kan följa ert arbete.

## Slutversion och inlämning

När gruppens kod, tester och gemensamma dokumentation är pushade kopierar ni länken till den commit som innehåller slutversionen. Lägg länken överst i teamets löpande PR-beskrivning under **Slutversion för examination**. Kontrollera att länkarna till underlagen visar den inlämnade versionen i teamets fork.

Varje student lämnar sin individuella redovisning som en **Markdown-fil (.md) i sin egen inlämning i Disco**. Märk dokumentet med ditt namn och länka till teamets fork, löpande PR, markerade slutversion och det arbete som visar ditt eget bidrag.

Den individuella redovisningen ska inte läggas i teamets repository eller länkas från teamets PR. Du behöver inte dela dokumentet med dina klasskamrater. Gruppens kod, tester och gemensamma dokumentation finns fortsatt på GitHub.

Följ den aktuella instruktionen och deadlinen i Disco.

---

## Kundserviceportalen (the app)

A customer service portal for case handlers, built with Next.js 16 (App Router, React 19), TypeScript and Tailwind CSS. A handler registers a ticket on behalf of the person who contacted the company (name, optional email), sees all tickets in one list, and follows them through a simple workflow.

Data lives in SQLite through [libSQL](https://github.com/tursodatabase/libsql): a local file in development, [Turso](https://turso.tech) when hosted. [Drizzle ORM](https://orm.drizzle.team) handles queries and migrations.

> Agents working in this repo must follow [CLAUDE.md](CLAUDE.md). They never commit, push or merge; the owners do that. `.claude/settings.json` blocks those git commands for Claude Code.

### Requirements

- Node.js 24 or later (`.nvmrc` pins the major version)
- Google Chrome, for the end-to-end tests run locally

### Getting started

```bash
npm install
cp .env.example .env.local   # optional; the defaults use ./data/dev.db
npm run db:reset             # create, migrate and seed the local database
npm run dev
```

Then open http://localhost:3000.

There's no sign-in yet: anyone who opens the app is treated as a case handler and sees every ticket.

### Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` / `npm run start` | Build for production / serve the build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Generate route types, then check types with TypeScript |
| `npm test` | Run unit and component tests once (Vitest) |
| `npm run test:watch` | Run Vitest in watch mode while you develop |
| `npm run test:e2e` | Reset a separate `data/e2e.db`, build, and run the Playwright tests |
| `npm run db:generate` | Create a migration in `drizzle/` from changes to `src/db/schema.ts` |
| `npm run db:migrate` | Apply migrations to `DATABASE_URL` |
| `npm run db:seed` | Insert demo tickets |
| `npm run db:reset` | Delete the local database file, then migrate and seed (local files only) |

### Test-driven development

Every change starts with a failing test:

1. **Red:** write a test that describes the behaviour, then run it and watch it fail for the right reason.
2. **Green:** write the least code that makes it pass.
3. **Refactor:** tidy up with the tests still green.

Where each kind of test goes:

- **Unit and component tests** (Vitest + React Testing Library) sit next to the code as `*.test.ts(x)`. Database tests run against a fresh in-memory SQLite per test (`src/test-utils/testDb.ts`) and use `// @vitest-environment node`.
- **End-to-end tests** (Playwright) live in `e2e/`. They run against a production build and a freshly seeded `data/e2e.db`. Async Server Components can't be unit-tested with Vitest, so cover them here.

### Project layout

```
src/app/                 routes (App Router); (portal)/ holds the pages that share the portal shell
src/components/          React components (+ tests)
src/tickets/             ticket validation (zod) and data access
src/db/                  Drizzle schema, client, migrate/seed/reset scripts
src/lib/                 navigation
src/test-utils/          Vitest setup and test database helpers
drizzle/                 generated SQL migrations (commit these)
e2e/                     Playwright specs
```

### Deploying with Turso

Create a database on Turso, then set `DATABASE_URL=libsql://<db>-<org>.turso.io` and `DATABASE_AUTH_TOKEN` in the hosting environment, and run `npm run db:migrate` against it before starting the app.
