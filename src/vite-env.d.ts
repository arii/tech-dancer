/// <reference types="vite/client" />

interface Window {
  __ROUTER_BASENAME__?: string;
  Buffer: typeof import('buffer').Buffer;
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
}

declare const __APP_VERSION__: string;
declare const __COMMIT_SHA__: string;
