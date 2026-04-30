import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['scripts/*.ts', 'scripts/*.mjs'],
  project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}'],
  ignoreDependencies: [
    'tw-animate-css'
  ],
  ignoreExportsUsedInFile: true,
};

export default config;
