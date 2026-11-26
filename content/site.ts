import { z } from 'zod';

// Page copy for the one-page site (#5) that is not résumé data: section
// titles, button labels and placeholder copy. Résumé facts stay in public.ts.
// Components render only what this file and getResume() give them.

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
    resume: z.object({ label: z.string().min(1), href: z.string().min(1) }),
    emailLabel: z.string().min(1),
  }),
  projects: section.extend({
    buildingNow: z.string().min(1),
    earlierLearning: z.string().min(1),
    linkLabel: z.string().min(1),
  }),
  howIBuild: section.extend({
    /** Placeholder paragraphs until the full section lands (#11). */
    paragraphs: z.array(z.string().min(1)).min(1),
    proofLink: z.object({ label: z.string().min(1), href: z.url() }),
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
    resume: { label: 'Download résumé (PDF)', href: '/resume.pdf' },
    emailLabel: 'Email me',
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
    paragraphs: [
      'This section is being written. The proof is this repo: its AGENTS.md, ADRs, commit history and pull requests with test evidence.',
      'The loop: grill the plan, write the spec and tickets, build test-first, review the code, check the page in a browser with Playwright, and open a Conventional Commits pull request.',
    ],
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
