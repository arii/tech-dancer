import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['scripts/*.ts', 'scripts/**/*.mjs', 'dev-tools/*.{ts,mjs}'],
  project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}', 'dev-tools/**/*.{ts,mjs}'],
  ignore: [
    'src/components/Equalizer.tsx',
    'src/components/layout/DetailElements.tsx',
    'src/components/ui/EventCard.tsx',
    'src/components/ui/EventSidebar.tsx',
    'src/components/ui/GearCard.tsx',
    'src/components/ui/SectionHeader.tsx',
    'src/features/lab/useBlogDrafter.ts',
    'src/features/lab/config.ts'
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
