import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import {defineConfig, loadEnv} from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  
  // Dynamic base path for GitHub Pages vs Vercel
  const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;
  const isGHAction = process.env.GITHUB_ACTIONS === 'true';
  const isProd = mode === 'production';
  const base = isVercel ? '/' : (isGHAction || isProd ? '/tech-dancer/' : '/');

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      ViteImageOptimizer(),
      visualizer({
        open: false,
        filename: 'bundle-analysis.html',
      }),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
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
