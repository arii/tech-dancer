import { build } from 'vite';
await build({
  root: '.',
  build: {
    outDir: 'dist-test2',
    rollupOptions: {
      input: 'src/lib/content.ts',
      output: { format: 'es' }
    }
  }
});
