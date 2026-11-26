# portfolio

My portfolio site and résumé. This repo is **public**: everything committed here is published.

- **Build target:** `docs/spec.md`. **Decisions:** `docs/adr/`. Read both before starting a ticket.
- **Work:** GitHub Issues on `AneshSM/portfolio` (`gh issue list`). `ready-for-agent` issues are yours. `ready-for-human` ones need the owner (Vercel, accounts, private data). Close an issue from its PR (`Closes #n`).
- **Method:** test-first, one ticket per PR. A PR is done when lint, typecheck, test and build pass and Playwright has checked the page at desktop and mobile, in light and dark. Put that evidence in the PR body.
- **Commands:** `npm run check` runs everything CI runs: `lint`, `format:check`, `typecheck`, `test` (Vitest, once) and `build`. CI also runs `npm audit`. `npm run format` fixes formatting. While working, run `npx vitest run <file>` and `npm run typecheck`. `npm run e2e` runs the Playwright smoke test against a production build at desktop and mobile, in light and dark. Run `npx playwright install chromium` once first. `npm run lhci` builds the site and runs Lighthouse CI (gates in `lighthouserc.json`) with the mobile and desktop presets, as CI does; it needs Chrome installed and writes reports to `lighthouse-reports/`. `npm run dev` starts the dev server.

## Content rules

- Describe work at capability level (ADR 0004). Real numbers only.
- Private values (employer name, phone, applications location line) go only in the gitignored `content/private.local.json` (ADR 0003). Ask the owner for them; don't infer them.

## Commits

Conventional Commits: `<type>(<scope>): <description>`, with types feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert. `.githooks/commit-msg` enforces this. `.githooks/pre-commit` blocks phone numbers and names in `.git/info/private-patterns`. After a fresh clone, run `git config core.hooksPath .githooks` once and copy the pattern file over from the workspace repo's `.git/info/`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
