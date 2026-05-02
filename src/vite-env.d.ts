/// <reference types="vite/client" />

interface Window {
  __ROUTER_BASENAME__?: string;
  Buffer: typeof import('buffer').Buffer;
  gtag: (command: string, ...args: unknown[]) => void;
  dataLayer: unknown[];
}
