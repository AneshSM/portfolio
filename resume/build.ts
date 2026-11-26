import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { getResume } from '@/content';
import { checkResumePdf, privateValuesIn, resumeTextInOrder } from './check';
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
  const pdf = await renderResumePdf(resume);
  const problems = await checkResumePdf(pdf, {
    inOrder: resumeTextInOrder(resume),
    forbidden: privateValuesIn(privateFixture),
  });
  if (problems.length > 0) {
    throw new Error(
      `Public résumé failed its checks:\n- ${problems.join('\n- ')}`,
    );
  }
  mkdirSync(path.dirname(outFile), { recursive: true });
  writeFileSync(outFile, pdf);
  return { bytes: pdf.byteLength };
}
