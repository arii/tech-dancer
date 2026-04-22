import { Buffer } from 'buffer';

// polyfilling Buffer for browser environment
(window as any).Buffer = (window as any).Buffer || Buffer;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './App.tsx';
import './index.css';

/**
 * Function to calculate the actual basename at runtime.
 * This ensures correct routing regardless of deployment depth (e.g. GitHub Pages branch previews).
 */
const getBasename = () => {
  // 1. Priority: Use the basename detected by index.html during a 404 restoration
  if ((window as any).__ROUTER_BASENAME__) {
    return (window as any).__ROUTER_BASENAME__;
  }

  const fullPath = window.location.pathname;
  // Standardize buildBase to not have a trailing slash
  const buildBase = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  const segments = fullPath.split('/').filter(Boolean);
  const baseSegments = buildBase.split('/').filter(Boolean);

  // 2. Heuristic: If we are in a subdirectory deeper than buildBase,
  // check if the next segment is a known top-level route.
  if (segments.length > baseSegments.length) {
    const possibleRouteSegment = segments[baseSegments.length];

    // Whitelist of standard top-level routes to avoid misidentifying them as branch names
    const standardRoutes = ['gear', 'research', 'blog', 'resources', 'about', 'contact', 'ux-auditor'];

    const isStandardRoute = standardRoutes.indexOf(possibleRouteSegment) !== -1;
    const isIndexHtml = possibleRouteSegment === 'index.html';

    if (!isStandardRoute && !isIndexHtml) {
      // It's likely a branch name. The basename includes this extra segment.
      return '/' + segments.slice(0, baseSegments.length + 1).join('/');
    }
  }

  // 3. Fallback: Use the build-time BASE_URL
  return buildBase || '/';
};

const router = createBrowserRouter(routes, {
  basename: getBasename(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
