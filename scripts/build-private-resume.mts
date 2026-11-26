// `npm run resume:private`: builds the private résumé (ADR 0003) from the
// public content merged with the gitignored content/private.local.json, and
// writes it to the gitignored private/ folder. Never part of `npm run build`,
// so it is never deployed.
import path from 'node:path';
import { buildPrivateResume, MissingPrivateFileError } from '../resume/build';

const root = process.cwd();
const outFile = path.join(root, 'private', 'resume.private.pdf');

try {
  const { bytes } = await buildPrivateResume(outFile, {
    privateFile: path.join(root, 'content', 'private.local.json'),
  });
  console.log(`private/resume.private.pdf: ${bytes} bytes, checks passed`);
} catch (error) {
  if (!(error instanceof MissingPrivateFileError)) throw error;
  console.error(error.message);
  process.exit(1);
}
