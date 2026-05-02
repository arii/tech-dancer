# Domain Update Guide: Switching to BoomTick.blog

This guide provides repository-specific context for updating the site to use the new custom domain **BoomTick.blog** on Vercel.

---

## Overview

Your site is currently deployed on Vercel. By following these steps, you'll:
1. Connect the BoomTick.blog domain to your Vercel project
2. Update environment configuration for the new domain
3. Verify that all URLs, metadata, and analytics resolve correctly

---

## Part 1: Vercel Domain Configuration

For step-by-step instructions on adding a custom domain to Vercel and configuring DNS records, please refer to the official Vercel documentation:

👉 **[Vercel Custom Domains Documentation](https://vercel.com/docs/concepts/projects/domains)**

---

## Part 2: Update Environment Configuration

Your application includes smart hostname resolution logic in `vite.config.ts`. Update these configurations:

### Update Environment Variables

1. **Vercel Already Handles This Automatically:**
   - Vercel automatically sets `VERCEL_URL` to your deployment domain.
   - When you configure `boomtick.blog` as the primary domain in Vercel, `VERCEL_URL` will automatically become `boomtick.blog`.
   - Your `vite.config.ts` will automatically use it via the `resolveHostname()` function.

2. **Optional: Set `VITE_APP_URL` for Explicit Control**
   - In Vercel Dashboard: **Settings** → **Environment Variables**
   - Add or update:
     - Key: `VITE_APP_URL`
     - Value: `https://boomtick.blog`
     - Environments: `Production`, `Preview`, `Development`
   - This overrides the automatic `VERCEL_URL` and ensures explicit control.

3. **For Local Development:**
   ```env
   # Create or update `.env.local` file in the project root
   VITE_APP_URL="https://boomtick.blog"
   ```

### Review Vite Configuration

The file `vite.config.ts` includes the following hostname resolution logic:

```typescript
const resolveHostname = () => {
  if (env.VITE_APP_URL) return env.VITE_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (isVercel) return 'https://tech-dancer.vercel.app';
  return 'https://arii.github.io';
};
```

**How it works (in priority order):**
1. ✅ **Explicit override**: Use `VITE_APP_URL` if you set it (recommended).
2. ✅ **Vercel automatic**: Use `VERCEL_URL` if deployed on Vercel.
3. ✅ **Vercel fallback**: Use hardcoded default if the above aren't available.
4. ✅ **Local fallback**: Use GitHub Pages URL as last resort.

---

## Part 3: Update Application References

### 1. Update Hardcoded Domain References

Search for any legacy references to your old domain:

```bash
grep -r "tech-dancer.vercel.app" src/
grep -r "arii.github.io" src/
```

### 2. Check UX Auditor Feature

The file `src/features/ux-auditor/useUXAuditor.ts` contains hostname detection logic that handles `.github.io` domains specifically. No changes are needed for `boomtick.blog`.

---

## Part 4: Update robots.txt for SEO

The `robots.txt` file must be updated to reflect the root path on the custom domain.

### Update `/public/robots.txt`

Open the file at `public/robots.txt` and ensure it uses root paths:

```txt
User-agent: *
Allow: /
Disallow: /previews/
Disallow: /404.html

Sitemap: https://boomtick.blog/sitemap.xml
```

---

## Part 5: Test & Verify

### 1. Test Locally

```bash
# Set environment variable locally
export VITE_APP_URL="https://boomtick.blog"

# Run build to test
pnpm build

# Check generated sitemap
cat dist/sitemap.xml | grep boomtick.blog
```

### 2. Test on Vercel

1. Push changes to your repository.
2. Vercel will automatically build and deploy.
3. Visit `https://boomtick.blog` and verify the site loads correctly.

---

## Quick Reference

| Item | Old | New |
|------|-----|-----|
| **Primary Domain** | `tech-dancer.vercel.app` | `boomtick.blog` |
| **Environment Variable** | Not set | `VITE_APP_URL=https://boomtick.blog` |
| **Sitemap URL** | Auto-resolved | Auto-resolved (uses env var) |
