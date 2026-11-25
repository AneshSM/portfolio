import type { SectionProps } from './types';

export function Hero({ resume: { basics }, site: { hero } }: SectionProps) {
  return (
    <section aria-labelledby="hero-title" className="py-16">
      <h1 id="hero-title" className="text-4xl font-semibold tracking-tight">
        {basics.name}
      </h1>
      <p className="mt-2 text-xl">{basics.label}</p>
      <p className="mt-4 max-w-prose text-lg">{hero.sentence}</p>
      <p className="mt-2">{basics.location.line}</p>
      <p className="mt-6 flex flex-wrap gap-4">
        <a href={hero.resume.href} className="underline">
          {hero.resume.label}
        </a>
        <a href={`mailto:${basics.email}`} className="underline">
          {hero.emailLabel}
        </a>
      </p>
    </section>
  );
}
