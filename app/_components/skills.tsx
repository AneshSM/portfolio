import { Section } from './section';
import type { SectionProps } from './types';

export function Skills({ resume, site: { skills: copy } }: SectionProps) {
  return (
    <Section id={copy.id} title={copy.title}>
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {resume.skills.map((group) => (
          <div key={group.name}>
            <h3 className="text-lg font-semibold">{group.name}</h3>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {group.keywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
