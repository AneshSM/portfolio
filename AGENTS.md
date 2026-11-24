# portfolio

My portfolio site and résumé. This repo is **public**: everything committed here is published.

- **Build target:** `docs/spec.md`. **Decisions:** `docs/adr/`. Read both before starting a ticket.
- **Work:** GitHub Issues on `AneshSM/portfolio` (`gh issue list`). `ready-for-agent` issues are yours. `ready-for-human` ones need the owner (Vercel, accounts, private data). Close an issue from its PR (`Closes #n`).
- **Method:** test-first, one ticket per PR. A PR is done when lint, typecheck, test and build pass and Playwright has checked the page at desktop and mobile, in light and dark. Put that evidence in the PR body.
- **Commands:** use the `package.json` scripts. Once they exist, `npm run check` runs everything CI runs.

## Content rules

- Describe work at capability level (ADR 0004). Real numbers only.
- Private values (employer name, phone, applications location line) go only in the gitignored `content/private.local.json` (ADR 0003). Ask the owner for them; don't infer them.

## Commits

Conventional Commits: `<type>(<scope>): <description>`, with types feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert. `.githooks/commit-msg` enforces this. `.githooks/pre-commit` blocks phone numbers and names in `.git/info/private-patterns`. After a fresh clone, run `git config core.hooksPath .githooks` once and copy the pattern file over from the workspace repo's `.git/info/`.
