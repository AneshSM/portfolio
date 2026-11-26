'use client';

import { useState } from 'react';

/**
 * Copies the address, for visitors whose browser has no mail app behind
 * mailto: links.
 */
export function CopyEmail({
  email,
  label,
  done,
  className,
}: {
  email: string;
  label: string;
  done: string;
  className: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked: the address stays visible in Contact.
    }
  }

  return (
    <>
      <button type="button" onClick={() => void copy()} className={className}>
        {label}
      </button>
      <span role="status" className="self-center text-sm text-ink-muted">
        {copied ? done : ''}
      </span>
    </>
  );
}
