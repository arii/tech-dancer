# PR Context: #749 — feat: scripts to support mass pr audits
**Author:** @arii

## Description
_No description provided._

## Files Changed
- 🟢 `dev-tools/analyze_overlaps.sh`
- 🟢 `dev-tools/new_scripts.md`
- 🟢 `dev-tools/pr_overlaps.txt`
- 🟢 `dev-tools/workflow_overlaps.txt`

## Diffs

### `dev-tools/analyze_overlaps.sh` (added)
```diff
@@ -0,0 +1,20 @@
   1 |+#!/usr/bin/env bash
   2 |+OVERLAP_FILE="pr_overlaps.txt"
   3 |+
   4 |+if [[ ! -f "$OVERLAP_FILE" ]]; then
   5 |+    gh pr list --json number --jq '.[].number' | xargs -I{} sh -c "gh pr diff {} --name-only | sed 's|^|{} |'" | \
   6 |+    awk '{file=$2; pr=$1; count[file]++; prs[file] = prs[file] " PR #" pr} END {for (f in count) if (count[f] > 1) print f " overlaps in:" prs[f]}' > "$OVERLAP_FILE"
   7 |+fi
   8 |+
   9 |+awk -F' overlaps in: ' '{
  10 |+    f=$1; p=$2;
  11 |+    split(f, path, "/");
  12 |+    dir = (path[2] == "") ? "root" : path[1] "/";
  13 |+    results[dir] = results[dir] "File: " f "\n  PRs: " p "\n"
  14 |+}
  15 |+END {
  16 |+    for (d in results) {
  17 |+        print "=== Directory: " d " ===";
  18 |+        print results[d];
  19 |+    }
  20 |+}' "$OVERLAP_FILE"
```

### `dev-tools/new_scripts.md` (added)
```diff
@@ -0,0 +1,21 @@
   1 |+analyze_overlaps.sh: analyze pr overlaps
   2 |+analyze_workflows.sh: analyze workflow overlaps
   3 |+this can then be used in agent workflow to address incoming requests for resolving conflicts from many prs that touch similiar files.
   4 |+
   5 |+for example
   6 |+```
   7 |+/review-pr see prs to workflow changes:
   8 |+
   9 |+
  10 |+File: .github/workflows/deploy.yml
  11 |+PRs: PR #739 files: PR #677 files:
  12 |+---
  13 |+File: .github/workflows/ci.yml
  14 |+PRs: PR #746 files: PR #745 files: PR #739 files: PR #680 files:
  15 |+---
  16 |+File: .github/workflows/validate_issue.yml
  17 |+PRs: PR #739 files: PR #725 files:
  18 |+---
  19 |+
  20 |+then create a single branch that will merge all of these files and create a pr for it. close the old prs your reviwed.
  21 |+```
  22 |\ No newline at end of file
```

### `dev-tools/pr_overlaps.txt` (added)
```diff
@@ -0,0 +1,111 @@
   1 |+src/components/navigation/NavigationShell.tsx overlaps in: PR #711 PR #677
   2 |+src/features/dashboard/Dashboard.tsx overlaps in: PR #711 PR #680 PR #677 PR #652 PR #647 PR #645
   3 |+tests/visual.spec.ts-snapshots/gear-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647
   4 |+src/assets/roboticist.jpg overlaps in: PR #722 PR #647
   5 |+dev-tools/utils.py overlaps in: PR #748 PR #725
   6 |+.github/workflows/deploy.yml overlaps in: PR #739 PR #677
   7 |+src/features/lab/Toolbox.tsx overlaps in: PR #677 PR #652
   8 |+artifacts/boomtick/blog.html overlaps in: PR #711 PR #677
   9 |+src/components/ui/GearCard.tsx overlaps in: PR #680 PR #652 PR #647
  10 |+tests/dev-tools/test_td_cli.py overlaps in: PR #748 PR #746 PR #745 PR #739 PR #725
  11 |+artifacts/boomtick/public/robots.txt overlaps in: PR #711 PR #677
  12 |+src/components/ui/EventCard.tsx overlaps in: PR #711 PR #680 PR #647
  13 |+src/components/Navigation.tsx overlaps in: PR #722 PR #711 PR #680 PR #677 PR #652 PR #647
  14 |+artifacts/boomtick/src/pages/Blog.tsx overlaps in: PR #711 PR #677
  15 |+artifacts/boomtick/src/pages/Research.tsx overlaps in: PR #711 PR #677
  16 |+artifacts/boomtick/src/lib/content/gear.ts overlaps in: PR #711 PR #677
  17 |+artifacts/boomtick/src/pages/not-found.tsx overlaps in: PR #711 PR #677
  18 |+lighthouserc.json overlaps in: PR #746 PR #745
  19 |+.github/workflows/ci.yml overlaps in: PR #746 PR #745 PR #739 PR #680
  20 |+src/features/journal/BlogFeed.tsx overlaps in: PR #677 PR #652
  21 |+src/components/ui/HeroPathCard.tsx overlaps in: PR #711 PR #680 PR #647 PR #645
  22 |+package.json overlaps in: PR #652 PR #645
  23 |+src/features/lab/useToolbox.ts overlaps in: PR #677 PR #652
  24 |+artifacts/boomtick/src/content/contactContent.ts overlaps in: PR #711 PR #677
  25 |+artifacts/boomtick/research.html overlaps in: PR #711 PR #677
  26 |+src/features/contact/components/FormField.tsx overlaps in: PR #680 PR #647
  27 |+src/components/ui/SectionHeader.tsx overlaps in: PR #680 PR #647
  28 |+src/components/navigation/MobileHeader.tsx overlaps in: PR #711 PR #652 PR #645
  29 |+artifacts/boomtick/src/pages/Contact.tsx overlaps in: PR #711 PR #677
  30 |+artifacts/boomtick/src/lib/seo.ts overlaps in: PR #711 PR #677
  31 |+dev-tools/repo_utils.py overlaps in: PR #748 PR #745
  32 |+artifacts/boomtick/src/hooks/use-toast.ts overlaps in: PR #711 PR #677
  33 |+artifacts/boomtick/src/content/blogContent.ts overlaps in: PR #711 PR #677
  34 |+tests/visual.spec.ts-snapshots/about-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647
  35 |+dev-tools/td_cli.py overlaps in: PR #748 PR #746 PR #725
  36 |+artifacts/boomtick/src/content/researchContent.ts overlaps in: PR #711 PR #677
  37 |+artifacts/boomtick/package.json overlaps in: PR #711 PR #677
  38 |+src/components/ui/ContentCard.tsx overlaps in: PR #680 PR #652 PR #647 PR #645
  39 |+src/components/navigation/NavItem.tsx overlaps in: PR #722 PR #711 PR #680 PR #647
  40 |+src/features/journal/useBlog.ts overlaps in: PR #677 PR #652
  41 |+artifacts/boomtick/src/hooks/use-page-data.ts overlaps in: PR #711 PR #677
  42 |+src/styles/design-tokens.ts overlaps in: PR #711 PR #680 PR #647 PR #645
  43 |+src/features/contact/components/ContactFormView.tsx overlaps in: PR #680 PR #652 PR #647
  44 |+src/config/constants.ts overlaps in: PR #652 PR #647
  45 |+artifacts/boomtick/src/pages/Gear.tsx overlaps in: PR #711 PR #677
  46 |+src/assets/mad_jam_ari.jpg overlaps in: PR #722 PR #647
  47 |+src/main.tsx overlaps in: PR #676 PR #652
  48 |+src/components/MobileBottomNav.tsx overlaps in: PR #711 PR #652
  49 |+src/assets/glow_bunny.jpg overlaps in: PR #722 PR #647
  50 |+tests/search_mobile.spec.ts overlaps in: PR #711 PR #677 PR #647 PR #645
  51 |+artifacts/boomtick/src/components/Logo.tsx overlaps in: PR #711 PR #677
  52 |+artifacts/boomtick/index.html overlaps in: PR #711 PR #677
  53 |+artifacts/boomtick/components.json overlaps in: PR #711 PR #677
  54 |+artifacts/boomtick/src/lib/content/about.ts overlaps in: PR #711 PR #677
  55 |+src/components/ui/FilterBar.tsx overlaps in: PR #680 PR #652 PR #647
  56 |+tests/search.spec.ts overlaps in: PR #711 PR #680 PR #677 PR #647
  57 |+artifacts/boomtick/src/lib/content/blog.ts overlaps in: PR #711 PR #677
  58 |+tests/visual.spec.ts-snapshots/contact-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647
  59 |+src/components/navigation/MobileMenuOverlay.tsx overlaps in: PR #711 PR #652
  60 |+artifacts/boomtick/src/lib/content/research.ts overlaps in: PR #711 PR #677
  61 |+src/components/ui/FolioGrid.tsx overlaps in: PR #680 PR #652 PR #647
  62 |+artifacts/boomtick/about.html overlaps in: PR #711 PR #677
  63 |+artifacts/boomtick/public/favicon.svg overlaps in: PR #711 PR #677
  64 |+src/features/profile/ArielProfile.tsx overlaps in: PR #722 PR #680 PR #677 PR #652 PR #647
  65 |+content/posts/2026-04-18-github-actions.md overlaps in: PR #722 PR #652
  66 |+src/layouts/MainLayout.tsx overlaps in: PR #722 PR #711 PR #677 PR #652 PR #645
  67 |+artifacts/boomtick/src/main.tsx overlaps in: PR #711 PR #677
  68 |+artifacts/boomtick/src/lib/site-jsonld.ts overlaps in: PR #711 PR #677
  69 |+src/assets/www_ari.jpg overlaps in: PR #722 PR #647
  70 |+src/index.css overlaps in: PR #711 PR #680 PR #677 PR #652 PR #647 PR #645
  71 |+artifacts/boomtick/tsconfig.json overlaps in: PR #711 PR #677
  72 |+artifacts/boomtick/export.html overlaps in: PR #711 PR #677
  73 |+src/assets/first_comp.jpg overlaps in: PR #722 PR #647
  74 |+src/layouts/Footer.tsx overlaps in: PR #722 PR #680 PR #652
  75 |+src/components/ui/PathSelector.tsx overlaps in: PR #711 PR #647 PR #645
  76 |+src/assets/monterey.jpg overlaps in: PR #722 PR #647
  77 |+tests/visual.spec.ts-snapshots/research-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647
  78 |+artifacts/boomtick/src/lib/content/home.ts overlaps in: PR #711 PR #677
  79 |+artifacts/boomtick/src/pages/About.tsx overlaps in: PR #711 PR #677
  80 |+artifacts/boomtick/public/humans.txt overlaps in: PR #711 PR #677
  81 |+scripts/detect-antipatterns.mjs overlaps in: PR #680 PR #647
  82 |+artifacts/boomtick/src/index.css overlaps in: PR #711 PR #677
  83 |+artifacts/boomtick/src/content/siteContent.ts overlaps in: PR #711 PR #677
  84 |+artifacts/boomtick/public/sitemap.xml overlaps in: PR #711 PR #677
  85 |+artifacts/boomtick/src/pages/Home.tsx overlaps in: PR #711 PR #677
  86 |+src/components/ui/PageHeader.tsx overlaps in: PR #711 PR #680 PR #652 PR #647
  87 |+src/features/profile/components/ProfileComponents.tsx overlaps in: PR #722 PR #680 PR #647
  88 |+src/features/dashboard/useHome.ts overlaps in: PR #677 PR #647
  89 |+src/App.tsx overlaps in: PR #722 PR #652
  90 |+tests/visual.spec.ts-snapshots/blog-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647
  91 |+artifacts/boomtick/src/content/gearContent.ts overlaps in: PR #711 PR #677
  92 |+artifacts/boomtick/src/App.tsx overlaps in: PR #711 PR #677
  93 |+content/posts/2026-04-18-financial-literacy-dancers.md overlaps in: PR #722 PR #647
  94 |+artifacts/boomtick/public/opengraph.jpg overlaps in: PR #711 PR #677
  95 |+src/features/profile/useProfile.ts overlaps in: PR #722 PR #680 PR #677 PR #652 PR #647
  96 |+src/features/research/ResearchAnalytics.tsx overlaps in: PR #677 PR #652 PR #647
  97 |+src/components/ui/CardImagePlaceholder.tsx overlaps in: PR #680 PR #652 PR #647
  98 |+artifacts/boomtick/src/hooks/use-mobile.tsx overlaps in: PR #711 PR #677
  99 |+tests/visual.spec.ts-snapshots/home-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647 PR #645
 100 |+src/components/GlobalSearch.tsx overlaps in: PR #680 PR #652 PR #647 PR #645
 101 |+index.html overlaps in: PR #722 PR #647
 102 |+src/styles/tokens.css overlaps in: PR #711 PR #680 PR #677 PR #652 PR #647 PR #645
 103 |+artifacts/boomtick/src/lib/utils.ts overlaps in: PR #711 PR #677
 104 |+src/components/ui/Logo.tsx overlaps in: PR #711 PR #680 PR #677 PR #647
 105 |+artifacts/boomtick/src/lib/types/navigation.ts overlaps in: PR #711 PR #677
 106 |+.github/workflows/validate_issue.yml overlaps in: PR #739 PR #725
 107 |+knip.ts overlaps in: PR #747 PR #711 PR #680 PR #647 PR #645
 108 |+src/features/email-capture/NewsletterBanner.tsx overlaps in: PR #722 PR #680 PR #652 PR #647
 109 |+artifacts/boomtick/src/content/navigationContent.ts overlaps in: PR #711 PR #677
 110 |+artifacts/boomtick/vite.config.ts overlaps in: PR #711 PR #677
 111 |+artifacts/boomtick/gear.html overlaps in: PR #711 PR #677
```

### `dev-tools/workflow_overlaps.txt` (added)
```diff
@@ -0,0 +1,9 @@
   1 |+File: .github/workflows/deploy.yml
   2 |+Related PRs: PR #739 PR #677
   3 |+---
   4 |+File: .github/workflows/ci.yml
   5 |+Related PRs: PR #746 PR #745 PR #739 PR #680
   6 |+---
   7 |+File: .github/workflows/validate_issue.yml
   8 |+Related PRs: PR #739 PR #725
   9 |+---
```