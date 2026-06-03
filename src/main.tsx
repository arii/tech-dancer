import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './providers/ThemeProvider';
import { Box } from '@/layouts/Primitives';
import { routes } from './App.tsx';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

/**
 * Pre-calculate valid top-level paths from the route configuration.
 */
const VALID_TOP_LEVEL_PATHS = (() => {
  const children = routes[0].children || [];
  const paths = new Set<string>();
  for (const route of children) {
    if (route.path && route.path !== '*' && route.path !== '/') {
      paths.add(route.path.split('/')[0]);
    }
  }
  return paths;
})();

/**
 * Function to calculate the actual basename at runtime.
 * This ensures correct routing regardless of deployment depth (e.g. GitHub Pages branch previews).
 */
const getBasename = (): string => {
  // 1. Priority: Use the basename detected by index.html during a 404 restoration
  if (window.__ROUTER_BASENAME__) {
    return window.__ROUTER_BASENAME__;
  }

  const fullPath = window.location.pathname;
  const buildBase = import.meta.env.BASE_URL || '/';
  const buildBaseClean = buildBase.replace(/\/$/, '');

  const segments = fullPath.split('/').filter(Boolean);
  const baseSegments = buildBaseClean.split('/').filter(Boolean);

  // 2. Heuristic: If we are in a subdirectory deeper than buildBase,
  // find the last segment that is NOT a known route. This allows for
  // multi-segment branch names (e.g. fix/ux-nav-errors).
  if (segments.length > baseSegments.length) {
    let lastBaseSegmentIndex = baseSegments.length - 1;

    for (let i = baseSegments.length; i < segments.length; i++) {
      const segment = segments[i];
      const isStandardRoute = VALID_TOP_LEVEL_PATHS.has(segment);
      const isIndexHtml = segment === 'index.html';

      if (isStandardRoute || isIndexHtml) {
        break;
      }
      lastBaseSegmentIndex = i;
    }

    if (lastBaseSegmentIndex >= baseSegments.length) {
      return '/' + segments.slice(0, lastBaseSegmentIndex + 1).join('/') + '/';
    }
  }

  // 3. Fallback: Use the build-time BASE_URL
  return buildBase;
};

// Restore GitHub Pages SPA redirect
const redirect = sessionStorage.getItem('ghpages_redirect');
if (redirect) {
  sessionStorage.removeItem('ghpages_redirect');
  // Replace the current history entry with the real path
  window.history.replaceState(null, '', '/tech-dancer' + redirect);
}

const router = createBrowserRouter(routes, {
  basename: getBasename(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider
            router={router}
            fallbackElement={
              <Box as="main" id="main-content" width="full" minHeight="screen" surface="bg" display="flex" align="center" justify="center">
                <Box
                  width={8}
                  height={8}
                  radius="full"
                  className="border-4 border-accent border-t-transparent animate-spin"
                />
              </Box>
            }
          />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
);
