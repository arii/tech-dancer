import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import {defineConfig, loadEnv} from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig(({mode}) => {
  // Dynamic base path for GitHub Pages vs Vercel
  const isVercel = process.env.VERCEL === '1' || !!process.env.VERCEL;
  const isGHAction = process.env.GITHUB_ACTIONS === 'true';
  const isProd = mode === 'production';
  const analyze = process.env.ANALYZE === 'true';
  const base = isVercel ? '/' : (isGHAction || isProd ? '/tech-dancer/' : '/');

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
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
      Sitemap({
        hostname: 'https://arii.github.io/tech-dancer/',
        outDir: 'dist',
        exclude: ['/404'],
        generateRobotsTxt: true,
        robots: [{
          userAgent: '*',
          allow: '/',
        }],
        dynamicRoutes: [
          '/',
          '/gear',
          '/research',
          '/blog',
          '/resources',
          '/about',
          '/contact',
          ...(() => {
            const routes: string[] = [];
            const contentDirs = [
              { dir: 'posts', prefix: '/blog/' },
              { dir: 'resources', prefix: '/gear/' },
              { dir: 'events', prefix: '/events/' },
              { dir: 'studies', prefix: '/research/' },
            ];

            contentDirs.forEach(({ dir, prefix }) => {
              const fullPath = path.resolve(__dirname, 'content', dir);
              if (fs.existsSync(fullPath)) {
                const files = fs.readdirSync(fullPath);
                files.forEach(file => {
                  if (file.endsWith('.md')) {
                    const slug = file.replace('.md', '');
                    routes.push(`${prefix}${slug}`);
                  }
                });
              }
            });
            return routes;
          })()
        ]
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
