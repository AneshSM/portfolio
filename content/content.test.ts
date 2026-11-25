// @vitest-environment node
import { describe, expect, test } from 'vitest';
import { parseTrackedContent } from './schema';
import { publicContent } from './public';

describe('tracked content validation', () => {
  test('the tracked public content is valid', () => {
    expect(() => parseTrackedContent(publicContent)).not.toThrow();
  });

  test('a private field holding a value in tracked content fails', () => {
    const leaked = structuredClone(publicContent);
    leaked.basics.phone = {
      visibility: 'private',
      // @ts-expect-error tracked private fields have no value
      value: 'PHONE-PLACEHOLDER',
    };

    expect(() => parseTrackedContent(leaked)).toThrow();
  });
});

describe('capability-level content (ADR 0004)', () => {
  test('experience and project bullets carry no numbers until real ones exist', () => {
    const bullets = [
      ...publicContent.work.flatMap((job) => job.highlights),
      ...publicContent.projects.flatMap((project) => project.highlights),
    ].map((bullet) => bullet.text);

    expect(bullets.length).toBeGreaterThan(0);
    expect(bullets.filter((text) => /\d/.test(text))).toEqual([]);
  });

  test('every role is marked Chennai (on-site) and hides the employer', () => {
    for (const job of publicContent.work) {
      expect(job.location).toBe('Chennai (on-site)');
      expect(job.name).toEqual({ visibility: 'private' });
    }
  });
});
