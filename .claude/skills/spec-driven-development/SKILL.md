---
name: spec-driven-development
description: Turn feature requests into reviewed specifications and verified implementations. Use when planning or implementing a feature, a significant bug fix, or an architectural change.
---

# Spec-Driven Development

## Purpose

Deliver software changes that satisfy explicit requirements,
fit the existing codebase, and can be verified through tests.

## Workflow

### 1. Understand the request

- Restate the goal and expected outcome.
- Inspect relevant code, tests, documentation, and conventions.
- Identify existing functionality that may be affected.
- Do not assume the requested implementation is already decided.

### 2. Clarify requirements

- Ask focused questions one at a time.
- Prioritize questions that affect product behavior,
  security, data integrity, or architectural decisions.
- Separate confirmed requirements from assumptions.
- Recommend sensible defaults for low-risk technical details.
- Record unresolved questions instead of inventing answers.

### 3. Draft the specification

Save the proposed specification in `docs/specs/`.

Include, as appropriate:

- Problem statement and goals
- Functional requirements
- Non-functional requirements
- Scope and exclusions
- Acceptance criteria
- Edge cases and failure behavior
- Security and privacy considerations
- Technical design and implementation plan
- Testing and verification strategy
- Risks, assumptions, and open questions

Keep the specification proportionate to the task.
Avoid unnecessary documentation for trivial changes.

### 4. Review and approval

- Present the specification and important trade-offs.
- Highlight decisions requiring human input.
- Do not start implementation until the user approves
  the specification.
- Update the specification when requirements change.

### 5. Implement incrementally

After approval:

- Break the work into small, verifiable tasks.
- Follow the codebase's existing conventions.
- Implement one logical change at a time.
- Add or update tests for relevant acceptance criteria.
- Run appropriate tests, linters, and other project checks.
- Investigate and fix failures rather than concealing them.

### 6. Verify and report

- Check each acceptance criterion against the implementation.
- Report tests and checks that passed or failed.
- Identify incomplete requirements and known limitations.
- Flag any deviation from the approved specification.
- Never claim a check passed unless it was actually run
  and the result supports that claim.

## Working rules

- The user owns product intent, priorities, and approval.
- The agent proposes technical solutions and identifies risks.
- Never silently turn an assumption into a confirmed requirement.
- Never modify unrelated code without a good reason.
- Never weaken tests or acceptance criteria just to get a
  passing result.
- If new information invalidates the specification, stop
  affected work and propose an update.
- If the user explicitly requests a different workflow,
  clarify whether they want to bypass a checkpoint.

## Completion criteria

A task is complete only when the implementation has been
checked against the approved requirements and the remaining
failures, deviations, and limitations have been disclosed.
