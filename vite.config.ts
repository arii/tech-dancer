import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  
  // Dynamic base path for GitHub Pages vs Vercel
  const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;
  const isGHAction = process.env.GITHUB_ACTIONS === 'true';
  const isProd = mode === 'production';

  // Use VITE_BASE_PATH if provided, otherwise fallback to standard logic
  const base = env.VITE_BASE_PATH || (isVercel ? '/' : (isGHAction || isProd ? '/tech-dancer/' : '/'));

  return {
    base,
    plugins: [react(), tailwindcss(), ViteImageOptimizer()],
    define: {
      // Shim process.env for backward compatibility with code using old names
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
      'process.env.APP_URL': JSON.stringify(env.VITE_APP_URL),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR ? false : {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  };
});
