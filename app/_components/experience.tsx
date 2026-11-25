import { Section } from './section';
import type { SectionProps } from './types';

const monthFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2023-02" → "Feb 2023". */
const formatMonth = (isoMonth: string) =>
  monthFormat.format(new Date(`${isoMonth}-01T00:00:00Z`));

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
                <p className="mt-1">
                  {formatMonth(job.startDate)} –{' '}
                  {job.endDate ? formatMonth(job.endDate) : copy.present}
                </p>
                <p>{job.location}</p>
                {job.recognition && <p className="mt-1">{job.recognition}</p>}
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  {job.highlights.map((bullet) => (
                    <li key={bullet.text}>{bullet.text}</li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
