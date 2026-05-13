/// <reference types="vite/client" />

declare global {
  interface Window {
    __ROUTER_BASENAME__?: string;
    Buffer: typeof import('buffer').Buffer;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}

interface ImportMetaEnv {
  readonly VITE_APP_URL: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_COMMIT_SHA: string;
  readonly VITE_SIMULATE_LOADING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
