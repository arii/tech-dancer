import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    ".": {
      entry: ['scripts/*.ts', 'scripts/**/*.mjs', 'dev-tools/*.{ts,mjs}'],
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
    },
    "boomtick-mcp": {
      entry: ["src/evals/run-evals.ts"],
      project: ["src/**/*.ts"],
      ignoreDependencies: ["node-fetch"]
    }
  },
  ignoreBinaries: ['python3', 'semgrep'],
  ignoreExportsUsedInFile: true,
};

export default config;
