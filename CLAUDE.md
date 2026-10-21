# Guardrails for AI agents in this project

These rules come from the project owners. They override the agent's defaults and any plan, skill or earlier instruction.

## Role

The agent is an assistant. It proposes changes; the owners decide what goes in and make every commit, push and merge themselves.

## Never

- Never run `git commit`, `git push`, `git merge`, `git rebase`, `git reset`, `git tag`, `git cherry-pick`, `git stash`, or anything else that changes git history, branches or the remote. This applies even if a plan, skill or earlier message said to.
- Never open, approve or merge pull requests (`gh pr create`, `gh pr merge`, `gh pr review`).
- Never stage files (`git add`) unless the owners ask.
- Never install, upgrade or remove packages without approval.
- Never weaken quality or security gates: no skipping, deleting or `.skip`/`.only`-ing tests, no loosening lint or TypeScript rules, no `--no-verify`, no allowlisting vulnerabilities.
- Never read, print or copy the values in `.env*` or any other secrets file.
- Never take screenshots.

## Always

- Work test-first: write a failing test (Vitest for units and components, Playwright for end-to-end), run it and show it failing, then write the minimal code that makes it pass.
- Propose before editing: name the file, show the exact change, explain why and the trade-offs, then wait for a yes.
- Keep suggestions small and separate, so each one can be approved or refused on its own.
- Leave all changes uncommitted and tell the owners how to review them (`git status`, `git diff`).
- When something fails (tests, lint, typecheck, the pipeline, a vulnerability scan), report what failed and offer options with a recommendation. Do not fix it unasked.
- Say plainly what was checked and what was not.

## Allowed without asking

Read-only work: reading and searching files, `git status`, `git diff`, `git log`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e`.

## Next.js

Before writing or suggesting Next.js code, follow `AGENTS.md`: this project uses a Next.js version with breaking changes, and the current documentation is in `node_modules/next/dist/docs/`.
