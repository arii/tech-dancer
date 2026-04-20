import { build } from 'vite';
await build({
  root: '.',
  build: { outDir: 'dist-test-all-9', rollupOptions: { input: 'src/lib/content.ts', preserveEntrySignatures: 'allow-extension', output: { format: 'es', entryFileNames: '[name].js' } } }
});
