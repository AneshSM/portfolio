import { formatDateRange } from '@/content/dates';
import { Section } from './section';
import type { SectionProps } from './types';

export function Experience({
  resume,
  site: { experience: copy },
}: SectionProps) {
  return (
    <Section id={copy.id} title={copy.title}>
      <ol className="space-y-10">
        {resume.work.map((job) => {
          const titleId = `${copy.id}-${job.id}`;
          return (
            <li key={job.id}>
              <article aria-labelledby={titleId}>
                <h3 id={titleId} className="text-xl font-semibold">
                  {job.position}
                </h3>
                <div className="md:mt-3 md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
                  <div>
                    <p className="mt-1 text-ink-muted md:mt-0">
                      {formatDateRange(
                        job.startDate,
                        job.endDate,
                        copy.present,
                      )}
                    </p>
                    <p className="text-ink-muted">{job.location}</p>
                    {job.recognition && (
                      <p className="mt-1">{job.recognition}</p>
                    )}
                  </div>
                  <ul className="mt-3 list-disc space-y-2 pl-5 md:mt-0">
                    {job.highlights.map((bullet) => (
                      <li key={bullet.text}>{bullet.text}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
