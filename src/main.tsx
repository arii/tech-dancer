import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { Buffer } from 'buffer';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

window.Buffer = window.Buffer || Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL || '/'}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
