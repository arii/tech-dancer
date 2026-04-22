import { Buffer } from 'buffer';

// polyfilling Buffer for browser environment
(window as any).Buffer = (window as any).Buffer || Buffer;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { routes } from './App.tsx';
import './index.css';

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL || '/',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);
