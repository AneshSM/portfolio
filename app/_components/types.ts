import type { Resume, SiteCopy } from '@/content';

/** Every section renders from the public résumé and the page copy only. */
export type SectionProps = { resume: Resume; site: SiteCopy };
