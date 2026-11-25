import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { publicContent } from './public';
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

type Tracked = TrackedContent;
type Resolved<T, K extends keyof T> = Omit<T, K> & { [P in K]?: string };

export type Basics = Resolved<Tracked['basics'], 'phone' | 'seeking'>;
export type Work = Resolved<Tracked['work'][number], 'name'>;
export type Project = Tracked['projects'][number];
export type SkillGroup = Tracked['skills'][number];
export type Education = Tracked['education'][number];
export type Bullet = Work['highlights'][number];

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

const defaultPrivateFile = () =>
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
  { privateFile = defaultPrivateFile() }: GetResumeOptions = {},
): Resume | null {
  const tracked = parseTrackedContent(publicContent);
  if (edition === 'public') return resolve(tracked, {});
  if (!existsSync(privateFile)) return null;
  const values = privateValuesSchema.parse(
    JSON.parse(readFileSync(privateFile, 'utf8')),
  );
  return resolve(tracked, values);
}

type Field = Tracked['basics']['phone'];

const fill = (field: Field, privateValue: string | undefined) =>
  field.visibility === 'public' ? field.value : privateValue;

function resolve(tracked: Tracked, values: PrivateValues): Resume {
  return {
    ...tracked,
    basics: {
      ...tracked.basics,
      phone: fill(tracked.basics.phone, values.basics?.phone),
      seeking: fill(tracked.basics.seeking, values.basics?.seeking),
    },
    work: tracked.work.map((job) => ({
      ...job,
      name: fill(job.name, values.work?.[job.id]?.name),
    })),
  };
}
