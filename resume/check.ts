import { readFileSync } from 'node:fs';
import { extractText, getMeta } from 'unpdf';
import type { Resume } from '@/content';
import { getBuildingProjects } from '@/content/projects';

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

/** Collapses every run of whitespace to one space, as text is compared. */
export function normaliseWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/** A PDF's text, all pages merged, with whitespace normalised. */
export async function readPdfText(
  pdf: Uint8Array,
): Promise<{ text: string; totalPages: number }> {
  // unpdf may transfer (detach) the buffer it is given, so pass a copy.
  const { text, totalPages } = await extractText(new Uint8Array(pdf), {
    mergePages: true,
  });
  return { text: normaliseWhitespace(text), totalPages };
}

export async function checkResumePdf(
  pdf: Uint8Array,
  { inOrder, forbidden, maxBytes = MAX_BYTES }: CheckOptions,
): Promise<string[]> {
  const { text, totalPages } = await readPdfText(pdf);
  const meta = await getMeta(new Uint8Array(pdf));
  const metadata: [string, unknown][] = [
    ...Object.entries(meta.info),
    ...readXmpFields(meta.metadata),
  ];

  return [
    ...(totalPages === 1
      ? []
      : [`résumé is ${totalPages} pages; it must fit on one`]),
    ...(pdf.byteLength < maxBytes
      ? []
      : [`file is ${pdf.byteLength} bytes; the cap is ${maxBytes}`]),
    ...findOrderProblems(text, inOrder.map(normaliseWhitespace)),
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

// unpdf does not ship the pdf.js type for XMP metadata, so its shape is
// checked at runtime instead of asserted.
type XmpMetadata = { getAll(): unknown };

function isXmpMetadata(value: unknown): value is XmpMetadata {
  return (
    typeof value === 'object' &&
    value !== null &&
    'getAll' in value &&
    typeof value.getAll === 'function'
  );
}

function readXmpFields(xmp: unknown): [string, unknown][] {
  if (!isXmpMetadata(xmp)) return [];
  const fields = xmp.getAll();
  return typeof fields === 'object' && fields !== null
    ? Object.entries(fields)
    : [];
}

function findOrderProblems(text: string, expected: string[]): string[] {
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
  const { basics } = resume;
  const keepDefined = (...values: (string | undefined)[]) =>
    values.filter((value): value is string => Boolean(value));
  return [
    basics.name,
    basics.label,
    ...keepDefined(basics.phone, basics.seeking),
    'Summary',
    basics.summary,
    'Experience',
    ...resume.work.flatMap((job) => [
      job.position,
      ...keepDefined(job.name),
      ...job.highlights.map((highlight) => highlight.text),
    ]),
    'Projects',
    ...getBuildingProjects(resume).map((project) => project.name),
    'Skills',
    ...resume.skills.map((group) => group.name),
    'Education',
    ...resume.education.map((school) => school.institution),
  ];
}

/** Every string value in a private values file (ADR 0003). */
export function privateValuesIn(file: string): string[] {
  const collectStrings = (value: unknown): string[] =>
    typeof value === 'string'
      ? [value]
      : value && typeof value === 'object'
        ? Object.values(value).flatMap(collectStrings)
        : [];
  return [...new Set(collectStrings(JSON.parse(readFileSync(file, 'utf8'))))];
}
