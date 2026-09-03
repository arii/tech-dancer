import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    ".": {
      entry: ['scripts/*.ts', 'scripts/**/*.mjs'],
      project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}'],
      ignore: [
        'src/components/Equalizer.tsx',
        'src/config/impact-interactions.ts',
        'src/features/home/DevLabCallout.tsx',
        'src/features/wcs-navigator/components/FormFields/**',
        'src/features/wcs-navigator/data/goldenTraces.ts'
      ],
      ignoreDependencies: [
        'tw-animate-css',
        'vite-plugin-pwa',
        'workbox-window',
        'dependency-cruiser',
        '@types/pixelmatch',
        '@google/genai',
        '@vercel/node'
      ],
    }
  },
  rules: {
    duplicates: 'off',
  },
  ignoreBinaries: ['python3', 'semgrep', 'pylint', 'mypy', 'td-cli'],
  ignoreExportsUsedInFile: true,
};

export default config;
