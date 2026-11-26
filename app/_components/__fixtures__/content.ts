import type { Resume, SiteCopy } from '@/content';

// Fixture content with made-up values, so component tests prove that every
// string on the page comes from content and none is hard-coded.

export const resume: Resume = {
  basics: {
    name: 'Fixture Person',
    label: 'Fixture Role',
    summary: 'Fixture summary.',
    email: 'fixture@example.com',
    url: 'https://fixture.example.com',
    location: { city: 'Fixtown', countryCode: 'ZZ', line: 'Based in Fixtown' },
    profiles: [
      {
        network: 'FixNet',
        username: 'fixer',
        url: 'https://fixnet.example.com/fixer',
      },
      {
        network: 'DrawNet',
        username: 'drawer',
        url: 'https://drawnet.example.com/drawer',
        note: 'Fixture note',
      },
    ],
  },
  work: [
    {
      id: 'current',
      position: 'Fixture Lead',
      location: 'Fixtown (on-site)',
      startDate: '2025-11',
      highlights: [{ text: 'Led the fixture work.', tracks: [] }],
    },
    {
      id: 'earlier',
      position: 'Fixture Junior',
      location: 'Fixtown (on-site)',
      startDate: '2023-02',
      endDate: '2023-08',
      recognition: 'Fixture award',
      highlights: [{ text: 'Learned the fixture ropes.', tracks: [] }],
    },
  ],
  projects: [
    {
      name: 'Fixture Pipeline',
      description: 'A fixture pipeline description.',
      status: 'building',
      why: 'Fixture reason it matters.',
      highlights: [],
      tracks: [],
    },
    {
      name: 'old-fixture',
      description: 'An old fixture project.',
      status: 'archived',
      url: 'https://github.example.com/old-fixture',
      highlights: [],
      tracks: [],
    },
  ],
  skills: [
    { name: 'Fixture capability', keywords: ['FixLang', 'FixDB'], tracks: [] },
  ],
  education: [],
};

export const site: SiteCopy = {
  skipLink: 'Fixture skip',
  navLabel: 'Fixture nav',
  hero: {
    sentence: 'Fixture hero sentence.',
    resume: {
      label: 'Fixture résumé',
      href: '/fixture.pdf',
      fileName: 'Fixture-Resume.pdf',
    },
    emailLabel: 'Fixture email',
    copyEmail: { label: 'Fixture copy', done: 'Fixture copied' },
  },
  projects: {
    id: 'fx-projects',
    title: 'Fixture Projects',
    buildingNow: 'Fixture building',
    earlierLearning: 'Fixture earlier',
    linkLabel: 'Fixture source',
  },
  howIBuild: {
    id: 'fx-how',
    title: 'Fixture How',
    claim: 'Fixture claim.',
    loop: { title: 'Fixture loop', steps: ['Fixture plan', 'Fixture build'] },
    guardrails: {
      title: 'Fixture guardrails',
      items: ['Fixture rule', 'Fixture hook'],
    },
    verification: {
      title: 'Fixture verification',
      checks: ['Fixture check'],
      output: {
        text: 'Fixture output\n  2 passed',
        source: {
          label: 'Fixture output source',
          href: 'https://github.example.com/pr/2',
        },
      },
    },
    failure: {
      title: 'Fixture failure',
      text: 'Fixture failure story.',
      link: {
        label: 'Fixture failure fix',
        href: 'https://github.example.com/pr/1',
      },
    },
    example: {
      title: 'Fixture example',
      text: 'Fixture example story.',
      links: [
        { label: 'Fixture design', href: 'https://github.example.com/pr/3' },
        { label: 'Fixture build', href: 'https://github.example.com/pr/4' },
      ],
    },
    setup: { title: 'Fixture setup', text: 'Fixture setup text.' },
    proofLink: {
      label: 'Fixture proof',
      href: 'https://github.example.com/proof',
    },
  },
  experience: {
    id: 'fx-experience',
    title: 'Fixture Experience',
    present: 'Fixture now',
  },
  skills: { id: 'fx-skills', title: 'Fixture Skills' },
  contact: {
    id: 'fx-contact',
    title: 'Fixture Contact',
    lead: 'Fixture contact lead.',
    emailLabel: 'Fixture contact email',
  },
};
