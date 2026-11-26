import type { Metadata } from 'next';
import { Patrick_Hand } from 'next/font/google';
import './globals.css';

// The banner's hand-lettered face, for small accents only, never body text.
const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-patrick-hand',
});

// Placeholder metadata until SEO lands (issue #9).
export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio and résumé.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${patrickHand.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
