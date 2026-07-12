import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './providers/ThemeProvider';
import { Box } from '@/layouts/Primitives';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initTelemetry } from '@/utils/telemetry';
import { routes } from './App.tsx';
import './index.css';

// Initialize error telemetry
initTelemetry();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

/**
 * Function to calculate the actual basename at runtime.
 * This ensures correct routing regardless of deployment depth.
 */
const getBasename = (): string => {
  return import.meta.env.BASE_URL || '/';
};

// Restore GitHub Pages SPA redirect
const redirect = sessionStorage.getItem('ghpages_redirect');
if (redirect) {
  sessionStorage.removeItem('ghpages_redirect');
  // Replace the current history entry with the real path
  const restoreBase = window.__ROUTER_BASENAME__ || import.meta.env.BASE_URL || '/';
  const normalizedBase = restoreBase.endsWith('/') ? restoreBase.slice(0, -1) : restoreBase;
  window.history.replaceState(null, '', `${normalizedBase}${redirect}`);
}

// Clean trailing slashes from basename (except for root '/')
const cleanBasename = (base: string): string => {
  return base === '/' ? '/' : base.replace(/\/$/, '');
};

const router = createBrowserRouter(routes, {
  basename: cleanBasename(getBasename()),
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <RouterProvider
              router={router}
              future={{ v7_startTransition: true }}
              fallbackElement={
                <Box id="loading-spinner" width="full" minHeight="screen" surface="bg" display="flex" align="center" justify="center">
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
    </ErrorBoundary>
  </StrictMode>,
);
