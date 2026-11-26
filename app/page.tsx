import { getResume, getSiteCopy } from '@/content';
import { SitePage } from './_components/site-page';

// The site renders the public edition only (ADR 0003).
export default function Home() {
  return <SitePage resume={getResume('public')} site={getSiteCopy()} />;
}
