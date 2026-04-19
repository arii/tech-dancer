import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env vars regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Instruction 13: Handle GitHub Pages subdirectory
    // Fallback to '/' if VITE_BASE_PATH is not defined
    base: mode === 'production'
      ? (env.VITE_BASE_PATH || '/tech-dancer/')
      : '/',

    plugins: [
      react(),
      tailwindcss()
    ],

    define: {
      // Mapping specific keys ensures you don't leak unnecessary env vars
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        // Instruction 1: Set up path aliases (@/ -> src/)
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      // Simplified HMR logic for better portability
      hmr: env.DISABLE_HMR !== 'true',
      port: 5173,
      strictPort: true,
    },

    build: {
      // Ensure the output matches Instructions for GH Pages
      outDir: 'dist',
      sourcemap: mode !== 'production',
    }
  };
});
