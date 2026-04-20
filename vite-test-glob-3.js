import { build } from 'vite';

await build({
  root: '.',
  build: {
    outDir: 'dist-test-glob-2',
    rollupOptions: {
      input: 'test-glob-entry-2.js',
      output: { format: 'es' }
    }
  }
});
