import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import Sitemap from 'vite-plugin-sitemap';
import { CONTENT_DIR_MAP, getContentSlugs } from './scripts/content-loader';
import { routes } from './src/config/routes';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';

  // Dynamic base path for GitHub Pages vs Vercel vs Local Override
  const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;
  const isGHAction = process.env.GITHUB_ACTIONS === 'true';
  const analyze = process.env.ANALYZE === 'true';
  // Use VITE_BASE_PATH if specified (crucial for branch deployments), otherwise fallback to standard paths
  const base = process.env.VITE_BASE_PATH || (isVercel ? '/' : (isGHAction || isProd ? '/tech-dancer/' : '/'));

  // Automatically discover dynamic routes from config/routes.ts and content directories
  const dynamicRoutes = [
    // Static routes from config (excluding parameterized and catch-all)
    ...routes
      .map(r => r.path)
      .filter(path => path !== '*' && !path.includes(':')),
    // Dynamic content routes discovered from file system
    ...Object.entries(CONTENT_DIR_MAP).flatMap(([prefix, dir]) =>
      getContentSlugs(dir, prefix)
    ),
  ];

  return {
    base,
    build: {
      target: 'esnext',
      // Ensure assets are also handled correctly
      assetsDir: 'assets',
      chunkSizeWarningLimit: 400,
    },
    define: {
      'process.env.APP_URL': JSON.stringify(process.env.VITE_APP_URL || ''),
    },
    plugins: [
      react(),
      tailwindcss(),
      Sitemap({
        hostname: (env.VITE_APP_URL || 'https://arii.github.io/tech-dancer').replace(/\/$/, ''),
        dynamicRoutes, generateRobotsTxt: false,
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
