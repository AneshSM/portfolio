import { readFileSync } from 'node:fs';
import { extractText, getMeta } from 'unpdf';
import type { Resume } from '@/content';

/**
 * Build checks for a résumé PDF (ADR 0002). Each returns a readable problem;
 * the build fails when the list is not empty.
 */
export type CheckOptions = {
  /** Strings that must appear in the extracted text, in this order. */
  inOrder: string[];
  /** Values that must not appear in the text or the metadata. */
  forbidden: string[];
  /** Defaults to the 2.5 MB Greenhouse upload cap. */
  maxBytes?: number;
};

const MAX_BYTES = 2.5 * 1024 * 1024;

const normalise = (text: string) => text.replace(/\s+/g, ' ').trim();

export async function checkResumePdf(
  pdf: Uint8Array,
  { inOrder, forbidden, maxBytes = MAX_BYTES }: CheckOptions,
): Promise<string[]> {
  // unpdf may transfer (detach) the buffer it is given, so pass copies.
  const { text: raw, totalPages } = await extractText(new Uint8Array(pdf), {
    mergePages: true,
  });
  const text = normalise(raw);
  const meta = await getMeta(new Uint8Array(pdf));
  // unpdf does not ship the pdf.js type for XMP metadata; this is its shape.
  const xmp = meta.metadata as { getAll(): Record<string, unknown> } | null;
  const metadata: [string, unknown][] = [
    ...Object.entries(meta.info),
    ...Object.entries(xmp?.getAll() ?? {}),
  ];

  return [
    ...(totalPages === 1
      ? []
      : [`résumé is ${totalPages} pages; it must fit on one`]),
    ...(pdf.byteLength < maxBytes
      ? []
      : [`file is ${pdf.byteLength} bytes; the cap is ${maxBytes}`]),
    ...orderProblems(text, inOrder.map(normalise)),
    ...forbidden
      .filter((value) => text.includes(value))
      .map((value) => `private value in text: "${value}"`),
    ...forbidden.flatMap((value) =>
      metadata
        .filter(
          ([, field]) => typeof field === 'string' && field.includes(value),
        )
        .map(([key]) => `private value in metadata (${key}): "${value}"`),
    ),
  ];
}

function orderProblems(text: string, expected: string[]): string[] {
  const problems: string[] = [];
  let cursor = 0;
  expected.forEach((part, i) => {
    const at = text.indexOf(part, cursor);
    if (at >= 0) {
      cursor = at + part.length;
    } else if (text.includes(part)) {
      problems.push(
        `text out of order: "${part}" should come after "${expected[i - 1]}"`,
      );
    } else {
      problems.push(`text missing: "${part}"`);
    }
  });
  return problems;
}

/**
 * The text a reader (or an ATS) should meet, top to bottom. Private fields
 * (phone, seeking line, employer names) are expected only when the edition
 * has them, so the private PDF is checked for them too.
 */
export function resumeTextInOrder(resume: Resume): string[] {
  const present = (...values: (string | undefined)[]) =>
    values.filter((value): value is string => Boolean(value));
  return [
    resume.basics.name,
    resume.basics.label,
    ...present(resume.basics.phone, resume.basics.seeking),
    'Summary',
    resume.basics.summary,
    'Experience',
    ...resume.work.flatMap((job) => [
      job.position,
      ...present(job.name),
      ...job.highlights.map((highlight) => highlight.text),
    ]),
    'Projects',
    ...resume.projects
      .filter((project) => project.status === 'building')
      .map((project) => project.name),
    'Skills',
    ...resume.skills.map((group) => group.name),
    'Education',
    ...resume.education.map((school) => school.institution),
  ];
}

/** Every string value in a private values file (ADR 0003). */
export function privateValuesIn(file: string): string[] {
  const strings = (value: unknown): string[] =>
    typeof value === 'string'
      ? [value]
      : value && typeof value === 'object'
        ? Object.values(value).flatMap(strings)
        : [];
  return [...new Set(strings(JSON.parse(readFileSync(file, 'utf8'))))];
}
