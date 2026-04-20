import { build } from 'vite';
await build({
  root: '.',
  build: { outDir: 'dist-test', rollupOptions: { input: 'src/lib/content.ts' } }
});
