import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import Inspect from 'vite-plugin-inspect';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';
import Sitemap from 'vite-plugin-sitemap';
import { CONTENT_DIR_MAP, getContentSlugs } from './scripts/content-loader';
import { routes } from './src/config/routes';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';

  // Dynamic base path for GitHub Pages vs Vercel vs Local Override
  const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;
  const isGHAction = process.env.GITHUB_ACTIONS === 'true';
  const analyze = env.ANALYZE === 'true' || process.env.ANALYZE === 'true';
  const inspect = env.VITE_INSPECT === 'true' || process.env.VITE_INSPECT === 'true';

  // Determine the GitHub branch for base path constructing
  const ghBranch = process.env.GITHUB_REF_NAME;
  const isMainBranch = ghBranch === 'main' || !ghBranch;
  
  // Use VITE_BASE_PATH if specified, otherwise construct based on environment
  let base = process.env.VITE_BASE_PATH;
  if (!base) {
    if (isVercel) {
      base = '/';
    } else if (isGHAction || isProd) {
      // If we're on a branch other than main in GH Actions, include the branch name in the base path
      base = isMainBranch ? '/tech-dancer/' : `/tech-dancer/${ghBranch}/`;
    } else {
      base = '/';
    }
  }

  const resolveHostname = () => {
    if (env.VITE_APP_URL) return env.VITE_APP_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    if (isVercel) return 'https://tech-dancer.vercel.app';
    return 'https://arii.github.io';
  };

  const hostname = resolveHostname().replace(/\/$/, '');
  const fullAppUrl = new URL(base, hostname).href.replace(/\/$/, '');

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
        hostname: hostname,
        dynamicRoutes: dynamicRoutes.map(route => path.posix.join(base, route).replace(/\/$/, '') || '/'),
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
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Tech-Dancer',
          short_name: 'TechDancer',
          description: "The Roboticist's Guide to WCS",
          theme_color: '#1A2B3C',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        }
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
