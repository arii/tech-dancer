/// <reference types="vite/client" />

interface Window {
  __ROUTER_BASENAME__?: string;
  Buffer: typeof import('buffer').Buffer;
  gtag: (...args: unknown[]) => void;
  dataLayer: unknown[];
}

interface ImportMetaEnv {
  readonly VITE_APP_URL: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_COMMIT_SHA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
