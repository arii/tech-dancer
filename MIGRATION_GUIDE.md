# Site Migration Guide: Tech-Dancer to BoomTick.blog

This document provides comprehensive instructions on how to migrate the existing "Tech-Dancer" site and "Roboticist's Guide" branding to the new `BoomTick.blog` domain and its associated lifestyle/dance-focused branding.

The migration is divided into two primary phases:
1. **Domain Name Update Instructions** (Vercel Configuration)
2. **Branding Migration Instructions** (Codebase Updates)

---

## Phase 1: Domain Name Update Instructions

Since the site is already hosted on Vercel and the `BoomTick.blog` domain has been purchased, follow these steps to configure the custom domain.

### 1. Configure the Domain in Vercel
1. Log in to your Vercel Dashboard.
2. Select your project (currently likely named `tech-dancer` or similar).
3. Navigate to **Settings** > **Domains**.
4. Enter `boomtick.blog` into the input field and click **Add**.
5. Vercel will prompt you to add both `boomtick.blog` and `www.boomtick.blog`. It is recommended to add both and set one (e.g., the root domain `boomtick.blog`) as the primary domain, with the other redirecting to it.

### 2. Update DNS Records
After adding the domain in Vercel, you will be provided with specific DNS records to add to your domain registrar (where you purchased BoomTick.blog).
1. Log in to your domain registrar's control panel.
2. Navigate to the DNS Management or Nameserver settings for `BoomTick.blog`.
3. Add the A records and/or CNAME records as instructed by the Vercel dashboard.
   - Typically, an **A Record** for `@` pointing to Vercel's IP (e.g., `76.76.21.21`).
   - A **CNAME** for `www` pointing to `cname.vercel-dns.com.`.
4. Wait for DNS propagation. Vercel will automatically provision an SSL certificate and show a "Valid Configuration" checkmark when complete.

### 3. Update Vercel Environment Variables
If there are any environment variables configuring the app URL, they need to be updated.
1. In the Vercel Dashboard for your project, go to **Settings** > **Environment Variables**.
2. If `VITE_APP_URL` is set, change its value from `https://tech-dancer.vercel.app` (or similar) to `https://boomtick.blog`.
3. If you have any other production-specific domain variables (e.g., analytics endpoints), update them accordingly.
4. **Redeploy** the project to ensure the new environment variables take effect.

### 4. Update the Codebase Configuration
In the local codebase, update routing and URL defaults to reflect the new primary domain.

**File: `vite.config.ts`**
- In the `resolveHostname` function, update the Vercel fallback URL:
  ```typescript
  // Find this section:
  const resolveHostname = () => {
    if (env.VITE_APP_URL) return env.VITE_APP_URL;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    // Change this line:
    if (isVercel) return 'https://boomtick.blog';
    return 'https://arii.github.io';
  };
  ```

---

## Phase 2: Branding Migration Instructions

The goal is to shift the site from a technical, personal portfolio ("The Roboticist's Guide to the West Coast Swing" by Ariel Anders) to a general reader blog focusing on West Coast Swing, travel, and lifestyle, authored by "Tech Dancer".

### 1. Update Core Configuration Files

**File: `src/config/constants.ts`**
- Change `SITE_NAME` and `DEFAULT_DESCRIPTION`.
- Update the `STATIC_SCHEMAS`.
```typescript
// Update these variables:
export const SITE_NAME = 'BoomTick.blog';
const DEFAULT_DESCRIPTION = "A lifestyle, travel, and data-driven guide to West Coast Swing. Exploring the community, gear, and experiences of modern social dancing.";

export const STATIC_SCHEMAS = {
  HOME: {
    // ...
    "name": SITE_NAME,
    "description": DEFAULT_DESCRIPTION,
    "publisher": {
      "@type": "Organization", // or Person if keeping it as an individual persona
      "name": "Tech Dancer"
    }
  },
  ABOUT: (bioName: string, bioRole: string) => ({
    // ...
    "mainEntity": {
      "@type": "Person",
      "name": "Tech Dancer", // Hardcode or pass down new author name
      "description": "West Coast Swing enthusiast, traveler, and data science consultant.",
      // Update URLs and SameAs links if you have new social media profiles
    }
  })
}
```

**File: `src/config/content.ts`**
- Update the `SITE_METADATA` to reflect the new author persona and description.
```typescript
export const SITE_METADATA = {
  title: 'BoomTick.blog',
  author: 'Tech Dancer', // Changed from Ariel Anders, PhD
  description: 'A lifestyle and travel guide to West Coast Swing',
  repo: {
    owner: 'arii', // Keep if GitHub repo remains the same
    name: 'tech-dancer'
  }
};
```

### 2. Update HTML and PWA Manifest

**File: `index.html`**
- Update the `<title>` tag.
- Update `<meta name="description">`.
- Update Open Graph and Twitter meta tags.
```html
<title>BoomTick.blog</title>
<meta name="description" content="A lifestyle, travel, and data-driven guide to West Coast Swing." />
<!-- Ensure og:title, og:site_name, etc. reflect BoomTick.blog -->
```

**File: `public/manifest.webmanifest`**
- Update PWA details.
```json
{
  "name": "BoomTick.blog",
  "short_name": "BoomTick",
  "description": "A lifestyle and travel guide to West Coast Swing"
}
```

### 3. Update Component Copy and Content Strategy

**File: `src/features/dashboard/Dashboard.tsx`**
- Update the hero section text. Remove references to "Roboticist's Guide".
- Example change:
  ```tsx
  description="BoomTick.blog: Exploring West Coast Swing through travel, lifestyle, and a touch of data science."
  // ...
  // Inside the render:
  The Lifestyle Guide <br className="hidden md:block" />
  to West Coast Swing.
  ```

**File: `src/features/profile/useProfile.ts` (and related Profile/About components)**
- Change the role and bio.
```typescript
    role: "West Coast Swing Blogger // Data Science Consultant",
    // Update bio text to emphasize the blog's new focus on travel and lifestyle for the general dancer, while mentioning the "Tech Dancer" consulting background.
```

### 4. Content and Category Reorganization
To support the new focus, ensure content tagging and categories prioritize "Lifestyle" and "Travel" while still maintaining the "Tech" (data science/robotics) and "Gear" categories as secondary elements.
- When drafting new posts via `src/features/lab/BlogDrafter.tsx` or manual Markdown files, focus on the general dancer audience.
- Review existing Markdown files in `content/` to see if frontmatter `author` fields need to be globally updated from "Ariel Anders" to "Tech Dancer". (This can be done with a simple search and replace script).

### 5. Repository and Analytics Updates (Optional)
- Update `public/robots.txt` and `public/404.html` if they contain hardcoded references to the old `/tech-dancer/` sub-path (especially if moving off GitHub Pages to a root Vercel deployment where the sub-path is no longer needed).
- Update the project name in `package.json` to `"boomtick-blog"`.
- If the GitHub repository name is updated, be sure to update the `SITE_METADATA.repo` in `src/config/content.ts` and any GitHub links in the footer or About page.

---
**Summary:** By completing these steps, the application will successfully serve from `BoomTick.blog` via Vercel, and the site's copy and metadata will reflect the new, broader West Coast Swing lifestyle brand authored by the "Tech Dancer" persona.
