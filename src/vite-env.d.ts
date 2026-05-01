/// <reference types="vite/client" />

interface Window {
  __ROUTER_BASENAME__?: string;
  Buffer: typeof import('buffer').Buffer;
}

declare const __BUILD_VERSION__: string;
