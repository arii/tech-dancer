export const IMPACT_CONFIG = {
  PAGES_DIR: 'src/pages',

  // Severity paths
  HIGH_IMPACT_PATHS: [
    'src/layouts/',
    'src/styles/',
    'src/components/ui/',
    'src/index.css'
  ],
  MEDIUM_IMPACT_PATHS: [
    'src/features/'
  ],

  // Global triggers and fallback URLs
  GLOBAL_TRIGGERS: [
    'src/App.tsx',
    'src/config/routes.ts',
    'src/layouts/MainLayout.tsx',
    'src/index.css'
  ],
  DEFAULT_STATIC_PAGES: [
    '/',
    '/blog',
    '/gear',
    '/events',
    '/research',
    '/merch',
    '/about',
    '/contact'
  ],

};
