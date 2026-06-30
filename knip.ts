import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    ".": {
      entry: ['scripts/*.ts', 'scripts/**/*.mjs', 'boomtick-pkg/cli/*.{ts,mjs}'],
      project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}', 'boomtick-pkg/cli/**/*.{ts,mjs}'],
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
    "boomtick-pkg/mcp": {
      entry: ["src/evals/run-evals.ts"],
      project: ["src/**/*.ts"],
      ignore: ["src/tools/contract.ts"]
    }
  },
  ignoreBinaries: ['python3', 'semgrep', 'td-cli'],
  ignoreExportsUsedInFile: true,
};

export default config;
