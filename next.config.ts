import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
