import { renderToBuffer } from '@react-pdf/renderer';
import { getSiteCopy, type Resume } from '@/content';
import { ResumeDocument } from './resume-document';

/** Renders a résumé (public or private edition) to PDF bytes. */
export async function renderResumePdf(resume: Resume): Promise<Uint8Array> {
  return new Uint8Array(
    await renderToBuffer(
      <ResumeDocument
        resume={resume}
        presentLabel={getSiteCopy().experience.present}
      />,
    ),
  );
}
