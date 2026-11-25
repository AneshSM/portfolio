import { renderToBuffer } from '@react-pdf/renderer';
import type { Resume } from '@/content';
import { ResumeDocument } from './ResumeDocument';

/** Renders a résumé (public or private edition) to PDF bytes. */
export async function renderResumePdf(resume: Resume): Promise<Uint8Array> {
  return new Uint8Array(
    await renderToBuffer(<ResumeDocument resume={resume} />),
  );
}
