import { build } from 'vite';
await build({
  root: '.',
  build: { outDir: 'dist-test-all-5', rollupOptions: { input: 'test-all-globs-entry-5.js', output: { format: 'es' } } }
});
