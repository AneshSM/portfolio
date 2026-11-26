// @vitest-environment node
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, expect, test } from 'vitest';
import { buildPublicResume } from './build';

const fixture = path.join(
  __dirname,
  '..',
  'content',
  '__fixtures__',
  'private.fixture.json',
);
let dir: string | undefined;
afterEach(() => dir && rmSync(dir, { recursive: true, force: true }));

test('writes a checked public résumé PDF', async () => {
  dir = mkdtempSync(path.join(tmpdir(), 'resume-'));
  const outFile = path.join(dir, 'nested', 'resume.pdf');

  await buildPublicResume(outFile, { privateFixture: fixture });

  expect(readFileSync(outFile).subarray(0, 5).toString()).toBe('%PDF-');
});
