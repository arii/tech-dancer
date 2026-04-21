import { defineConfig, loadEnv, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = mode === 'production';
  const analyze = process.env.ANALYZE === 'true';
  const isVercel = process.env.VERCEL === '1';
  const isGHAction = process.env.GITHUB_ACTIONS === 'true';

  // 1. Centralized dynamic route discovery
  const getDynamicRoutes = () => {
    const contentPath = path.resolve(__dirname, 'content');
    if (!fs.existsSync(contentPath)) return [];

    return fs.readdirSync(contentPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .flatMap(dirent => {
        const dir = dirent.name;
        // Map folder names to URL prefixes
        const prefixMap: Record<string, string> = {
          blog: '/blog/',
          research: '/research/',
          gear: '/gear/',
          events: '/events/'
        };
        const prefix = prefixMap[dir] || `/${dir}/`;

        return fs.readdirSync(path.join(contentPath, dir))
          .filter(file => file.endsWith('.md'))
          .map(file => `${prefix}${file.replace('.md', '')}`);
      });
  };

  const staticRoutes = ['/gear', '/research', '/blog', '/resources', '/about', '/contact'];
  // Use /tech-dancer/ in production unless VITE_BASE_PATH is specified or on Vercel
  const resolvedBase = process.env.VITE_BASE_PATH || (isVercel ? '/' : (isGHAction || isProd ? '/tech-dancer/' : '/'));

  return {
    // 2. Base Path logic
    base: resolvedBase,

    plugins: [
      react(),
      tailwindcss(),

      // 3. Conditional production-only plugins
      isProd && ViteImageOptimizer({
        includePublic: true,
        webp: { quality: 80 },
        png: { quality: 90 },
        jpeg: { quality: 80 },
        avif: { quality: 70 },
        svg: { multipass: true },
      }),

      isProd && Sitemap({
        hostname: env.VITE_SITE_URL || 'https://arii.github.io',
        basePath: (env.VITE_BASE_PATH || '/tech-dancer').replace(/\/$/, ''),
        outDir: 'dist',
        exclude: ['/404'],
        generateRobotsTxt: false, // Managed via public/robots.txt
        dynamicRoutes: [...staticRoutes, ...getDynamicRoutes()],
      }),

      analyze && visualizer({
        open: false,
        filename: 'bundle-analysis.html',
        gzipSize: true,
      }),
    ].filter(Boolean) as PluginOption[],

    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },

    server: {
      hmr: process.env.DISABLE_HMR ? false : {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  };
});
