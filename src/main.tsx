import { Buffer } from 'buffer';

// polyfilling Buffer for browser environment
(window as any).Buffer = (window as any).Buffer || Buffer;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './App.tsx';

import './index.css';

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL || '/',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
