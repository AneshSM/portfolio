import type { ReactNode } from 'react';
import { Section } from './section';
import type { SectionProps } from './types';

const LINK_CLASS = 'inline-flex min-h-6 items-center text-ink-strong underline';

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-3 max-w-prose">{children}</div>
    </div>
  );
}

export function HowIBuild({ site: { howIBuild: copy } }: SectionProps) {
  const { loop, guardrails, verification, failure, example, setup } = copy;
  return (
    <Section id={copy.id} title={copy.title}>
      <p className="max-w-prose text-lg">{copy.claim}</p>

      <Part title={loop.title}>
        <ol className="list-decimal space-y-1 pl-5">
          {loop.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Part>

      <Part title={guardrails.title}>
        <ul className="list-disc space-y-1 pl-5">
          {guardrails.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Part>

      <Part title={verification.title}>
        <ul className="list-disc space-y-1 pl-5">
          {verification.checks.map((check) => (
            <li key={check}>{check}</li>
          ))}
        </ul>
        <pre className="mt-4 overflow-x-auto rounded bg-surface p-4 font-mono text-sm">
          {verification.output.text}
        </pre>
        <p className="mt-2 text-sm">
          <a href={verification.output.source.href} className={LINK_CLASS}>
            {verification.output.source.label}
          </a>
        </p>
      </Part>

      <Part title={failure.title}>
        <p>{failure.text}</p>
        <p className="mt-2">
          <a href={failure.link.href} className={LINK_CLASS}>
            {failure.link.label}
          </a>
        </p>
      </Part>

      <Part title={example.title}>
        <p>{example.text}</p>
        <ul className="mt-2 space-y-1">
          {example.links.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className={LINK_CLASS}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Part>

      <Part title={setup.title}>
        <p>{setup.text}</p>
      </Part>

      <p className="mt-8">
        <a href={copy.proofLink.href} className={LINK_CLASS}>
          {copy.proofLink.label}
        </a>
      </p>
    </Section>
  );
}
