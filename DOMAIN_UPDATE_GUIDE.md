# Domain Update Guide: Switching to BoomTick.blog

This guide provides step-by-step instructions for updating the site from its current deployment to use the new custom domain **BoomTick.blog** on Vercel.

---

## Overview

Your site is currently deployed on Vercel with a default Vercel domain. By following these steps, you'll:
1. Connect the BoomTick.blog domain to your Vercel project
2. Update environment configuration for the new domain
3. Verify that all URLs, metadata, and analytics resolve correctly
4. Update any documentation or references

---

## Part 1: Vercel Domain Configuration

### Step 1: Add Domain to Vercel Project

1. **Log in to Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Select your project (likely named "react-example" or similar)

2. **Navigate to Domain Settings**
   - Click on **Settings** → **Domains**
   - Click **Add Domain**

3. **Enter Your Domain**
   - Type `boomtick.blog` in the domain input field
   - Vercel will show you the next steps

4. **Configure DNS Records**
   - Vercel will provide DNS records to add to your domain registrar
   - Common configuration (you'll see exact records in Vercel):
     - **Type**: `A` record pointing to Vercel's IP address
     - Or use **CNAME** record if recommended by Vercel
     - Or use Vercel's nameservers (simplest option)

### Step 2: Update DNS at Your Registrar

Since you mentioned having BoomTick.blog set up with Vercel already, verify:

1. **Log in to your domain registrar** (where you purchased BoomTick.blog)
2. **Navigate to DNS/Domain Settings**
3. **Apply the DNS records provided by Vercel**
   - Option A: Add A record and CNAME records
   - Option B: Point nameservers to Vercel's nameservers (simplest)
4. **Wait for propagation** (typically 5 minutes to 48 hours)

### Step 3: Set as Primary Domain (Optional but Recommended)

1. In Vercel Dashboard, go to **Settings** → **Domains**
2. Find your `boomtick.blog` domain
3. Click the three-dot menu and select **Set as primary domain**
4. This ensures Vercel redirects the old Vercel domain to your custom domain

---

## Part 2: Update Environment Configuration

Your application currently has hostname resolution logic in `vite.config.ts`. Update these configurations:

### Update Environment Variables

1. **Vercel Already Handles This Automatically:**
   - Vercel automatically sets `VERCEL_URL` to your deployment domain
   - When you configure `boomtick.blog` as the primary domain in Vercel, `VERCEL_URL` will automatically become `boomtick.blog`
   - Your vite.config.ts will automatically use it via the `resolveHostname()` function

2. **Optional: Set `VITE_APP_URL` for Explicit Control**
   - In Vercel Dashboard: **Settings** → **Environment Variables**
   - Add or update:
     - Key: `VITE_APP_URL`
     - Value: `https://boomtick.blog`
     - Environments: `Production`, `Preview`, `Development`
   - This overrides the automatic `VERCEL_URL` and ensures explicit control

3. **For Local Development:**
   ```env
   # Create or update `.env.local` file in the project root
   VITE_APP_URL="https://boomtick.blog"
   ```

### Review Vite Configuration

The file `vite.config.ts` includes smart hostname resolution logic:

```typescript
const resolveHostname = () => {
  if (env.VITE_APP_URL) return env.VITE_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (isVercel) return 'https://tech-dancer.vercel.app';
  return 'https://arii.github.io';
};
```

**How it works (in priority order):**
1. ✅ **Explicit override**: Use `VITE_APP_URL` if you set it (recommended)
2. ✅ **Vercel automatic**: Use `VERCEL_URL` if deployed on Vercel (Vercel sets this automatically!)
3. ✅ **Vercel fallback**: Use hardcoded default if the above aren't available
4. ✅ **Local fallback**: Use GitHub Pages URL as last resort

**Important**: Vercel **automatically** sets `VERCEL_URL` to your deployment URL. When you add `boomtick.blog` as a custom domain in Vercel, `VERCEL_URL` will automatically become `boomtick.blog`.

**So you have two options:**
- **Option A (Recommended)**: Set `VITE_APP_URL=https://boomtick.blog` for explicit control
- **Option B (Automatic)**: Do nothing - Vercel's `VERCEL_URL` will handle it once the domain is configured

**Best practice**: Set `VITE_APP_URL=https://boomtick.blog` anyway for consistency and to avoid relying on Vercel's environment variable.

---

## Part 3: Update Application References

### 1. Update Hardcoded Domain References

Search for any hardcoded references to your old domain:

```bash
# Check for old domain references
grep -r "tech-dancer.vercel.app" src/
grep -r "arii.github.io" src/
```

If any are found, update them to use `boomtick.blog` instead.

### 2. Check UX Auditor Feature

The file `src/features/ux-auditor/useUXAuditor.ts` contains hostname detection logic:

```typescript
if (urlObj.hostname.endsWith('.github.io')) {
  const userPart = urlObj.hostname.split('.')[0];
  // ... GitHub Pages specific logic
}
```

**This won't affect BoomTick.blog** since it only checks for `.github.io` domains. No changes needed here.

---

## Part 4: Update robots.txt for SEO

The `robots.txt` file is critical for SEO as it tells search engines which parts of your site to crawl and includes the sitemap location.

### Update `/public/robots.txt`

Open the file at `public/robots.txt` and replace its contents:

**Old (GitHub Pages with `/tech-dancer/` path):**
```txt
User-agent: *
Allow: /tech-dancer/
Disallow: /tech-dancer/previews/
Disallow: /tech-dancer/404.html

Sitemap: https://arii.github.io/tech-dancer/sitemap.xml
```

**New (Custom domain with root path):**
```txt
User-agent: *
Allow: /
Disallow: /previews/
Disallow: /404.html

Sitemap: https://boomtick.blog/sitemap.xml
```

### Changes Explained

| Item | Old (GitHub Pages) | New (Custom Domain) |
|------|-------------------|-------------------|
| **Crawl Rules** | `Allow: /tech-dancer/` | `Allow: /` |
| **Preview Disallow** | `Disallow: /tech-dancer/previews/` | `Disallow: /previews/` |
| **404 Disallow** | `Disallow: /tech-dancer/404.html` | `Disallow: /404.html` |
| **Sitemap URL** | `https://arii.github.io/tech-dancer/sitemap.xml` | `https://boomtick.blog/sitemap.xml` |

### Why This Matters

- **Search engines use robots.txt** to understand your site structure and know which pages to crawl
- **Sitemap URL must be correct** - it tells Google exactly which pages to index and their priority
- **Old paths must be removed** - if robots.txt references `/tech-dancer/` paths, crawlers will look for those instead of your root URLs
- **Updated 404 path** - the file path changes from nested to root

### Verification

After updating robots.txt, verify it's working:

1. **Visit the file directly:**
   ```
   https://boomtick.blog/robots.txt
   ```
   Should display the updated content

2. **Check in Google Search Console:**
   - Go to Google Search Console
   - Select `https://boomtick.blog`
   - Go to **Settings** → **Crawl stats**
   - Verify crawlers are respecting your robots.txt rules

3. **Test with robots.txt Tester:**
   - In Google Search Console, go to **Tools** → **robots.txt Tester**
   - Test a few URLs to ensure they're allowed/disallowed as expected

---

## Part 5: Update SEO & Metadata

### 1. Update Sitemap Configuration

The `vite.config.ts` includes sitemap generation that automatically uses `resolveHostname()`:

```typescript
Sitemap({
  hostname: resolveHostname().replace(/\/$/, ''),
  // ... other config
})
```

**This is automatic** - once you set `VITE_APP_URL`, the sitemap will use BoomTick.blog.

### 2. Update Meta Tags (if hardcoded)

Search for any hardcoded meta tags with the old domain:

```bash
grep -r "og:url\|canonical" src/
```

Update any hardcoded URLs to use the new domain or environment-based URLs.

### 3. Update robots.txt File

The `robots.txt` file is critical for SEO as it tells search engines which parts of your site to crawl and includes the sitemap location.

**Update `/public/robots.txt`:**

```txt
User-agent: *
Allow: /
Disallow: /previews/
Disallow: /404.html

Sitemap: https://boomtick.blog/sitemap.xml
```

**Key changes:**
- ✅ `Allow: /` - Allow crawling of the entire site (simpler than `Allow: /tech-dancer/` which was for GitHub Pages)
- ❌ Remove `/tech-dancer/` paths since you're now on a custom domain
- ✅ Update Sitemap URL to `https://boomtick.blog/sitemap.xml`

**Why this matters:**
- Search engines use robots.txt to understand your site structure
- The sitemap URL tells Google exactly which pages to index
- Without this update, crawlers might still look for old GitHub Pages paths

### 4. Update Analytics & Tracking

If you use Google Analytics, Plausible, or similar:
- Log in to your analytics dashboard
- Add `boomtick.blog` as a new property or domain
- Update any hardcoded domain references in tracking code

---

## Part 6: Documentation Updates

### 1. Update README.md

Edit `README.md` if it contains any domain references:
- Change any references to the old domain
- Update any URLs pointing to the site

### 2. Update Configuration Files

Check and update any domain references in:
- `.env.example` - update the example VITE_APP_URL
- Deployment docs or CONTRIBUTING.md
- Any other documentation files

### 3. Update GitHub Pages References (if applicable)

If this project also deploys to GitHub Pages, verify:
- Any CI/CD workflows in `.github/workflows/` don't hardcode the old domain
- Check `vite.config.ts` - the GitHub Pages fallback is set to `https://arii.github.io`

---

## Part 7: Test & Verify

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

1. Push changes to your repository
2. Vercel will automatically build and deploy
3. Visit `https://boomtick.blog` and verify:
   - Site loads correctly
   - No console errors
   - Links work
   - Assets load (images, CSS, etc.)

### 3. Verify DNS Propagation

```bash
# Check DNS resolution
nslookup boomtick.blog

# Verify HTTPS certificate
curl -I https://boomtick.blog
```

Should return status `200` or `301` (if redirecting to www version).

### 4. Check Search Console

1. Add `https://boomtick.blog` to Google Search Console
2. Request indexing of the homepage
3. Monitor crawl errors and coverage

---

## Part 8: Redirect Old Domain (Important!)

### If you had content on the old Vercel domain:

1. **In Vercel Dashboard:**
   - Go to **Settings** → **Domains**
   - Keep the old domain listed
   - Vercel will automatically 301 redirect from old domain to primary domain

2. **If you want to remove the old domain:**
   - Ensure all links point to `boomtick.blog`
   - Update any external references
   - Then you can delete the old domain from Vercel

---

## Part 9: Post-Update Checklist

- [ ] DNS records are added and propagating to BoomTick.blog
- [ ] `VITE_APP_URL` environment variable is set in Vercel
- [ ] `robots.txt` file updated with new domain and sitemap path
- [ ] Site builds successfully with `pnpm build`
- [ ] Sitemap.xml contains `boomtick.blog` URLs
- [ ] Site loads at `https://boomtick.blog`
- [ ] `https://boomtick.blog/robots.txt` returns updated content
- [ ] All assets (images, CSS, JS) load correctly
- [ ] Links work and don't point to old domain
- [ ] Google Search Console updated with new domain
- [ ] robots.txt verified in Google Search Console
- [ ] Analytics updated to track `boomtick.blog`
- [ ] Social media links/previews updated
- [ ] Documentation updated with new domain

---

## Troubleshooting

### "Domain is not configured" Error

**Solution:**
1. Double-check DNS records at your registrar
2. Wait for DNS propagation (up to 48 hours)
3. Use `nslookup boomtick.blog` to verify

### Sitemap still shows old domain

**Solution:**
1. Verify `VITE_APP_URL` is set in Vercel environment variables
2. Clear Vercel cache: **Settings** → **Data** → **Clear all**
3. Trigger a rebuild by pushing a commit

### Mixed content warnings (HTTP/HTTPS)

**Solution:**
1. Ensure all URLs in code use `https://`
2. Check environment variables are using `https://`
3. Check external resources (fonts, APIs) are HTTPS

### Old domain still accessible

**Solution:**
1. This is expected - Vercel keeps the old domain for continuity
2. Add a redirect in your app if needed:
   ```typescript
   // Redirect old domain to new domain
   if (typeof window !== 'undefined') {
     if (window.location.hostname === 'tech-dancer.vercel.app') {
       window.location.replace('https://boomtick.blog');
     }
   }
   ```

### robots.txt file not updating

**Solution:**
1. Verify you edited `/public/robots.txt` and not `/dist/robots.txt`
2. Clear Vercel cache: **Settings** → **Data** → **Clear all**
3. Trigger a rebuild by pushing a commit
4. Wait a few minutes for the new robots.txt to be served (CDN caching)
5. Verify with `curl -I https://boomtick.blog/robots.txt`

### Sitemap URL in robots.txt returns 404

**Solution:**
1. Verify sitemap is being generated at build time:
   ```bash
   pnpm build
   cat dist/sitemap.xml | head -5
   ```
2. Ensure `VITE_APP_URL` environment variable is set in Vercel
3. Check sitemap is deployed by visiting `https://boomtick.blog/sitemap.xml`
4. If still missing, clear Vercel cache and rebuild

---

## Quick Reference

| Item | Old | New |
|------|-----|-----|
| **Primary Domain** | `tech-dancer.vercel.app` | `boomtick.blog` |
| **Environment Variable** | Not set | `VITE_APP_URL=https://boomtick.blog` |
| **Sitemap URL** | Auto-resolved | Auto-resolved (uses env var) |
| **DNS** | Vercel default | Custom registrar records |

---

## Additional Resources

- [Vercel Domains Documentation](https://vercel.com/docs/concepts/projects/domains)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Google Domains Setup with Vercel](https://vercel.com/docs/guides/deploying-with-domains)

---

## Questions or Issues?

If you encounter issues:
1. Check the Vercel deployment logs: **Deployments** → **Select a deployment** → **Logs**
2. Verify environment variables are set: **Settings** → **Environment Variables**
3. Clear browser cache and try in incognito mode
4. Check browser console for any errors (F12 → Console tab)

