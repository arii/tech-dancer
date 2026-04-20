import { build } from 'vite';

await build({
  root: '.',
  build: {
    outDir: 'dist-test-glob',
    rollupOptions: {
      input: 'test-glob-entry.js',
      output: { format: 'es' }
    }
  }
});
