import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['scripts/*.ts', 'scripts/**/*.mjs', 'dev-tools/*.{ts,mjs}'],
  project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}', 'dev-tools/**/*.{ts,mjs}'],
  ignore: [
    'src/components/Equalizer.tsx',
    'src/components/products/ProductCard.tsx',
    'src/components/ReferralBanner.tsx',
    'src/components/ui/AffiliateCard.tsx',
    'src/lib/draftFiltering.ts',
    'src/pages/Merch.tsx',
    'src/utils/schema.ts'
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
