import { CopyEmail } from './copy-email';
import { Section } from './section';
import type { SectionProps } from './types';

const CTA_CLASS =
  'inline-flex min-h-6 items-center font-semibold text-ink-strong underline';
const BUTTON_CLASS =
  'inline-flex min-h-8 cursor-pointer items-center rounded-md border border-ink-strong px-3 text-sm font-semibold text-ink-strong transition-colors hover:bg-ink-strong hover:text-paper';

export function Contact({
  resume: { basics },
  site: { contact: copy, hero },
}: SectionProps) {
  return (
    <Section id={copy.id} title={copy.title}>
      <p className="max-w-prose">{copy.lead}</p>
      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a href={`mailto:${basics.email}`} className={CTA_CLASS}>
          {copy.emailLabel}
        </a>
        <span className="select-all">{basics.email}</span>
        <CopyEmail
          email={basics.email}
          label={hero.copyEmail.label}
          done={hero.copyEmail.done}
          className={BUTTON_CLASS}
        />
      </p>
      <p className="mt-2">
        <a
          href={hero.resume.href}
          download={hero.resume.fileName}
          className={CTA_CLASS}
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
