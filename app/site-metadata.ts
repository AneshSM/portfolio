import type { Metadata } from 'next';
import { getResume, getSiteCopy } from '@/content';

// Title, description and URLs for the page head, the social cards, the
// sitemap and robots.txt. Everything comes from content: name and role from
// the résumé, the description from the hero sentence, the URL from
// basics.url (the production address in docs/spec.md).

const { basics } = getResume('public');

export const siteUrl = basics.url;
export const siteName = basics.name;
export const siteRole = basics.label;
export const siteTitle = `${basics.name} | ${basics.label}`;
export const siteDescription = getSiteCopy().hero.sentence;

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
};
