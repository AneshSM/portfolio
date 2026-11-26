import { Section } from './section';
import type { SectionProps } from './types';

export function Contact({
  resume: { basics },
  site: { contact: copy, hero },
}: SectionProps) {
  return (
    <Section id={copy.id} title={copy.title}>
      <p className="max-w-prose">{copy.lead}</p>
      <p className="mt-4 flex flex-wrap gap-4">
        <a
          href={`mailto:${basics.email}`}
          className="inline-flex min-h-6 items-center font-semibold text-ink-strong underline"
        >
          {copy.emailLabel}
        </a>
        <a
          href={hero.resume.href}
          className="inline-flex min-h-6 items-center font-semibold text-ink-strong underline"
        >
          {hero.resume.label}
        </a>
      </p>
      <ul className="mt-6 space-y-2">
        {basics.profiles.map((profile) => (
          <li key={profile.network}>
            <a
              href={profile.url}
              className="inline-flex min-h-6 items-center text-ink-strong underline"
            >
              {profile.network}
            </a>
            {profile.note && (
              <>
                {' · '}
                <span>{profile.note}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
