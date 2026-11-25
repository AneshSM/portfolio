import type { TrackedContent } from './schema';

// Tracked, public content. Capability level, no employer or product names and
// no invented numbers (ADR 0004). Private values stay out of this file
// (ADR 0003): fields marked `visibility: 'private'` are filled from the
// gitignored content/private.local.json.

const PRIVATE = { visibility: 'private' } as const;
const CHENNAI = 'Chennai (on-site)';

const archived = (name: string, description: string) => ({
  name,
  description,
  status: 'archived' as const,
  url: `https://github.com/AneshSM/${name}`,
  highlights: [],
  tracks: [],
});

export const publicContent = {
  basics: {
    name: 'Anesh Somanath Majalikar',
    label: 'Software Engineer, Full Stack',
    summary:
      'Full-stack engineer building web and mobile products in TypeScript, from React to PostgreSQL. ' +
      'I build with Claude Code, MCP and the Claude API, and treat AI output as a draft until it has tests, a browser check and a review.',
    email: 'aneshsm204@gmail.com',
    url: 'https://aneshsm-portfolio.vercel.app',
    phone: PRIVATE,
    location: {
      city: 'Mangaluru',
      countryCode: 'IN',
      line: 'Based in Mangaluru, India',
    },
    seeking: PRIVATE,
    profiles: [
      {
        network: 'LinkedIn',
        username: 'anesh-somanath-majalikar-13666b222',
        url: 'https://linkedin.com/in/anesh-somanath-majalikar-13666b222',
      },
      {
        network: 'GitHub',
        username: 'AneshSM',
        url: 'https://github.com/AneshSM',
      },
      {
        network: 'Instagram',
        username: 'arto.beginner',
        url: 'https://www.instagram.com/arto.beginner',
        note: 'Off the keyboard, I sketch',
      },
    ],
  },
  work: [
    {
      id: 'software-engineer',
      name: PRIVATE,
      position: 'Software Engineer',
      location: CHENNAI,
      startDate: '2025-11',
      highlights: [
        {
          text: 'Delivered features end to end in a new business domain, from React screens to PostgreSQL schema, by owning design, implementation, tests and release in TypeScript.',
          tracks: ['full-stack'],
        },
        {
          text: 'Brought AI-assisted engineering into day-to-day delivery, with changes landing reviewed and tested, by working with Claude Code and MCP inside a test-first, review-gated loop.',
          tracks: ['agentic-ai', 'full-stack'],
        },
      ],
    },
    {
      id: 'associate-software-engineer',
      name: PRIVATE,
      position: 'Associate Software Engineer',
      location: CHENNAI,
      startDate: '2023-08',
      endDate: '2025-10',
      recognition: 'Rising Star award',
      highlights: [
        {
          text: 'Shipped full-stack features across web and mobile clients by building React and React Native interfaces on Node.js APIs backed by PostgreSQL.',
          tracks: ['full-stack'],
        },
        {
          text: 'Made releases more predictable by adding CI/CD pipelines and automated checks to the delivery workflow.',
          tracks: ['full-stack'],
        },
      ],
    },
    {
      id: 'intern',
      name: PRIVATE,
      position: 'Intern',
      location: CHENNAI,
      startDate: '2023-02',
      endDate: '2023-08',
      highlights: [
        {
          text: 'Moved from learning the stack to contributing production changes by shipping fixes and small features in a TypeScript, React and Node.js codebase under code review.',
          tracks: ['full-stack'],
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Structured-output document pipeline',
      description:
        'A document pipeline on the Claude API that turns unstructured documents into validated, structured output, with evals and tests.',
      status: 'building',
      why: 'Reliable structured output is what makes an LLM feature safe to ship: evals and tests show when it works and catch when it stops working.',
      highlights: [],
      tracks: ['agentic-ai'],
    },
    archived(
      'AlvasNiraamaya',
      'React Native app for an Ayurvedic hospital: appointments, reminders and maps (college major project).',
    ),
    archived(
      'backend-js-template',
      'Minimal production-ready Express.js (ESM) backend template.',
    ),
    archived('express-typescript-setup', 'Express and TypeScript boilerplate.'),
    archived(
      'restful_API-PostgreSQL_Prisma',
      'REST API with Express, TypeScript, Prisma and PostgreSQL.',
    ),
    archived(
      'restful_API-PostgreSQL_Sequelize',
      'REST API with Express, TypeScript, Sequelize and PostgreSQL.',
    ),
    archived(
      'vite-react_ts-mui-setup',
      'Vite, React, TypeScript and Material UI starter.',
    ),
    archived('ReactJS-Projects', 'React learning with sample projects.'),
    archived('React_Native', 'Ayurvedic app in React Native.'),
    archived('Landing-Page-Project', 'Sample ReactJS projects.'),
    archived(
      'Node.js',
      'Node.js practice APIs: CRUD, a PERN to-do app and Sequelize.',
    ),
    archived('Dash', 'Static HTML, CSS and JavaScript dashboard UI practice.'),
    archived('JavaScript', 'JavaScript practice.'),
    archived('WebProjects', 'Early web projects.'),
    archived('JAVA', 'Solved Java problems.'),
    archived('JAVA_and_C_Training', 'Java and C bootcamp exercises.'),
    archived('first-year-C-coding', 'First-year C programming exercises.'),
    archived(
      'skills-getting-started-with-github-copilot',
      'Exercise: get started using GitHub Copilot.',
    ),
  ],
  skills: [
    {
      name: 'Frontend and mobile',
      keywords: ['React', 'React Native', 'TypeScript', 'Material UI'],
      tracks: ['full-stack'],
    },
    {
      name: 'Backend and data',
      keywords: [
        'Node.js',
        'Express',
        'REST APIs',
        'PostgreSQL',
        'Prisma',
        'Sequelize',
      ],
      tracks: ['full-stack'],
    },
    {
      name: 'AI-assisted engineering',
      keywords: ['Claude Code', 'MCP', 'Claude API'],
      tracks: ['agentic-ai'],
    },
    {
      name: 'Testing and delivery',
      keywords: ['Vitest', 'Playwright', 'GitHub Actions', 'CI/CD', 'Git'],
      tracks: ['full-stack', 'agentic-ai'],
    },
  ],
  education: [
    {
      institution: "Alva's Institute of Engineering and Technology",
      studyType: 'B.E.',
      area: 'Computer Science',
      endDate: '2024',
      score: 'CGPA 7.87',
    },
  ],
} satisfies TrackedContent;
