# AI usage and workflow

## Rules

The rules for AI agents are in [CLAUDE.md](../../CLAUDE.md). They are enforced where possible by [.claude/settings.json](../../.claude/settings.json), which blocks git history changes, pull request commands, reading `.env*` and editing protected paths.

In short: the agent proposes and a human decides, tests come first, and humans make every commit, push and merge.

## Shared workflow

1. Pick a task and an acceptance criterion in [project-brief.md](../project-brief.md).
2. Use the reusable step below to build it.
3. A teammate reviews the diff. Record the reviewer and what was checked.
4. Update [verification.md](../verification.md) and the table in [team.md](../team.md).
5. Record architecture-level choices in [decisions/](../decisions/README.md).
6. Summarise the week in [status/](../status/README.md).

## Reusable step: `ticket-change`

A project skill at [.claude/skills/ticket-change/SKILL.md](../../.claude/skills/ticket-change/SKILL.md). It turns one acceptance criterion into a small, reviewed change: failing test, minimal code, checks, verification row, log row. Anyone on the team can run it with `/ticket-change`.

## Log of AI-assisted tasks

Tracked in the table in [team.md](../team.md#component-ownership-and-ai-agent-task-tracking): tool, task, who verified it, and how. Each row links to the PR.
