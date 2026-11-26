import type { SectionProps } from './types';

const cta =
  'inline-flex min-h-11 items-center rounded-md border border-ink-strong px-4 font-semibold text-ink-strong no-underline transition-colors hover:bg-ink-strong hover:text-paper';

export function Hero({ resume: { basics }, site: { hero } }: SectionProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="animate-rise py-16 sm:py-24"
    >
      <h1
        id="hero-title"
        className="text-4xl font-extrabold tracking-tight sm:text-5xl"
      >
        {basics.name}
      </h1>
      <p className="mt-3 text-xl font-semibold">{basics.label}</p>
      <p className="mt-4 max-w-prose text-lg text-ink-muted">{hero.sentence}</p>
      <p className="mt-2 text-ink-muted">{basics.location.line}</p>
      <p className="mt-8 flex flex-wrap gap-3">
        <a href={hero.resume.href} className={cta}>
          {hero.resume.label}
        </a>
        <a href={`mailto:${basics.email}`} className={cta}>
          {hero.emailLabel}
        </a>
      </p>
    </section>
  );
}
