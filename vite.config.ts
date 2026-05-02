import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import Inspect from 'vite-plugin-inspect';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import Sitemap from 'vite-plugin-sitemap';
import { getAllRoutes } from './src/lib/routes-discovery';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';

  // Dynamic base path for GitHub Pages vs Vercel vs Local Override
  const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;
  const isGHAction = process.env.GITHUB_ACTIONS === 'true';
  const analyze = env.ANALYZE === 'true' || process.env.ANALYZE === 'true';
  const inspect = env.VITE_INSPECT === 'true' || process.env.VITE_INSPECT === 'true';

  // Default to root base path for BoomTick.blog deployment
  const base = process.env.VITE_BASE_PATH || '/';

  const resolveHostname = () => {
    if (env.VITE_APP_URL) return env.VITE_APP_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    if (isVercel) return 'https://boomtick.blog';
    return 'https://boomtick.blog';
  };

  const hostname = resolveHostname().replace(/\/$/, '');
  const fullAppUrl = new URL(base, hostname).href;

  // Automatically discover dynamic routes
  const { all: dynamicRoutes } = getAllRoutes();

  return {
    base,
    test: {
      globals: false,
      environment: 'jsdom',
      setupFiles: [],
      include: ['src/**/*.{test,spec}.ts'],
    },
    build: {
      target: 'esnext',
      // Ensure assets are also handled correctly
      assetsDir: 'assets',
      chunkSizeWarningLimit: 400,
    },
    define: {
      'process.env.APP_URL': JSON.stringify(fullAppUrl),
      'import.meta.env.VITE_APP_URL': JSON.stringify(fullAppUrl),
    },
    plugins: [
      react(),
      tailwindcss(),
      !process.env.VITEST && Sitemap({
        hostname: resolveHostname().replace(/\/$/, ''),
        basePath: base.replace(/\/$/, ''),
        dynamicRoutes: dynamicRoutes.filter(route => route !== '/').map(route => route.replace(/\/$/, '') || '/'),
        // Exclude infrastructure pages that are not real app routes
        exclude: ['/404', '/previews', '/previews/'],
        generateRobotsTxt: false,
        xmlns: {
          news: false,
          xhtml: true,
          image: false,
          video: false,
        },
        changefreq: {
          '/': 'daily',
          '/blog': 'weekly',
          '/gear': 'weekly',
          '/research': 'weekly',
          '*': 'monthly'
        },
        priority: {
          '/': 1.0,
          '/blog': 0.8,
          '/gear': 0.8,
          '/research': 0.8,
          '*': 0.5
        }
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
      inspect && !isProd && Inspect(),
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
