import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import {defineConfig, loadEnv} from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';

  // Dynamic base path for GitHub Pages vs Vercel vs Local Override
  const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;
  const isGHAction = process.env.GITHUB_ACTIONS === 'true';
  const analyze = process.env.ANALYZE === 'true';
  // Use VITE_BASE_PATH if specified (crucial for branch deployments), otherwise fallback to standard paths
  const base = process.env.VITE_BASE_PATH || (isVercel ? '/' : (isGHAction || isProd ? '/tech-dancer' : '/'));

  return {
    base,
    build: {
      // Ensure assets are also handled correctly
      assetsDir: 'assets',
    },
    define: {
      'process.env.APP_URL': JSON.stringify(process.env.VITE_APP_URL || ''),
    },
    plugins: [
      react(),
      tailwindcss(),
      Sitemap({
        hostname: 'https://tech-dancer.github.io/tech-dancer',
        dynamicRoutes: [
          '/blog',
          '/gear',
          '/research',
          '/resources',
          '/about',
          '/contact'
        ],
        basePath: base
      }),
      ViteImageOptimizer({
        includePublic: true,
        webp: {
          quality: 80,
        },
        png: {
          quality: 90,
        },
        jpeg: {
          quality: 80,
        },
        avif: {
          quality: 70,
        },
        svg: {
          multipass: true,
        },
      }),
      analyze && visualizer({
        open: false,
        filename: 'bundle-analysis.html',
        gzipSize: true,
      }),
    ].filter(Boolean),
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
