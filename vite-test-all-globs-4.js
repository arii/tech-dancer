import { build } from 'vite';
await build({
  root: '.',
  build: { outDir: 'dist-test-all-4', rollupOptions: { input: 'test-all-globs-entry-4.js', output: { format: 'es' } } }
});
