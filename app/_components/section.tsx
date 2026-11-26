import type { ReactNode } from 'react';

/**
 * A page section: an anchor target labelled by its level-2 heading. On large
 * screens the heading sits in a sticky left column beside the content.
 */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-8 border-t border-rule/40 py-12 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12 lg:py-16"
    >
      <h2
        id={`${id}-title`}
        className="text-2xl font-semibold tracking-tight lg:sticky lg:top-8 lg:self-start"
      >
        {title}
      </h2>
      <div className="mt-6 lg:mt-0">{children}</div>
    </section>
  );
}
