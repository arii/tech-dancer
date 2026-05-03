import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignoreExportsUsedInFile: true,
  workspaces: {
    '.': {
      entry: ['scripts/*.ts', 'scripts/**/*.mjs', 'dev-tools/*.mjs'],
      project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}', 'dev-tools/**/*.{ts,mjs}'],
      ignoreDependencies: [
        'tw-animate-css',
        'vite-plugin-pwa',
        'workbox-window'
      ],
      ignoreBinaries: [],
    },
    'artifacts/*': {
    }
  }
};

export default config;
