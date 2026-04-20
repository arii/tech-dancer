import { build } from 'vite';

await build({
  root: '.',
  build: {
    outDir: 'dist-test4',
    rollupOptions: {
      input: 'src/lib/content.ts',
      output: { format: 'es' }
    }
  }
});
