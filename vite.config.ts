import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const DEFAULT_IMAGE_QUALITY = { quality: 80 };

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
      ViteImageOptimizer({
        webp: DEFAULT_IMAGE_QUALITY,
        png: DEFAULT_IMAGE_QUALITY,
        jpeg: DEFAULT_IMAGE_QUALITY,
        jpg: DEFAULT_IMAGE_QUALITY,
        avif: { quality: 70 },
        svg: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false,
            },
          ],
        },
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
