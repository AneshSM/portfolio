// @vitest-environment node
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { extractText } from 'unpdf';
import { afterEach, expect, test } from 'vitest';
import { buildPrivateResume, buildPublicResume } from './build';

const fixtures = path.join(__dirname, '..', 'content', '__fixtures__');
const fixture = path.join(fixtures, 'private.fixture.json');
let dir: string | undefined;
afterEach(() => dir && rmSync(dir, { recursive: true, force: true }));

const tempOut = () => {
  dir = mkdtempSync(path.join(tmpdir(), 'resume-'));
  return path.join(dir, 'nested', 'resume.pdf');
};

const textOf = async (file: string) => {
  const { text } = await extractText(new Uint8Array(readFileSync(file)), {
    mergePages: true,
  });
  return text.replace(/\s+/g, ' ');
};

test('writes a checked public résumé PDF', async () => {
  const outFile = tempOut();

  await buildPublicResume(outFile, { privateFixture: fixture });

  expect(readFileSync(outFile).subarray(0, 5).toString()).toBe('%PDF-');
});

test('writes a private résumé PDF that shows the private values', async () => {
  const outFile = tempOut();

  await buildPrivateResume(outFile, { privateFile: fixture });

  const text = await textOf(outFile);
  expect(text).toContain('PHONE-PLACEHOLDER');
  expect(text).toContain('SEEKING-PLACEHOLDER');
  expect(text).toContain('EMPLOYER-PLACEHOLDER');
});

test('private build without the local file says to copy the example and writes nothing', async () => {
  const outFile = tempOut();

  await expect(
    buildPrivateResume(outFile, {
      privateFile: path.join(fixtures, 'does-not-exist.json'),
    }),
  ).rejects.toThrow(/copy content\/private\.example\.json/i);
  expect(existsSync(outFile)).toBe(false);
});

test('the tracked example file builds a private résumé', async () => {
  const outFile = tempOut();

  await buildPrivateResume(outFile, {
    privateFile: path.join(__dirname, '..', 'content', 'private.example.json'),
  });

  expect(await textOf(outFile)).toContain('Example Employer');
});
