# PR Context: #759 — chore: cleanup pr overlap scripts and artifacts
**Author:** @arii

## Description
This PR resolves cleanup items for the overlap analysis tools:
- The missing script `analyze_workflows.sh` is created and parses workflow overlaps as intended.
- Dynamically generated files (`pr_overlaps.txt`, `workflow_overlaps.txt`) that were accidentally committed have been removed and added to `.gitignore`.
- Obsolete instructions doc (`new_scripts.md`) is removed.
- Python unit test failures related to module refactoring were resolved.

---
*PR created automatically by Jules for task [17396805441615969384](https://jules.google.com/task/17396805441615969384) started by @arii*

## Files Changed
- 🟡 `.gitignore`
- 🟢 `dev-tools/analyze_workflows.sh`
- 🔴 `dev-tools/new_scripts.md`
- 🔴 `dev-tools/pr_overlaps.txt`
- 🔴 `dev-tools/workflow_overlaps.txt`
- 🟡 `tests/dev-tools/test_td_cli.py`

## Diffs

### `.gitignore` (modified)
```diff
@@ -70,3 +70,7 @@ public/data
  70 | link-validation-report.md
  71 | public/data
  72 | link-validation-report.md
  73 |+
  74 |+# Dynamically generated analysis artifacts
  75 |+pr_overlaps.txt
  76 |+workflow_overlaps.txt
```

### `dev-tools/analyze_workflows.sh` (added)
```diff
@@ -0,0 +1,13 @@
   1 |+#!/usr/bin/env bash
   2 |+OVERLAP_FILE="pr_overlaps.txt"
   3 |+
   4 |+if [[ ! -f "$OVERLAP_FILE" ]]; then
   5 |+    echo "Error: $OVERLAP_FILE not found. Run analyze_overlaps.sh first."
   6 |+else
   7 |+    awk -F' overlaps in: ' '/^\.github\/workflows\// {
   8 |+        f=$1; p=$2;
   9 |+        print "File: " f "\nRelated PRs: " p "\n---"
  10 |+    }' "$OVERLAP_FILE" > workflow_overlaps.txt
  11 |+
  12 |+    cat workflow_overlaps.txt
  13 |+fi
```

### `dev-tools/new_scripts.md` (removed)
```diff
@@ -1,21 +0,0 @@
     |-analyze_overlaps.sh: analyze pr overlaps
     |-analyze_workflows.sh: analyze workflow overlaps
     |-this can then be used in agent workflow to address incoming requests for resolving conflicts from many prs that touch similiar files.
     |-
     |-for example
     |-```
     |-/review-pr see prs to workflow changes:
     |-
     |-
     |-File: .github/workflows/deploy.yml
     |-PRs: PR #739 files: PR #677 files:
     |----
     |-File: .github/workflows/ci.yml
     |-PRs: PR #746 files: PR #745 files: PR #739 files: PR #680 files:
     |----
     |-File: .github/workflows/validate_issue.yml
     |-PRs: PR #739 files: PR #725 files:
     |----
     |-
     |-then create a single branch that will merge all of these files and create a pr for it. close the old prs your reviwed.
     |-```
   0 |\ No newline at end of file
```

### `dev-tools/pr_overlaps.txt` (removed)
```diff
@@ -1,111 +0,0 @@
     |-src/components/navigation/NavigationShell.tsx overlaps in: PR #711 PR #677
     |-src/features/dashboard/Dashboard.tsx overlaps in: PR #711 PR #680 PR #677 PR #652 PR #647 PR #645
     |-tests/visual.spec.ts-snapshots/gear-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647
     |-src/assets/roboticist.jpg overlaps in: PR #722 PR #647
     |-dev-tools/utils.py overlaps in: PR #748 PR #725
     |-.github/workflows/deploy.yml overlaps in: PR #739 PR #677
     |-src/features/lab/Toolbox.tsx overlaps in: PR #677 PR #652
     |-artifacts/boomtick/blog.html overlaps in: PR #711 PR #677
     |-src/components/ui/GearCard.tsx overlaps in: PR #680 PR #652 PR #647
     |-tests/dev-tools/test_td_cli.py overlaps in: PR #748 PR #746 PR #745 PR #739 PR #725
     |-artifacts/boomtick/public/robots.txt overlaps in: PR #711 PR #677
     |-src/components/ui/EventCard.tsx overlaps in: PR #711 PR #680 PR #647
     |-src/components/Navigation.tsx overlaps in: PR #722 PR #711 PR #680 PR #677 PR #652 PR #647
     |-artifacts/boomtick/src/pages/Blog.tsx overlaps in: PR #711 PR #677
     |-artifacts/boomtick/src/pages/Research.tsx overlaps in: PR #711 PR #677
     |-artifacts/boomtick/src/lib/content/gear.ts overlaps in: PR #711 PR #677
     |-artifacts/boomtick/src/pages/not-found.tsx overlaps in: PR #711 PR #677
     |-lighthouserc.json overlaps in: PR #746 PR #745
     |-.github/workflows/ci.yml overlaps in: PR #746 PR #745 PR #739 PR #680
     |-src/features/journal/BlogFeed.tsx overlaps in: PR #677 PR #652
     |-src/components/ui/HeroPathCard.tsx overlaps in: PR #711 PR #680 PR #647 PR #645
     |-package.json overlaps in: PR #652 PR #645
     |-src/features/lab/useToolbox.ts overlaps in: PR #677 PR #652
     |-artifacts/boomtick/src/content/contactContent.ts overlaps in: PR #711 PR #677
     |-artifacts/boomtick/research.html overlaps in: PR #711 PR #677
     |-src/features/contact/components/FormField.tsx overlaps in: PR #680 PR #647
     |-src/components/ui/SectionHeader.tsx overlaps in: PR #680 PR #647
     |-src/components/navigation/MobileHeader.tsx overlaps in: PR #711 PR #652 PR #645
     |-artifacts/boomtick/src/pages/Contact.tsx overlaps in: PR #711 PR #677
     |-artifacts/boomtick/src/lib/seo.ts overlaps in: PR #711 PR #677
     |-dev-tools/repo_utils.py overlaps in: PR #748 PR #745
     |-artifacts/boomtick/src/hooks/use-toast.ts overlaps in: PR #711 PR #677
     |-artifacts/boomtick/src/content/blogContent.ts overlaps in: PR #711 PR #677
     |-tests/visual.spec.ts-snapshots/about-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647
     |-dev-tools/td_cli.py overlaps in: PR #748 PR #746 PR #725
     |-artifacts/boomtick/src/content/researchContent.ts overlaps in: PR #711 PR #677
     |-artifacts/boomtick/package.json overlaps in: PR #711 PR #677
     |-src/components/ui/ContentCard.tsx overlaps in: PR #680 PR #652 PR #647 PR #645
     |-src/components/navigation/NavItem.tsx overlaps in: PR #722 PR #711 PR #680 PR #647
     |-src/features/journal/useBlog.ts overlaps in: PR #677 PR #652
     |-artifacts/boomtick/src/hooks/use-page-data.ts overlaps in: PR #711 PR #677
     |-src/styles/design-tokens.ts overlaps in: PR #711 PR #680 PR #647 PR #645
     |-src/features/contact/components/ContactFormView.tsx overlaps in: PR #680 PR #652 PR #647
     |-src/config/constants.ts overlaps in: PR #652 PR #647
     |-artifacts/boomtick/src/pages/Gear.tsx overlaps in: PR #711 PR #677
     |-src/assets/mad_jam_ari.jpg overlaps in: PR #722 PR #647
     |-src/main.tsx overlaps in: PR #676 PR #652
     |-src/components/MobileBottomNav.tsx overlaps in: PR #711 PR #652
     |-src/assets/glow_bunny.jpg overlaps in: PR #722 PR #647
     |-tests/search_mobile.spec.ts overlaps in: PR #711 PR #677 PR #647 PR #645
     |-artifacts/boomtick/src/components/Logo.tsx overlaps in: PR #711 PR #677
     |-artifacts/boomtick/index.html overlaps in: PR #711 PR #677
     |-artifacts/boomtick/components.json overlaps in: PR #711 PR #677
     |-artifacts/boomtick/src/lib/content/about.ts overlaps in: PR #711 PR #677
     |-src/components/ui/FilterBar.tsx overlaps in: PR #680 PR #652 PR #647
     |-tests/search.spec.ts overlaps in: PR #711 PR #680 PR #677 PR #647
     |-artifacts/boomtick/src/lib/content/blog.ts overlaps in: PR #711 PR #677
     |-tests/visual.spec.ts-snapshots/contact-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647
     |-src/components/navigation/MobileMenuOverlay.tsx overlaps in: PR #711 PR #652
     |-artifacts/boomtick/src/lib/content/research.ts overlaps in: PR #711 PR #677
     |-src/components/ui/FolioGrid.tsx overlaps in: PR #680 PR #652 PR #647
     |-artifacts/boomtick/about.html overlaps in: PR #711 PR #677
     |-artifacts/boomtick/public/favicon.svg overlaps in: PR #711 PR #677
     |-src/features/profile/ArielProfile.tsx overlaps in: PR #722 PR #680 PR #677 PR #652 PR #647
     |-content/posts/2026-04-18-github-actions.md overlaps in: PR #722 PR #652
     |-src/layouts/MainLayout.tsx overlaps in: PR #722 PR #711 PR #677 PR #652 PR #645
     |-artifacts/boomtick/src/main.tsx overlaps in: PR #711 PR #677
     |-artifacts/boomtick/src/lib/site-jsonld.ts overlaps in: PR #711 PR #677
     |-src/assets/www_ari.jpg overlaps in: PR #722 PR #647
     |-src/index.css overlaps in: PR #711 PR #680 PR #677 PR #652 PR #647 PR #645
     |-artifacts/boomtick/tsconfig.json overlaps in: PR #711 PR #677
     |-artifacts/boomtick/export.html overlaps in: PR #711 PR #677
     |-src/assets/first_comp.jpg overlaps in: PR #722 PR #647
     |-src/layouts/Footer.tsx overlaps in: PR #722 PR #680 PR #652
     |-src/components/ui/PathSelector.tsx overlaps in: PR #711 PR #647 PR #645
     |-src/assets/monterey.jpg overlaps in: PR #722 PR #647
     |-tests/visual.spec.ts-snapshots/research-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647
     |-artifacts/boomtick/src/lib/content/home.ts overlaps in: PR #711 PR #677
     |-artifacts/boomtick/src/pages/About.tsx overlaps in: PR #711 PR #677
     |-artifacts/boomtick/public/humans.txt overlaps in: PR #711 PR #677
     |-scripts/detect-antipatterns.mjs overlaps in: PR #680 PR #647
     |-artifacts/boomtick/src/index.css overlaps in: PR #711 PR #677
     |-artifacts/boomtick/src/content/siteContent.ts overlaps in: PR #711 PR #677
     |-artifacts/boomtick/public/sitemap.xml overlaps in: PR #711 PR #677
     |-artifacts/boomtick/src/pages/Home.tsx overlaps in: PR #711 PR #677
     |-src/components/ui/PageHeader.tsx overlaps in: PR #711 PR #680 PR #652 PR #647
     |-src/features/profile/components/ProfileComponents.tsx overlaps in: PR #722 PR #680 PR #647
     |-src/features/dashboard/useHome.ts overlaps in: PR #677 PR #647
     |-src/App.tsx overlaps in: PR #722 PR #652
     |-tests/visual.spec.ts-snapshots/blog-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647
     |-artifacts/boomtick/src/content/gearContent.ts overlaps in: PR #711 PR #677
     |-artifacts/boomtick/src/App.tsx overlaps in: PR #711 PR #677
     |-content/posts/2026-04-18-financial-literacy-dancers.md overlaps in: PR #722 PR #647
     |-artifacts/boomtick/public/opengraph.jpg overlaps in: PR #711 PR #677
     |-src/features/profile/useProfile.ts overlaps in: PR #722 PR #680 PR #677 PR #652 PR #647
     |-src/features/research/ResearchAnalytics.tsx overlaps in: PR #677 PR #652 PR #647
     |-src/components/ui/CardImagePlaceholder.tsx overlaps in: PR #680 PR #652 PR #647
     |-artifacts/boomtick/src/hooks/use-mobile.tsx overlaps in: PR #711 PR #677
     |-tests/visual.spec.ts-snapshots/home-chromium-linux.png overlaps in: PR #747 PR #711 PR #680 PR #677 PR #647 PR #645
     |-src/components/GlobalSearch.tsx overlaps in: PR #680 PR #652 PR #647 PR #645
     |-index.html overlaps in: PR #722 PR #647
     |-src/styles/tokens.css overlaps in: PR #711 PR #680 PR #677 PR #652 PR #647 PR #645
     |-artifacts/boomtick/src/lib/utils.ts overlaps in: PR #711 PR #677
     |-src/components/ui/Logo.tsx overlaps in: PR #711 PR #680 PR #677 PR #647
     |-artifacts/boomtick/src/lib/types/navigation.ts overlaps in: PR #711 PR #677
     |-.github/workflows/validate_issue.yml overlaps in: PR #739 PR #725
     |-knip.ts overlaps in: PR #747 PR #711 PR #680 PR #647 PR #645
     |-src/features/email-capture/NewsletterBanner.tsx overlaps in: PR #722 PR #680 PR #652 PR #647
     |-artifacts/boomtick/src/content/navigationContent.ts overlaps in: PR #711 PR #677
     |-artifacts/boomtick/vite.config.ts overlaps in: PR #711 PR #677
     |-artifacts/boomtick/gear.html overlaps in: PR #711 PR #677
```

### `dev-tools/workflow_overlaps.txt` (removed)
```diff
@@ -1,9 +0,0 @@
     |-File: .github/workflows/deploy.yml
     |-Related PRs: PR #739 PR #677
     |----
     |-File: .github/workflows/ci.yml
     |-Related PRs: PR #746 PR #745 PR #739 PR #680
     |----
     |-File: .github/workflows/validate_issue.yml
     |-Related PRs: PR #739 PR #725
     |----
```

### `tests/dev-tools/test_td_cli.py` (modified)
```diff
@@ -12,8 +12,8 @@
  12 |
  13 | class TestTDCLI(unittest.TestCase):
  14 |
     |-    @patch('td_cli.get_github_token')
     |-    @patch('td_cli.get_repo_name')
  15 |+    @patch('utils.get_github_token')
  16 |+    @patch('utils.get_repo_name')
  17 |     @patch('github.Github')
  18 |     def test_validate_issue_dry_run_default(self, mock_github_class, mock_repo, mock_token):
  19 |         """Test that validate-issue defaults to dry-run True"""
```