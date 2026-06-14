# SEO Redirection Plan for Deprecated Pages

1. **Remove the routes from dynamic discovery:**
   - Modify `src/lib/routes-discovery.ts` to exclude routes that match `/gear` or `/events`.
   - Update `getAllRoutes` logic or provide explicit filtering so that the sitemap generator (`sitemapRoutes`) and SPA stubs generator (`stubs`) omit these URLs.

2. **Add Tombstone Redirects in `src/config/routes.ts`:**
   - Keep the `/gear` and `/events` route configs, but point them to a new `<RemovedPage>` component.
   - Point `/gear/:slug` and `/events/:slug` to the same `<RemovedPage>` component, or handle them via wildcards if applicable.

3. **Create `<RemovedPage>` component:**
   - Create `src/pages/RemovedPage.tsx` using layout primitives.
   - Embed the `<SEO>` component with a `noindex` tag (`<meta name="robots" content="noindex" />`). Note that `<SEO>` might already support a `noindex` prop.
   - Render a helpful message explaining that the gear/event pages have been decommissioned and provide a CTA to return to the Home or Blog page.

4. **Verify Implementation:**
   - Build the site and check `dist/sitemap.xml` and `dist/robots.txt` (if applicable) to ensure the routes are missing.
   - Load `/gear` or `/events` in the dev server and verify the noindex tag is present in the DOM.
