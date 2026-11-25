import { Contact } from './contact';
import { Experience } from './experience';
import { Hero } from './hero';
import { HowIBuild } from './how-i-build';
import { Projects } from './projects';
import { Skills } from './skills';
import type { SectionProps } from './types';

const MAIN_ID = 'main';

/** The one-page site, in the order docs/spec.md sets. */
export function SitePage({ resume, site }: SectionProps) {
  const sections = [
    site.projects,
    site.howIBuild,
    site.experience,
    site.skills,
    site.contact,
  ];

  return (
    <>
      <a
        href={`#${MAIN_ID}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:p-2"
      >
        {site.skipLink}
      </a>
      <header className="mx-auto w-full max-w-3xl px-6 pt-6">
        <nav aria-label={site.navLabel}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="underline-offset-4 hover:underline"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main
        id={MAIN_ID}
        tabIndex={-1}
        className="mx-auto w-full max-w-3xl flex-1 px-6 pb-24"
      >
        <Hero resume={resume} site={site} />
        <Projects resume={resume} site={site} />
        <HowIBuild resume={resume} site={site} />
        <Experience resume={resume} site={site} />
        <Skills resume={resume} site={site} />
        <Contact resume={resume} site={site} />
      </main>
    </>
  );
}
