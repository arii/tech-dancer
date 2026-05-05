import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/main.tsx', 'scripts/*.ts', 'scripts/**/*.mjs', 'dev-tools/*.mjs'],
  project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}', 'dev-tools/**/*.{ts,mjs}'],
  ignore: [
    'src/lib/types/navigation.ts',

    'src/components/ui/*.tsx',
    'src/components/navigation/*.tsx',
    'src/components/Navigation.tsx',
    'src/components/MobileBottomNav.tsx',
'src/styles/safelist.ts'],
  ignoreDependencies: [
    'tw-animate-css',
    'vite-plugin-pwa',
    'workbox-window'
  ],
  ignoreExportsUsedInFile: true,
  ignoreBinaries: ['python3'],
  rules: {
    exports: 'warn',
    types: 'warn'
  },
};

export default config;
