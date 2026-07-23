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

/**
 * Utility to safely rewrite Vite SPA preview URLs
 */
function safelyRewriteSpaUrl(
  req: import('http').IncomingMessage & { url?: string, originalUrl?: string },
  pathname: string,
  query: string,
  baseWithSlash: string,
  baseNoSlash: string
) {
  // 1. Rewrite bare base (no trailing slash) → canonical base with slash.
  if (baseNoSlash && pathname === baseNoSlash) {
    // Instead of a 301 redirect which breaks Playwright reload tests when caching is involved,
    // we rewrite the URL internally to the entry point so Vite serves it immediately.
    // Sanitize the query string to prevent potential XSS/injection vulnerabilities.
    const safeQuery = new URLSearchParams(query).toString();
    const finalQuery = safeQuery ? `?${safeQuery}` : '';
    req.url = `${baseWithSlash}index.html${finalQuery}`;
    if (req.originalUrl && req.originalUrl.startsWith(baseNoSlash)) {
      // If originalUrl remains untouched, Vite might intercept it later.
      req.originalUrl = req.originalUrl.replace(baseNoSlash, baseWithSlash);
    }
  }

  // 2. SPA fallback: serve index.html for any non-asset path under base.
  // Exclude paths that already end with a file extension (including .html)
  // so that static files like previews/index.html are served directly.
  else if (
    pathname.startsWith(baseWithSlash) &&
    !pathname.startsWith(`${baseWithSlash}assets/`) &&
    !pathname.match(/\.(html|js|css|png|jpg|jpeg|webp|avif|svg|ico|woff2?|ttf|eot|map|json|txt|xml)$/)
  ) {
    // Keep the query string attached so that the browser/test runner doesn't lose it.
    // Sanitize the query string to prevent potential XSS/injection vulnerabilities.
    const safeQuery = new URLSearchParams(query).toString();
    const finalQuery = safeQuery ? `?${safeQuery}` : '';
    req.url = `${baseWithSlash}index.html${finalQuery}`;
  }
}

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
      include: ['src/**/*.{test,spec}.{ts,tsx}', 'tests/unit/**/*.{test,spec}.{ts,tsx}'],
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
              if (id.includes('react-syntax-highlighter') || id.includes('jspdf')) return module;
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
        configurePreviewServer(server: { middlewares: { use: (fn: (req: import('http').IncomingMessage & { url?: string, originalUrl?: string }, res: import('http').ServerResponse, next: () => void) => void) => void } }) {
          const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
          const baseNoSlash = baseWithSlash.slice(0, -1);

          // Note: Vite 5 uses strict base checks internally in a middleware that is added
          // very early. If a request comes to `/tech-dancer`, it will throw a 404 "did you mean"
          // unless we rewrite the URL *before* Vite's base check middleware runs.
          // By NOT returning a function, this middleware is injected *before* Vite's internal ones.
          server.middlewares.use((req, res, next) => {
            try {
              const url = req.url ?? '/';
              const [pathname, rest] = url.split('?') as [string, string | undefined];
              const query = rest ? `?${rest}` : '';

              safelyRewriteSpaUrl(req, pathname, query, baseWithSlash, baseNoSlash);
            } catch (error) {
              console.error('[spa-preview-fallback] Error processing URL fallback rewrite logic:', error);
              if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error processing URL fallback');
                return;
              }
            }

            next();
          });
        },
      },
      // Local development emulation for Vercel Serverless Functions in api/
      {
        name: 'vercel-api-dev-server',
        configureServer(server) {
          interface ExtendedRequest {
            query?: Record<string, string>;
            body?: unknown;
          }

          interface ExtendedResponse {
            status: (statusCode: number) => ExtendedResponse;
            json: (data: unknown) => ExtendedResponse;
            send: (data: unknown) => ExtendedResponse;
            statusCode: number;
            setHeader: (name: string, value: string) => void;
            end: (data?: unknown) => void;
          }

          const API_DIR = path.resolve(process.cwd(), 'api');

          // Each path.resolve call takes only string literals — no variable ever reaches it.
          // This breaks the taint chain that semgrep tracks from request input to path.resolve.
          const ALLOWED_API_FILES = new Map<string, string>([
            ['health',          path.resolve(API_DIR, 'health.ts')],
            ['latest-version',  path.resolve(API_DIR, 'latest-version.ts')],
            ['compare-version', path.resolve(API_DIR, 'compare-version.ts')],
            ['batch-compare',   path.resolve(API_DIR, 'batch-compare.ts')],
            ['skill.md',        path.resolve(API_DIR, 'skill.md.ts')],
          ]);

          function resolveApiFile(filename: string): string | null {
            return ALLOWED_API_FILES.get(filename) ?? null;
          }

          server.middlewares.use(async (req, res, next) => {
            if (!req.url?.startsWith('/api/')) {
              return next();
            }

            const url = new URL(req.url, `http://${req.headers.host}`);
            const pathname = url.pathname;
            const filename = pathname.slice(5); // e.g. latest-version or skill.md

            const apiFilePath = resolveApiFile(filename);
            if (!apiFilePath) {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: `API endpoint ${pathname} not found or invalid` }));
              return;
            }

            try {
              // Load the serverless function module dynamically via Vite's SSR loading
              const module = await server.ssrLoadModule(apiFilePath);
              const handler = module.default;

              if (typeof handler !== 'function') {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'API handler must export a default function' }));
                return;
              }

              // Mock VercelRequest helper properties
              const query: Record<string, string> = {};
              url.searchParams.forEach((val, key) => {
                query[key] = val;
              });
              const extReq = req as unknown as ExtendedRequest & typeof req;
              extReq.query = query;

              // Parse body for POST requests
              if (req.method === 'POST') {
                const buffers: Buffer[] = [];
                for await (const chunk of req) {
                  buffers.push(chunk as Buffer);
                }
                const bodyStr = Buffer.concat(buffers).toString('utf-8');
                try {
                  extReq.body = bodyStr ? JSON.parse(bodyStr) : undefined;
                } catch {
                  extReq.body = bodyStr;
                }
              }

              // Mock VercelResponse helper methods
              const extendedRes = res as unknown as ExtendedResponse & typeof res;
              extendedRes.status = (statusCode: number) => {
                extendedRes.statusCode = statusCode;
                return extendedRes;
              };
              extendedRes.json = (data: unknown) => {
                extendedRes.setHeader('Content-Type', 'application/json');
                extendedRes.end(JSON.stringify(data));
                return extendedRes;
              };
              extendedRes.send = (data: unknown) => {
                if (data && typeof data === 'object') {
                  return extendedRes.json(data);
                }
                extendedRes.end(data);
                return extendedRes;
              };

              // Run the handler
              await handler(extReq, extendedRes);
            } catch (err) {
              console.error("Error executing API:", pathname, err);
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: `API endpoint ${pathname} not found or failed to compile`, details: String(err) }));
            }
          });
        }
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
