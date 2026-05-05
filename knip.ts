import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/main.tsx', 'scripts/*.ts', 'scripts/**/*.mjs', 'dev-tools/*.mjs'],
  project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}', 'dev-tools/**/*.{ts,mjs}'],
  ignore: ['src/components/Equalizer.tsx', 'src/styles/safelist.ts'],
  ignoreDependencies: [
    'tw-animate-css',
    'vite-plugin-pwa',
    'workbox-window'
  ],
  ignoreBinaries: ['python3'],
  ignoreExportsUsedInFile: true,
};

export default config;
