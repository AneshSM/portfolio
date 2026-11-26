import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { publicContent } from './public';
import { siteCopy, siteCopySchema, type SiteCopy } from './site';
import {
  parseTrackedContent,
  privateValuesSchema,
  type PrivateValues,
  type TrackedContent,
} from './schema';

/**
 * The content API for the site (#5) and the résumé PDF (#7).
 *
 * `getResume('public')` is what the site and the public PDF render: private
 * fields are `undefined`, whatever is on disk. `getResume('private')` merges
 * the gitignored content/private.local.json (ADR 0003) and returns `null`
 * when that file is absent, so only the public PDF builds. Server-only: it
 * reads the file system.
 */
export type Edition = 'public' | 'private';

type Resolved<T, K extends keyof T> = Omit<T, K> & { [P in K]?: string };

export type Basics = Resolved<TrackedContent['basics'], 'phone' | 'seeking'>;
export type Work = Resolved<TrackedContent['work'][number], 'name'>;
export type Project = TrackedContent['projects'][number];
export type SkillGroup = TrackedContent['skills'][number];
export type Education = TrackedContent['education'][number];

export type Resume = {
  basics: Basics;
  work: Work[];
  projects: Project[];
  skills: SkillGroup[];
  education: Education[];
};

export type GetResumeOptions = {
  /** Defaults to content/private.local.json under the working directory. */
  privateFile?: string;
};

const getDefaultPrivateFile = () =>
  path.join(process.cwd(), 'content', 'private.local.json');

export function getResume(
  edition: 'public',
  options?: GetResumeOptions,
): Resume;
export function getResume(
  edition: 'private',
  options?: GetResumeOptions,
): Resume | null;
export function getResume(
  edition: Edition,
  { privateFile = getDefaultPrivateFile() }: GetResumeOptions = {},
): Resume | null {
  const tracked = parseTrackedContent(publicContent);
  if (edition === 'public') return resolve(tracked, {});
  // The private file is read at build or script time only and must never be
  // traced into a deployment, so Turbopack is told to skip these paths.
  if (!existsSync(/* turbopackIgnore: true */ privateFile)) return null;
  const values = privateValuesSchema.parse(
    JSON.parse(readFileSync(/* turbopackIgnore: true */ privateFile, 'utf8')),
  );
  return resolve(tracked, values);
}

export type { SiteCopy } from './site';

/** Page copy that is not résumé data: section titles, labels, placeholders. */
export function getSiteCopy(): SiteCopy {
  return siteCopySchema.parse(siteCopy);
}

type Field = TrackedContent['basics']['phone'];

const resolveField = (field: Field, privateValue: string | undefined) =>
  field.visibility === 'public' ? field.value : privateValue;

function resolve(tracked: TrackedContent, values: PrivateValues): Resume {
  return {
    ...tracked,
    basics: {
      ...tracked.basics,
      phone: resolveField(tracked.basics.phone, values.basics?.phone),
      seeking: resolveField(tracked.basics.seeking, values.basics?.seeking),
    },
    work: tracked.work.map((job) => ({
      ...job,
      name: resolveField(job.name, values.work?.[job.id]?.name),
    })),
  };
}
