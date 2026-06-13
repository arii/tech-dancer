import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['scripts/*.ts', 'scripts/**/*.mjs', 'dev-tools/*.{ts,mjs}'],
  project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}', 'dev-tools/**/*.{ts,mjs}'],
  ignore: [
    'src/components/Equalizer.tsx'
  ],
  ignoreDependencies: [
    'dependency-cruiser',
    'tw-animate-css',
    'vite-plugin-pwa',
    'workbox-window',
    'dependency-cruiser'
  ],
  ignoreBinaries: ['python3', 'gh'],
  ignoreExportsUsedInFile: true,
};

export default config;
