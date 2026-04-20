import { build } from 'vite';

await build({
  root: '.',
  build: {
    outDir: 'dist-test-all-3',
    rollupOptions: {
      input: 'test-all-globs-entry-3.js',
      output: { format: 'es' }
    }
  }
});
