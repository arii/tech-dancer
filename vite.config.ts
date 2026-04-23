import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import {defineConfig} from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import Sitemap from 'vite-plugin-sitemap';

function getContentSlugs(dir: string, prefix: string): string[] {
  const fullPath = path.resolve(__dirname, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath)
    .filter(f => f.endsWith('.md'))
    .map(f => `${prefix}/${f.replace(/\.md$/, '')}`);
}

export default defineConfig(({mode}) => {
  const isProd = mode === 'production';

  // Dynamic base path for GitHub Pages vs Vercel vs Local Override
  const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;
  const isGHAction = process.env.GITHUB_ACTIONS === 'true';
  const analyze = process.env.ANALYZE === 'true';
  // Use VITE_BASE_PATH if specified (crucial for branch deployments), otherwise fallback to standard paths
  const base = process.env.VITE_BASE_PATH || (isVercel ? '/' : (isGHAction || isProd ? '/tech-dancer/' : '/'));

  const dynamicRoutes = [
    '/blog',
    '/gear',
    '/research',
    '/resources',
    '/about',
    '/contact',
    ...getContentSlugs('content/posts', '/blog'),
    ...getContentSlugs('content/resources', '/gear'),
  ];

  return {
    base,
    build: {
      assetsDir: 'assets',
      chunkSizeWarningLimit: 400,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-motion': ['motion'],
            'vendor-recharts': ['recharts'],
            'vendor-markdown': ['react-markdown'],
          },
        },
      },
    },
    define: {
      'process.env.APP_URL': JSON.stringify(process.env.VITE_APP_URL || ''),
    },
    plugins: [
      react(),
      tailwindcss(),
      Sitemap({
        hostname: (process.env.VITE_APP_URL || 'https://arii.github.io/tech-dancer').replace(/\/$/, ''),
        dynamicRoutes,
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
