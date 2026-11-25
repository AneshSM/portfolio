import { Section } from './section';
import type { SectionProps } from './types';

export function Projects({ resume, site: { projects: copy } }: SectionProps) {
  const building = resume.projects.filter((p) => p.status === 'building');
  const archived = resume.projects.filter((p) => p.status === 'archived');

  return (
    <Section id={copy.id} title={copy.title}>
      {building.map((project, i) => {
        const titleId = `${copy.id}-building-${i}`;
        return (
          <article key={project.name} aria-labelledby={titleId}>
            <p className="text-sm font-medium uppercase">{copy.buildingNow}</p>
            <h3 id={titleId} className="mt-1 text-xl font-semibold">
              {project.name}
            </h3>
            <p className="mt-2">{project.description}</p>
            {project.why && <p className="mt-2">{project.why}</p>}
            {project.url && (
              <p className="mt-2">
                <a href={project.url} className="underline">
                  {copy.linkLabel}
                </a>
              </p>
            )}
          </article>
        );
      })}
      {archived.length > 0 && (
        <details className="mt-8">
          <summary className="cursor-pointer font-medium">
            {copy.earlierLearning}
          </summary>
          <ul className="mt-4 space-y-2">
            {archived.map((project) => (
              <li key={project.name}>
                {project.url ? (
                  <a href={project.url} className="underline">
                    {project.name}
                  </a>
                ) : (
                  project.name
                )}
                {': '}
                <span>{project.description}</span>
              </li>
            ))}
          </ul>
        </details>
      )}
    </Section>
  );
}
