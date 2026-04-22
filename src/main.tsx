import { Buffer } from 'buffer';

// polyfilling Buffer for browser environment
window.Buffer = window.Buffer || Buffer;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './App.tsx';
import './index.css';

// Function to calculate the actual basename at runtime to support GitHub Pages branch previews
const getBasename = () => {
  const fullPath = window.location.pathname;
  const buildBase = import.meta.env.BASE_URL || '/';

  // If index.html already calculated a basename, use it
  if (window.__ROUTER_BASENAME__) {
      return window.__ROUTER_BASENAME__;
  }

  // Check if we are running in a subdirectory deeper than the build-time base (e.g., branch preview)
  // This helps when navigating normally (without a 404 redirect)
  if (fullPath.startsWith(buildBase) && fullPath !== buildBase) {
    const segments = fullPath.split('/');
    // For GitHub Pages: ['', 'tech-dancer', 'branch-name', 'route']
    if (segments.length > 2 && segments[1] === 'tech-dancer' && segments[2] !== '') {
      const firstSegment = segments[2];
      const standardRoutes = ['gear', 'research', 'blog', 'resources', 'about', 'contact', 'ux-auditor'];
      // Treat segments[2] as a branch if it has a dash or isn't a standard route
      if (firstSegment.includes('-') || standardRoutes.indexOf(firstSegment) === -1) {
        return `/${segments[1]}/${segments[2]}`;
      }
    }
  }
  return buildBase;
};

const router = createBrowserRouter(routes, {
  basename: getBasename(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
