# Portfolio v1 spec

Settled in a design interview (Nov 2026). Decisions with real trade-offs are in `docs/adr/`. This file is the build target. Change it only with the owner's agreement.

## Goal and audience

Get hired for full-stack and agentic AI roles. Readers are recruiters and hiring managers. Within 10 seconds a reader should know who I am, and contact or the résumé should be one click away. This is not a freelance pitch or a blog.

## Page (one page, in this order)

A skip link and anchor navigation sit at the top.

1. **Hero:** role, one plain sentence on role, stack and outcome, "Based in Mangaluru, India", a **Download résumé (PDF)** button, and an email button.
2. **Projects:**
   - A "Building now" card first: a structured-output document pipeline on the Claude API, with evals and tests. It shows what it is, why it matters, and a GitHub link once that repo exists.
   - Archived learning projects sit in a collapsed "Earlier learning" list.
3. **How I build with Claude Code:** see below.
4. **Experience:** capability level, with no employer or product names (ADR 0004). Each entry is marked "Chennai (on-site)".
5. **Skills:** grouped by capability. Includes Claude Code, MCP and the Claude API.
6. **Contact:** repeats the call to action. Links to LinkedIn, GitHub, Instagram (sketching: "off the keyboard, I sketch") and `mailto:aneshsm204@gmail.com`. Links only, no form.

## How I build with Claude Code

The proof is this repo: its `AGENTS.md`, ADRs, commit history and pull requests with test evidence.

1. One-sentence claim: what I use Claude Code for, and where I don't.
2. **The loop:** grill the plan → spec and tickets → test-first build → code review → Playwright browser check → Conventional Commits PR.
3. **Guardrails:**
   - `AGENTS.md` rules and ADRs.
   - Commit-message and privacy hooks.
   - Verification skills and read-only reviewer agents.
   - "AI output is a draft until it has tests, a browser check and a review."
4. **Verification:** the exact checks, and one real output.
5. One failure and what caught it, such as a hook rejecting a commit or a review catching a wrong change.
6. Links to real merged PRs here, as one worked example (design challenged → ADR → test-first build → browser check). Add these once the first PRs are merged.
7. The setup in general terms: shared skills and plugins, project agents, Playwright MCP. No productivity numbers.

## Design

- **Style:** clean and readable, in the vein of brittanychiang.com. Strong type, generous spacing, and colours and type taken from the GitHub profile README banner.
- **Theme:** light and dark follow the system setting. No toggle in v1.
- **Motion:** subtle, and off under `prefers-reduced-motion`.
- **Social preview:** an OG image from the README banner, plus title and description, `sitemap.xml`, `robots.txt` and a canonical URL.
- **Address:** `https://aneshsm-portfolio.vercel.app`, on Vercel Hobby and deployed from `main`. It's the canonical URL until a custom domain lands (see Later). The GitHub profile README links to it (AneshSM/aneshsm#17).
- **Analytics:** Vercel Web Analytics (no cookies, no consent banner).

## Targets (launch gates)

- Lighthouse ≥ 95 for Performance, Accessibility and SEO.
- Core Web Vitals: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- WCAG 2.2 AA: text contrast ≥ 4.5:1, targets ≥ 24 px, keyboard reachable.
- **Every PR:** GitHub Actions runs lint, typecheck, test and build, and Vercel posts a preview.
- **Before merge:** a Playwright check at desktop and mobile, in light and dark.

## Résumé (ADRs 0002, 0003)

- **Layout:** one page, single column, ATS-friendly. Text is selectable, with standard headings (Summary, Experience, Projects, Skills, Education). No tables, icons or images for key content, and it must print well in black and white.
- **Order:** name and contact → 2-line summary → experience → projects ("Building now") → skills → education.
- **Bullets:** X-Y-Z shape (accomplished X, measured by Y, by doing Z), with numbers only when they're real.
- **Leave out:** photo, date of birth, marital status, school marks, notice period, expected salary, and a languages list (add one only if a job asks).
- **Education:** B.E. in Computer Science, Alva's Institute of Engineering and Technology, 2024, CGPA 7.87.
- **Experience** (source: LinkedIn): Intern, Feb 2023 – Aug 2023 · Associate Software Engineer, Aug 2023 – Oct 2025 (Rising Star award) · Software Engineer, Nov 2025 – present.
- **Courses:** add a "Courses" line for each Anthropic Academy course only once it's finished.

## Later (not v1)

- Project detail pages and writing, once the document pipeline ships.
- A custom domain.
- A theme toggle.
- A Claude API "Ask about me" chat.
- A public "Claude Code setup" template repo.
