// @vitest-environment node
import { describe, expect, test } from 'vitest';
import { parseTrackedContent } from './schema';
import { publicContent } from './public';
import { siteCopy, siteCopySchema } from './site';

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

  test('a track outside full-stack and agentic-ai fails', () => {
    const mistagged = structuredClone(publicContent);
    // @ts-expect-error tracks are a fixed set
    mistagged.skills[0].tracks = ['full-stak'];

    expect(() => parseTrackedContent(mistagged)).toThrow();
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

  test('site copy is valid and its prose carries no numbers', () => {
    const site = siteCopySchema.parse(siteCopy);
    const prose = [
      site.hero.sentence,
      site.contact.lead,
      ...site.howIBuild.paragraphs,
    ];

    expect(prose.filter((text) => /\d/.test(text))).toEqual([]);
    expect(site.hero.resume.href).toBe('/resume.pdf');
  });

  test('every role is marked Chennai (on-site) and hides the employer', () => {
    for (const job of publicContent.work) {
      expect(job.location).toBe('Chennai (on-site)');
      expect(job.name).toEqual({ visibility: 'private' });
    }
  });
});
