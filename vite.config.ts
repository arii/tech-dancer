import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import Inspect from 'vite-plugin-inspect';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import Sitemap from 'vite-plugin-sitemap';
import { getAllRoutes } from './src/lib/routes-discovery';
import { getBasePath } from './scripts/base-path.js';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';

  // Standardized base path resolution
  const base = getBasePath();

  const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;
  const analyze = env.ANALYZE === 'true' || process.env.ANALYZE === 'true';
  const inspect = env.VITE_INSPECT === 'true' || process.env.VITE_INSPECT === 'true';

  const resolveHostname = () => {
    if (env.VITE_APP_URL) return env.VITE_APP_URL;
    if (process.env.VERCEL_ENV === 'production') return 'https://boomtick.blog';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    if (isVercel) return 'https://boomtick.blog';
    return 'https://boomtick.blog';
  };

  const hostname = resolveHostname().replace(/\/$/, '');
  const fullAppUrl = new URL(base, hostname).href;

  const appVersion = process.env.npm_package_version || '0.0.0';

  // Guard: Production builds must have a valid version (not 0.0.0)
  if (isProd && appVersion === '0.0.0') {
    throw new Error(
      'PRODUCTION BUILD FAILURE: package.json version is 0.0.0. ' +
      'Please use "pnpm release:patch|minor|major" to set a real version before deploying.'
    );
  }

  // Automatically discover dynamic routes
  const { sitemap: dynamicRoutes, detailed: routeDetails } = getAllRoutes();

  // Create lastmod mapping for the sitemap plugin
  const lastmodMap = Object.fromEntries(
    routeDetails.map(r => [r.path, new Date(r.lastmod)])
  );

  return {
    base,
    test: {
      globals: false,
      environment: 'jsdom',
      setupFiles: [],
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
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
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(appVersion),
      'import.meta.env.VITE_COMMIT_SHA': JSON.stringify(
        process.env.VERCEL_GIT_COMMIT_SHA ||
        process.env.GITHUB_SHA ||
        'dev'
      ),
      'import.meta.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString()),
      'import.meta.env.VITE_IS_VERCEL': JSON.stringify(
        process.env.VERCEL === '1' ? 'true' : 'false'
      ),
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
        lastmod: lastmodMap
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
