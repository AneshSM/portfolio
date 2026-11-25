// @vitest-environment node
import path from 'node:path';
import { extractText } from 'unpdf';
import { beforeAll, describe, expect, test } from 'vitest';
import { getResume } from '@/content';
import { checkResumePdf, privateValuesIn, resumeTextInOrder } from './check';
import { renderResumePdf } from './render';

const fixture = path.join(
  __dirname,
  '..',
  'content',
  '__fixtures__',
  'private.fixture.json',
);

const textOf = async (pdf: Uint8Array) => {
  const { text } = await extractText(new Uint8Array(pdf), {
    mergePages: true,
  });
  return text.replace(/\s+/g, ' ');
};

describe('renderResumePdf', () => {
  let publicText: string;

  beforeAll(async () => {
    publicText = await textOf(
      await renderResumePdf(getResume('public', { privateFile: fixture })),
    );
  });

  test('public résumé has selectable text with the standard headings in order', () => {
    const order = [
      'Anesh Somanath Majalikar',
      'Summary',
      'Experience',
      'Projects',
      'Skills',
      'Education',
    ].map((heading) => publicText.indexOf(heading));

    expect(order.every((index) => index >= 0)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });
});

describe('checkResumePdf', () => {
  test('passes the public résumé against the private fixture', async () => {
    const resume = getResume('public', { privateFile: fixture });

    const problems = await checkResumePdf(await renderResumePdf(resume), {
      inOrder: resumeTextInOrder(resume),
      forbidden: privateValuesIn(fixture),
    });

    expect(problems).toEqual([]);
  });

  test('reports text that is missing or out of order', async () => {
    const pdf = await renderResumePdf(getResume('public'));

    const problems = await checkResumePdf(pdf, {
      inOrder: ['Summary', 'Education', 'Experience', 'Courses'],
      forbidden: [],
    });

    expect(problems).toEqual([
      'text out of order: "Experience" should come after "Education"',
      'text missing: "Courses"',
    ]);
  });

  test('reports private values in the text', async () => {
    const privateResume = getResume('private', { privateFile: fixture });
    if (!privateResume) throw new Error('fixture missing');

    const problems = await checkResumePdf(
      await renderResumePdf(privateResume),
      {
        inOrder: [],
        forbidden: privateValuesIn(fixture),
      },
    );

    expect(problems).toEqual([
      'private value in text: "PHONE-PLACEHOLDER"',
      'private value in text: "SEEKING-PLACEHOLDER"',
      'private value in text: "EMPLOYER-PLACEHOLDER"',
    ]);
  });

  test('reports private values in the metadata', async () => {
    const resume = getResume('public');
    const leaky = {
      ...resume,
      basics: { ...resume.basics, label: 'Engineer at EMPLOYER-PLACEHOLDER' },
    };

    const problems = await checkResumePdf(await renderResumePdf(leaky), {
      inOrder: [],
      forbidden: ['EMPLOYER-PLACEHOLDER'],
    });

    expect(problems).toContain(
      'private value in metadata (Subject): "EMPLOYER-PLACEHOLDER"',
    );
  });

  test('reports a file over the size cap', async () => {
    const pdf = await renderResumePdf(getResume('public'));

    const problems = await checkResumePdf(pdf, {
      inOrder: [],
      forbidden: [],
      maxBytes: 1000,
    });

    expect(problems).toEqual([
      `file is ${pdf.byteLength} bytes; the cap is 1000`,
    ]);
  });

  test('reports a résumé that runs past one page', async () => {
    const resume = getResume('public');
    const long = {
      ...resume,
      work: [...resume.work, ...resume.work, ...resume.work].map((job, i) => ({
        ...job,
        id: `${job.id}-${i}`,
      })),
    };

    const problems = await checkResumePdf(await renderResumePdf(long), {
      inOrder: [],
      forbidden: [],
    });

    expect(problems).toEqual(['résumé is 2 pages; it must fit on one']);
  });
});
