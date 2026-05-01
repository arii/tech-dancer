import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import Inspect from 'vite-plugin-inspect';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import Sitemap from 'vite-plugin-sitemap';
import { CONTENT_DIR_MAP, getContentSlugs } from './scripts/content-loader';
import { routes } from './src/config/routes';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';

  const base = process.env.NODE_ENV === 'production'
    ? '/tech-dancer/'
    : '/';

  const resolveHostname = () => {
    if (env.VITE_APP_URL) return env.VITE_APP_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'https://arii.github.io';
  };

  const hostname = resolveHostname().replace(/\/$/, '');
  const fullAppUrl = new URL(base, hostname).href;

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
      'process.env.APP_URL': JSON.stringify(fullAppUrl),
      'import.meta.env.VITE_APP_URL': JSON.stringify(fullAppUrl),
    },
    plugins: [
      react(),
      tailwindcss(),
      Sitemap({
        hostname: resolveHostname().replace(/\/$/, ''),
        basePath: base.replace(/\/$/, ''),
        dynamicRoutes: dynamicRoutes.map(route => route.replace(/\/$/, '') || '/'),
        // Exclude infrastructure pages that are not real app routes
        exclude: ['/404', '/previews', '/previews/'],
        generateRobotsTxt: false,
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
      process.env.ANALYZE === 'true' && visualizer({
        open: false,
        filename: 'bundle-analysis.html',
        gzipSize: true,
      }),
      !isProd && Inspect(),
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
