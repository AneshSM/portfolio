import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { getResume, type Resume } from '@/content';
import {
  checkResumePdf,
  privateValuesIn,
  resumeTextInOrder,
  type CheckOptions,
} from './check';
import { renderResumePdf } from './render';

/**
 * Renders the public résumé, runs the build checks (ADR 0002) and writes the
 * PDF only if they pass; otherwise throws with every problem found.
 *
 * `privateFixture` is an obvious-placeholder private values file. The public
 * edition is read with it present, so a leak of any private field would
 * show its placeholder in the PDF and fail the check. The real
 * content/private.local.json is never read here.
 */
export async function buildPublicResume(
  outFile: string,
  { privateFixture }: { privateFixture: string },
): Promise<{ bytes: number }> {
  const resume = getResume('public', { privateFile: privateFixture });
  return buildChecked('Public', resume, outFile, {
    forbidden: privateValuesIn(privateFixture),
  });
}

/** Thrown when the private values file is absent (ADR 0003). */
export class MissingPrivateFileError extends Error {
  constructor(privateFile: string) {
    super(
      `No private values file at ${privateFile}.\n` +
        'Copy content/private.example.json to content/private.local.json ' +
        'and replace the placeholders with your own values. ' +
        'The public résumé does not need it.',
    );
    this.name = 'MissingPrivateFileError';
  }
}

/**
 * Renders the private résumé (ADR 0003): public content merged with the
 * gitignored private values file. Runs the same build checks, plus that the
 * private values appear where they belong. Throws `MissingPrivateFileError`
 * when the file is absent. Write it only somewhere gitignored and never
 * under public/, so it is never deployed.
 */
export async function buildPrivateResume(
  outFile: string,
  { privateFile }: { privateFile: string },
): Promise<{ bytes: number }> {
  const resume = getResume('private', { privateFile });
  if (!resume) throw new MissingPrivateFileError(privateFile);
  return buildChecked('Private', resume, outFile, { forbidden: [] });
}

async function buildChecked(
  label: string,
  resume: Resume,
  outFile: string,
  { forbidden }: Pick<CheckOptions, 'forbidden'>,
): Promise<{ bytes: number }> {
  const pdf = await renderResumePdf(resume);
  const problems = await checkResumePdf(pdf, {
    inOrder: resumeTextInOrder(resume),
    forbidden,
  });
  if (problems.length > 0) {
    throw new Error(
      `${label} résumé failed its checks:\n- ${problems.join('\n- ')}`,
    );
  }
  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, pdf);
  return { bytes: pdf.byteLength };
}
