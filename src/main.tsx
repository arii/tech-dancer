import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { Buffer } from 'buffer';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

console.log("[SYSTEM_HEALTH: OPTIMAL] - Tech-Dancer OS initialized.");

window.Buffer = window.Buffer || Buffer;

const basename = import.meta.env.BASE_URL?.replace(/\/$/, '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
