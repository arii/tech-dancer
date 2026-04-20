import { build } from 'vite';

await build({
  root: '.',
  build: {
    outDir: 'dist-test-all',
    rollupOptions: {
      input: 'test-all-globs-entry.js',
      output: { format: 'es' }
    }
  }
});
