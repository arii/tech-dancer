import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['scripts/*.ts', 'scripts/impact/*.ts', 'scripts/__tests__/*.ts', 'scripts/**/*.mjs', 'dev-tools/*.{ts,mjs}'],
  project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}', 'dev-tools/**/*.{ts,mjs}'],
  ignore: [
    'src/components/Equalizer.tsx'
  ],
  ignoreDependencies: [
    'tw-animate-css',
    'vite-plugin-pwa',
    'workbox-window',
    'dependency-cruiser',
    '@types/pixelmatch',
    '@google/genai'
  ],
  ignoreBinaries: ['python3', 'semgrep', 'gh'],
  ignoreExportsUsedInFile: true,
};

export default config;
