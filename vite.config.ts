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
  const skipMinify = process.env.DISABLE_MINIFY === 'true' || mode === 'development';

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
      include: ['src/**/*.{test,spec}.{ts,tsx}', 'tests/unit/**/*.{test,spec}.{ts,tsx}', 'boomtick-pkg/tests/unit/**/*.{test,spec}.{ts,tsx}'],
    },
    build: {
      target: 'esnext',
      // Ensure assets are also handled correctly
      assetsDir: 'assets',
      chunkSizeWarningLimit: 400,
      minify: skipMinify ? false : 'esbuild',
      rollupOptions: {
        output: {
          compact: !skipMinify,
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const module = id.split('node_modules/').pop().split('/')[0];
              if (['lucide-react', 'recharts', 'motion', 'framer-motion', 'firebase'].includes(module)) {
                return module;
              }
              return 'vendor';
            }
          },
        }
      }
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
      // Fix Vite preview SPA routing for sub-path deployments (e.g. /tech-dancer/).
      // When the browser reloads a URL like /tech-dancer?modal=true&q=swing (no
      // trailing slash) Vite rejects the request with a confusing "did you mean"
      // error instead of serving index.html, breaking the Playwright reload test.
      {
        name: 'spa-preview-fallback',
        configurePreviewServer(server: { middlewares: { use: (fn: (req: import('http').IncomingMessage & { url?: string }, res: import('http').ServerResponse, next: () => void) => void) => void } }) {
          const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
          const baseNoSlash = baseWithSlash.slice(0, -1);

          server.middlewares.use((req, res, next) => {
            const url = req.url ?? '/';
            const [pathname, rest] = url.split('?') as [string, string | undefined];
            const query = rest ? `?${rest}` : '';

            // 1. Redirect bare base (no trailing slash) → canonical base with slash.
            if (baseNoSlash && pathname === baseNoSlash) {
              res.writeHead(301, { Location: `${baseWithSlash}${query}` });
              res.end();
              return;
            }

            // 2. SPA fallback: serve index.html for any non-asset path under base.
            // Exclude paths that already end with a file extension (including .html)
            // so that static files like previews/index.html are served directly.
            if (
              pathname.startsWith(baseWithSlash) &&
              !pathname.startsWith(`${baseWithSlash}assets/`) &&
              !pathname.match(/\.(html|js|css|png|jpg|jpeg|webp|avif|svg|ico|woff2?|ttf|eot|map|json|txt|xml)$/)
            ) {
              req.url = `${baseWithSlash}index.html`;
            }

            next();
          });
        },
      },
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
