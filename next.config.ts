import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Leaves out .next/dev types. next build's own filter misses them on Windows.
  typescript: { tsconfigPath: 'tsconfig.typecheck.json' },
  // Tailwind 4 compiles through Turbopack (create-next-app default).
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;
