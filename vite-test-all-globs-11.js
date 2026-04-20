import { build } from 'vite';
await build({
  root: '.',
  build: { outDir: 'dist-test-all-11', rollupOptions: { input: 'src/main.tsx', preserveEntrySignatures: 'allow-extension', output: { format: 'es', entryFileNames: '[name].js' } } }
});
