import { Section } from './section';
import type { SectionProps } from './types';

export function HowIBuild({ site: { howIBuild: copy } }: SectionProps) {
  return (
    <Section id={copy.id} title={copy.title}>
      {copy.paragraphs.map((text) => (
        <p key={text} className="mt-4 max-w-prose first:mt-0">
          {text}
        </p>
      ))}
      <p className="mt-4">
        <a href={copy.proofLink.href} className="underline">
          {copy.proofLink.label}
        </a>
      </p>
    </Section>
  );
}
