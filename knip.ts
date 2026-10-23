import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    ".": {
      entry: ['scripts/*.ts', 'scripts/**/*.mjs'],
      project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}'],
      ignoreDependencies: [
        'tw-animate-css',
        'vite-plugin-pwa',
        'workbox-window',
        '@types/pixelmatch',
        '@google/genai',
        '@vercel/node'
      ],
    }
  },
  rules: {
    duplicates: 'off',
  },
  ignoreBinaries: ['python3', 'semgrep', 'pylint', 'mypy', 'td'],
  ignoreExportsUsedInFile: true,
};

export default config;
