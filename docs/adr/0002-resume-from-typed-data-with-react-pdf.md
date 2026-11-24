# Résumé rendered from typed data with React-PDF

The résumé is generated at build time from the same typed content as the site, using `@react-pdf/renderer`. The content follows the JSON Resume shape with two extensions: `visibility: "public" | "private"` on fields, and `tracks` tags on bullets and skills for tailoring later. One source means the site and the PDF can't drift apart, and the PDF is rebuilt and checked on every push.

The build fails if the extracted PDF text is incomplete or out of reading order, if the public PDF (including its metadata) contains a private value, or if the file exceeds 2.5 MB (the Greenhouse upload cap). These checks keep the PDF readable by applicant tracking systems.

Typst is the fallback if React-PDF can't produce clean, ordered text. Jake's Resume (LaTeX) and RenderCV are visual references only, because both need a second content source.
