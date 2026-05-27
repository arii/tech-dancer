import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['scripts/*.ts', 'scripts/**/*.mjs', 'dev-tools/*.{ts,mjs}'],
  project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}', 'dev-tools/**/*.{ts,mjs}'],
  ignore: [
    'src/components/Equalizer.tsx',
    'src/components/ui/AffiliateCard.tsx',
    'src/lib/draftFiltering.ts',
    'src/components/ui/MerchCard.tsx',
    'src/components/ui/SourceBadge.tsx',
    'src/features/shop/Shop.tsx'
  ],
  ignoreExportsUsedInFile: true,
  ignoreDependencies: [
    'tw-animate-css',
    'vite-plugin-pwa',
    'workbox-window'
  ],
  ignoreBinaries: ['python3'],
};

export default config;
