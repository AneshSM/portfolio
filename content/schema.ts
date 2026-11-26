import { z } from 'zod';

// Content in the JSON Resume shape (basics, work, projects, skills,
// education) with two extensions (ADR 0002): `visibility` on fields that may
// be private, and `tracks` tags on bullets and skills for tailoring later.

// A field that can hold a private value (ADR 0003). In tracked files a
// private field carries no value: the value lives only in the gitignored
// content/private.local.json. `.strict()` rejects a stray `value`.
const field = z.discriminatedUnion('visibility', [
  z.object({ visibility: z.literal('public'), value: z.string().min(1) }),
  z.object({ visibility: z.literal('private') }).strict(),
]);

const tracks = z.array(z.enum(['full-stack', 'agentic-ai']));
const isoMonth = z.string().regex(/^\d{4}-\d{2}$/, 'expected YYYY-MM');
const url = z.url();

const bullet = z.object({ text: z.string().min(1), tracks });

const basics = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  summary: z.string().min(1),
  email: z.email(),
  url,
  phone: field,
  location: z.object({
    city: z.string().min(1),
    countryCode: z.string().length(2),
    /** Display line, e.g. "Mangaluru, India". */
    line: z.string().min(1),
  }),
  /** The applications-only line about the roles and places sought. */
  seeking: field,
  profiles: z.array(
    z.object({
      network: z.string().min(1),
      username: z.string().min(1),
      url,
      /** Optional note shown next to the link. */
      note: z.string().optional(),
    }),
  ),
});

const work = z.object({
  /** Stable key that content/private.local.json uses to fill `name`. */
  id: z.string().min(1),
  /** Employer name: private (ADR 0004). */
  name: field,
  position: z.string().min(1),
  location: z.string().min(1),
  startDate: isoMonth,
  /** Absent while the role is current. */
  endDate: isoMonth.optional(),
  recognition: z.string().optional(),
  highlights: z.array(bullet),
});

const project = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  /** "building": the "Building now" card. "archived": Earlier learning. */
  status: z.enum(['building', 'archived']),
  why: z.string().optional(),
  url: url.optional(),
  highlights: z.array(bullet),
  tracks,
});

const skillGroup = z.object({
  /** The capability, e.g. "Backend and data". */
  name: z.string().min(1),
  keywords: z.array(z.string().min(1)).min(1),
  tracks,
});

const education = z.object({
  institution: z.string().min(1),
  studyType: z.string().min(1),
  area: z.string().min(1),
  endDate: z.string().regex(/^\d{4}$/, 'expected YYYY'),
  score: z.string().optional(),
});

export const trackedContentSchema = z.object({
  basics,
  work: z.array(work),
  projects: z.array(project),
  skills: z.array(skillGroup),
  education: z.array(education),
});

export type TrackedContent = z.infer<typeof trackedContentSchema>;

/** Throws if tracked content is malformed or holds a private value. */
export function parseTrackedContent(input: unknown): TrackedContent {
  return trackedContentSchema.parse(input);
}

// Shape of content/private.local.json: values for the fields marked private.
export const privateValuesSchema = z
  .object({
    basics: z
      .object({
        phone: z.string().min(1).optional(),
        seeking: z.string().min(1).optional(),
      })
      .strict()
      .optional(),
    /** Employer names keyed by work entry `id`. */
    work: z
      .record(z.string(), z.object({ name: z.string().min(1) }).strict())
      .optional(),
  })
  .strict();

export type PrivateValues = z.infer<typeof privateValuesSchema>;
