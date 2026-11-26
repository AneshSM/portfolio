import { z } from 'zod';

// Page copy for the one-page site (#5) that is not résumé data: section
// titles, button labels and section copy. Résumé facts stay in public.ts.
// Components render only what this file and getResume() give them.

const text = z.string().min(1);
const link = z.object({ label: text, href: z.url() });

const section = z.object({
  /** Anchor id, e.g. "projects" for #projects. */
  id: z.string().regex(/^[a-z][a-z-]*$/),
  title: z.string().min(1),
});

export const siteCopySchema = z.object({
  skipLink: z.string().min(1),
  navLabel: z.string().min(1),
  hero: z.object({
    /** One plain sentence on role and stack. */
    sentence: z.string().min(1),
    resume: z.object({
      label: z.string().min(1),
      href: z.string().min(1),
      /** Saved-as name; the download attribute stops the PDF opening in the tab. */
      fileName: z.string().regex(/^[\w-]+\.pdf$/),
    }),
    emailLabel: z.string().min(1),
    /** A copy button beside mailto: links, which fail without a mail app. */
    copyEmail: z.object({ label: text, done: text }),
  }),
  projects: section.extend({
    buildingNow: z.string().min(1),
    earlierLearning: z.string().min(1),
    linkLabel: z.string().min(1),
  }),
  /** The seven parts of "How I build with Claude Code" in docs/spec.md. */
  howIBuild: section.extend({
    claim: text,
    loop: z.object({ title: text, steps: z.array(text).min(2) }),
    guardrails: z.object({ title: text, items: z.array(text).min(1) }),
    verification: z.object({
      title: text,
      checks: z.array(text).min(1),
      /** One real output, verbatim, and the pull request it came from. */
      output: z.object({ text, source: link }),
    }),
    failure: z.object({ title: text, text, link }),
    example: z.object({ title: text, text, links: z.array(link).min(2) }),
    setup: z.object({ title: text, text }),
    proofLink: link,
  }),
  experience: section.extend({ present: z.string().min(1) }),
  skills: section,
  contact: section.extend({
    lead: z.string().min(1),
    emailLabel: z.string().min(1),
  }),
});

export type SiteCopy = z.infer<typeof siteCopySchema>;

export const siteCopy = {
  skipLink: 'Skip to content',
  navLabel: 'Sections',
  hero: {
    sentence:
      'Full-stack engineer building web and mobile products in TypeScript, from React to PostgreSQL.',
    resume: {
      label: 'Download résumé (PDF)',
      href: '/resume.pdf',
      fileName: 'Anesh-Somanath-Majalikar-Resume.pdf',
    },
    emailLabel: 'Email me',
    copyEmail: { label: 'Copy email', done: 'Email address copied' },
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    buildingNow: 'Building now',
    earlierLearning: 'Earlier learning',
    linkLabel: 'Source on GitHub',
  },
  howIBuild: {
    id: 'how-i-build',
    title: 'How I build with Claude Code',
    claim:
      'I use Claude Code to plan, build, test and review changes. I don’t let it decide what ships or touch private data: I merge every pull request myself, and private values never reach a tracked file.',
    loop: {
      title: 'The loop',
      steps: [
        'Grill the plan until the trade-offs are explicit',
        'Write the spec and split it into tickets',
        'Build each ticket test-first',
        'Review the code against the standards and the spec',
        'Check the page in a browser with Playwright',
        'Open a Conventional Commits pull request with the evidence',
      ],
    },
    guardrails: {
      title: 'Guardrails',
      items: [
        'AGENTS.md rules and ADRs that every session reads first',
        'Commit-message and privacy hooks that reject a bad commit',
        'Verification skills and read-only reviewer agents',
        'AI output is a draft until it has tests, a browser check and a review.',
      ],
    },
    verification: {
      title: 'Verification',
      checks: [
        'Lint, format, type check, unit tests and build on every pull request',
        'Playwright at desktop and mobile, in light and dark, with an axe accessibility scan',
        'Lighthouse CI gates on performance, accessibility and SEO',
        'Résumé checks: one page, text in order, no private fields',
      ],
      output: {
        text: [
          '$ npm run check',
          ' Test Files  8 passed (8)',
          '      Tests  39 passed (39)',
          '$ npm run e2e',
          '  4 skipped',
          '  60 passed',
        ].join('\n'),
        source: {
          label: 'From the portfolio v1 pull request',
          href: 'https://github.com/AneshSM/portfolio/pull/16',
        },
      },
    },
    failure: {
      title: 'When it went wrong',
      text: 'An eslint upgrade passed my dependency check, which only looked at top-level packages. Vercel’s build log caught a peer conflict deeper in the tree. The fix went back to the supported version and wrote down why.',
      link: {
        label: 'The fix and its write-up',
        href: 'https://github.com/AneshSM/portfolio/pull/15',
      },
    },
    example: {
      title: 'A worked example: this site',
      text: 'A design interview produced the spec and the ADRs, including the decision to build a public and a private résumé from one source. Each ticket was then built test-first, checked in a browser and reviewed before the pull request merged.',
      links: [
        {
          label: 'Spec and ADRs',
          href: 'https://github.com/AneshSM/portfolio/pull/1',
        },
        {
          label: 'ADR: public and private résumé',
          href: 'https://github.com/AneshSM/portfolio/blob/main/docs/adr/0003-public-and-private-resume.md',
        },
        {
          label: 'The test-first build, with evidence',
          href: 'https://github.com/AneshSM/portfolio/pull/16',
        },
      ],
    },
    setup: {
      title: 'The setup',
      text: 'Shared skills and plugins for planning, test-first work and review. Project agents that build tickets in their own worktrees, and reviewers that can only read. Playwright for browser checks.',
    },
    proofLink: {
      label: 'The portfolio repo on GitHub',
      href: 'https://github.com/AneshSM/portfolio',
    },
  },
  experience: { id: 'experience', title: 'Experience', present: 'Present' },
  skills: { id: 'skills', title: 'Skills' },
  contact: {
    id: 'contact',
    title: 'Contact',
    lead: 'Hiring for a full-stack or agentic AI role? Email me or download my résumé.',
    emailLabel: 'Email me',
  },
} satisfies SiteCopy;
