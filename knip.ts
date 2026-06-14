import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['scripts/*.ts', 'scripts/**/*.mjs', 'dev-tools/*.{ts,mjs}'],
  project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}', 'dev-tools/**/*.{ts,mjs}'],
  ignore: [
    'src/components/Equalizer.tsx',
    'src/components/ui/EventSidebar.tsx'
  ],
  ignoreDependencies: [
    'tw-animate-css',
    'vite-plugin-pwa',
    'workbox-window',
    'dependency-cruiser',
    '@types/pixelmatch'
  ],
  ignoreBinaries: ['python3', 'semgrep'],
  ignoreExportsUsedInFile: true,
};

export default config;
