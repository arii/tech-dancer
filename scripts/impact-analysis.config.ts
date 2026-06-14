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
    '/events',
    '/research',
    '/merch',
    '/about',
    '/contact'
  ],

  // Route Mapping Overrides (PascalCase component name to URL slug)
  PAGE_ROUTE_OVERRIDES: {
    'Home': '/',
    'UXAuditor': '/ux-auditor',
    'BlogPost': '/blog/:slug',
    'EventGuide': '/events/:slug',
    'ResearchDetail': '/research/:id'
  } as Record<string, string>,

  // Content folder to URL prefix mapping
  CONTENT_MAP: {
    'content/posts/': '/blog/',
    'content/events/': '/events/',
    'content/studies/': '/research/'
  } as Record<string, string>
};
