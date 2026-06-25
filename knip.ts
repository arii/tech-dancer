import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    '.': {
      entry: ['scripts/*.ts', 'scripts/**/*.mjs', 'dev-tools/*.{ts,mjs}'],
      project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}', 'dev-tools/**/*.{ts,mjs}'],
    },
    'boomtick-mcp': {
      entry: ['src/index.ts'],
      project: ['src/**/*.ts'],
      ignore: ['src/evals/run-evals.ts'],
    },
  },
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
  ignoreBinaries: ['python3', 'semgrep'],
  ignoreExportsUsedInFile: true,
};

export default config;
