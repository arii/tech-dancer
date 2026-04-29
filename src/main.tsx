import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { registerSW } from 'virtual:pwa-register';
import { routes } from './App.tsx';
import './index.css';

// Register service worker for offline access
registerSW({ immediate: true });

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
  // check if the next segments are known routes.
  if (segments.length > baseSegments.length) {
    let branchSegmentsCount = 0;
    while (baseSegments.length + branchSegmentsCount < segments.length) {
      const segment = segments[baseSegments.length + branchSegmentsCount];
      if (VALID_TOP_LEVEL_PATHS.has(segment) || segment === 'index.html' || segment.includes('.')) {
        break;
      }
      branchSegmentsCount++;
    }

    if (branchSegmentsCount > 0) {
      // The basename includes these extra segments.
      return '/' + segments.slice(0, baseSegments.length + branchSegmentsCount).join('/') + '/';
    }
  }

  // 3. Fallback: Use the build-time BASE_URL
  return buildBase;
};

const router = createBrowserRouter(routes, {
  basename: getBasename(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider 
          router={router} 
          fallbackElement={<div className="h-screen w-screen bg-surface" />}
        />
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
);
