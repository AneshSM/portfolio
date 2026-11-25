// @vitest-environment node
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { getResume } from '.';

const fixture = (name: string) => path.join(__dirname, '__fixtures__', name);
const withPrivateFile = { privateFile: fixture('private.fixture.json') };
const withoutPrivateFile = { privateFile: fixture('does-not-exist.json') };

describe('getResume', () => {
  test('public edition leaves private fields empty even when the private file exists', () => {
    const resume = getResume('public', withPrivateFile);

    expect(resume.basics.phone).toBeUndefined();
    expect(resume.basics.seeking).toBeUndefined();
    expect(resume.work.map((job) => job.name)).toEqual([
      undefined,
      undefined,
      undefined,
    ]);
    expect(JSON.stringify(resume)).not.toContain('PLACEHOLDER');
  });

  test('public edition keeps the public content', () => {
    const resume = getResume('public', withoutPrivateFile);

    expect(resume.basics.email).toBe('aneshsm204@gmail.com');
    expect(resume.work.map((job) => job.position)).toEqual([
      'Software Engineer',
      'Associate Software Engineer',
      'Intern',
    ]);
  });

  test('private edition merges values from the private file', () => {
    const resume = getResume('private', withPrivateFile);

    expect(resume?.basics.phone).toBe('PHONE-PLACEHOLDER');
    expect(resume?.basics.seeking).toBe('SEEKING-PLACEHOLDER');
    expect(resume?.work[0].name).toBe('EMPLOYER-PLACEHOLDER');
    expect(resume?.work[0].position).toBe('Software Engineer');
  });

  test('private edition is null without a private file', () => {
    expect(getResume('private', withoutPrivateFile)).toBeNull();
  });

  test('a private file with unknown fields fails', () => {
    expect(() =>
      getResume('private', { privateFile: fixture('private.invalid.json') }),
    ).toThrow();
  });
});
