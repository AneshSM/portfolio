import type { Metadata } from 'next';
import './globals.css';

// Placeholder metadata until SEO lands (issue #9). Fonts come with the theme (issue #6).
export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio and résumé.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
