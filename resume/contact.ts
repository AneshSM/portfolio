import type { Basics } from '@/content';

// The résumé's contact details, shared by the layout and its text-order
// check so both agree on what the contact block holds.

const RESUME_NETWORKS = ['LinkedIn', 'GitHub'];

/** "https://www.example.com/x" → "example.com/x": shorter on paper. */
export function stripUrlScheme(url: string): string {
  return url.replace(/^https:\/\/(www\.)?/, '');
}

/** Profile links printed on the résumé, without their scheme. */
export function listResumeProfileUrls(basics: Basics): string[] {
  return basics.profiles
    .filter((profile) => RESUME_NETWORKS.includes(profile.network))
    .map((profile) => stripUrlScheme(profile.url));
}
