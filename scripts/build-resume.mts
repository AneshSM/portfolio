// Runs before `next build` (npm `prebuild`), so Vercel's `npm run build`
// writes public/resume.pdf too. A failed check exits non-zero and stops the
// build.
import path from 'node:path';
import { buildPublicResume } from '../resume/build';

const root = process.cwd();
const outFile = path.join(root, 'public', 'resume.pdf');
const { bytes } = await buildPublicResume(outFile, {
  privateFixture: path.join(
    root,
    'content',
    '__fixtures__',
    'private.fixture.json',
  ),
});
console.log(`public/resume.pdf: ${bytes} bytes, checks passed`);
