# Tech Dancer Platform — Content Contributor Guide

This guide explains how to add new content to the site using GitHub Issues and the automated PR workflow. No local dev environment required.

## How It Works

Content is submitted as a GitHub Issue containing a fenced markdown block. A GitHub Actions workflow reads the issue, extracts the markdown, commits it to a new branch, and opens a Pull Request for review — automatically.

**You write the issue** → **Bot extracts markdown** → **PR opens** → **You merge**

The workflow file lives at `.github/workflows/issue_to_pr.yml`.

## File Structure

All content lives under `content/` in the repo root.

- `content/posts/` ← Blog posts
- `content/resources/` ← Dance Resources (gear, travel, recovery guides)
- `content/studies/` ← Data Analysis Studies (the research journal)

## Routing and SEO Standards

The project uses `BrowserRouter` for clean URLs. To support this on GitHub Pages, the following must be maintained:

1. **BrowserRouter Requirement**: Use `BrowserRouter` in `src/main.tsx`. Do NOT revert to `HashRouter`.
2. **404 Redirect Hack**: `public/404.html` and `public/.nojekyll` must exist in the `public/` directory. The `404.html` file handles redirects to the main entry point while preserving the requested path.
3. **Sitemap and Robots.txt**: A sitemap is automatically generated during the build process to help search engines discover pages directly. `public/robots.txt` must point to the `sitemap.xml`.

CI will fail if `404.html` or `.nojekyll` are missing.

## Submitting Content via GitHub Issue

### Step 1 — Open a new Issue
Go to your repo → **Issues** → **New Issue**.

### Step 2 — Title the Issue
Use this format: `Draft: <Your Post Title Here>`

The `Draft:` prefix is stripped when the filename is generated.

### Step 3 — Paste the markdown template in the body
Your issue body must contain a fenced markdown block like this:

\```markdown
<paste your content here>
\```

The bot ignores everything outside that block.

### Step 4 — Submit the Issue
The workflow fires automatically. Within ~60 seconds, a PR will appear linking back to your issue. Review the PR, then merge.

## Content Templates

### Template 1 — Blog Post (`content/posts/`)
Use for: technique hacks, travel tips, and gear reviews.

\```markdown
---
type: post
title: "Your Post Title Here"
date: "2026-04-16"
author: "Ariel Anders, PhD"
category: "Engineering | Travel | Dance | Lifestyle"
excerpt: "One or two sentences that appear in the blog index card."
image: "https://picsum.photos/seed/your-seed-here/1200/600"
tags:
  - tag-one
  - tag-two
---

## The Hook
Start directly with the tip, data point, or gear fix.

## The Science / Story
Explain the idea.

## The "Bougie on a Budget" Takeaway
End with a practical action.
\```

### Template 2 — Dance Resource / Gear Guide (`content/resources/`)
Use for gear reviews, travel hacks, DIY tutorials.

\```markdown
---
type: resource
title: "Resource Title"
date: "2026-04-16"
author: "Ariel Anders, PhD"
category: "Gear | Travel | Recovery | Focus"
excerpt: "What the reader will learn or get from this guide."
affiliateIds:
  - suede-sheets
tags:
  - diy
  - footwear
---

## What You Need
List all materials.

## Step-by-Step
Detailed instructions.

## Verdict
One paragraph summary.
\```

### Template 3 — Data Analysis Study (`content/studies/`)
Use for the research journal entries in the Dance Analytics section.

\```markdown
---
type: study
title: "Study Title"
date: "2026-04-16"
author: "Ariel Anders, PhD"
category: "Data | Competition | Robotics | Insights"
excerpt: "One sentence abstract."
tags:
  - data
  - scoring
---

## Abstract
One paragraph summary.

## Methodology
Be explicit.

## Results
State findings plainly.

## Discussion
What do the results mean?
\```

## Checklist Before Submitting
- [ ] Issue title starts with `Draft:`
- [ ] Body contains a single `\```markdown` fenced block
- [ ] Frontmatter includes `type`, `title`, `date`, `author`, `category`, and `excerpt`
- [ ] Affiliate disclosure line is included if product links appear
