1. **Understand the problem**: The issue is with Vite preview SPA routing for sub-path deployments (e.g. `/tech-dancer/`). When a request comes to `/tech-dancer?modal=true&q=swing` (no trailing slash), the Vite preview server rejects the request with a confusing "did you mean" error. This is because Vite 5 uses strict base checks internally in a middleware that is added very early.
2. **Current state**: In `vite.config.ts`, there is a custom middleware `spa-preview-fallback` that tries to do a 301 redirect or just change `req.url` to serve `index.html`. But neither works perfectly. A 301 redirect breaks Playwright reload tests. Changing just `req.url` still hits Vite's internal base check middleware because the custom middleware runs after it.
3. **The fix**: Modify the `spa-preview-fallback` plugin in `vite.config.ts`.
   - Instead of returning a function (which runs the middleware *after* Vite's internal ones), we should not return a function, so our middleware is injected *before* Vite's internal ones.
   - Bypass the Vite strict check by rewriting the URL internally (to the entry point with query params) instead of returning a 301 redirect.
   - Also, rewrite `req.originalUrl` because Vite's built-in subpath check looks at `req.originalUrl`.
4. **Implement**:
   - I have already modified `vite.config.ts` to implement the correct middleware logic. It has been successfully tested using my own preview server scripts and `playwright test` passes.
5. **Verify**: Ensure tests run correctly without throwing 'did you mean' errors. `pnpm run test:e2e:targeted` passes successfully now.
6. **Pre-commit**: Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
7. **Submit**: Commit and push changes.
