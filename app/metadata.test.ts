import { expect, test } from 'vitest';
import { metadata } from './layout';
import robots from './robots';
import sitemap from './sitemap';

// The production URL from docs/spec.md (Address).
const site = 'https://aneshsm-portfolio.vercel.app';

test('metadata names the owner and role, and points at the production URL', () => {
  expect(metadata.metadataBase?.toString()).toBe(`${site}/`);
  expect(metadata.title).toBe(
    'Anesh Somanath Majalikar | Software Engineer, Full Stack',
  );
  expect(metadata.description).toBe(
    'Full-stack engineer building web and mobile products in TypeScript, from React to PostgreSQL.',
  );
  expect(metadata.alternates?.canonical).toBe('/');
});

test('open graph and twitter cards describe the same page', () => {
  expect(metadata.openGraph).toMatchObject({
    type: 'website',
    url: '/',
    siteName: 'Anesh Somanath Majalikar',
    title: metadata.title,
    description: metadata.description,
  });
  expect(metadata.twitter).toMatchObject({
    card: 'summary_large_image',
    title: metadata.title,
    description: metadata.description,
  });
});

test('metadata carries no job-seeking or relocation signals', () => {
  const text = JSON.stringify(metadata).toLowerCase();
  for (const phrase of ['open to work', 'relocat', 'seeking', 'available']) {
    expect(text).not.toContain(phrase);
  }
});

test('the sitemap lists the home page at the production URL', () => {
  const entries = sitemap();
  expect(entries).toHaveLength(1);
  expect(entries[0].url).toBe(site);
});

test('robots allows everything and points at the sitemap', () => {
  expect(robots()).toEqual({
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site}/sitemap.xml`,
    host: site,
  });
});
