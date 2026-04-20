import { build } from 'vite';
await build({
  root: '.',
  build: { outDir: 'dist-test-all-6', rollupOptions: { input: 'test-all-globs-entry-6.js', output: { format: 'es' } } }
});
