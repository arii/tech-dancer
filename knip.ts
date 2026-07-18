import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  workspaces: {
    ".": {
      entry: ['scripts/*.ts', 'scripts/**/*.mjs'],
      project: ['src/**/*.{ts,tsx}', 'scripts/**/*.{ts,mjs}'],
      ignore: [
        'src/components/Equalizer.tsx',
        'boomtick-pkg/mcp/**/*'
      ],
      ignoreDependencies: [
        'tw-animate-css',
        'vite-plugin-pwa',
        'workbox-window',
        'dependency-cruiser',
        '@types/pixelmatch',
        '@google/genai',
        '@vercel/node',
        'openai'
      ],
    }
  },
  ignoreBinaries: ['python3', 'semgrep', 'pylint', 'mypy', 'td-cli'],
  ignoreExportsUsedInFile: true,
};

export default config;
