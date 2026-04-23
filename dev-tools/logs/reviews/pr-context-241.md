# PR Context: #241 — Add branch links and 24h grace period to previews
**Stats:** +115/-71 across 4 files
**Author:** @arii
**Last Commit:** 2026-04-23T07:34:40Z

## Description
This PR enhances the preview environment infrastructure by improving visibility and persistence.

Key changes:
- **Preview Dashboard Enhancements:** The `/previews/index.html` now fetches branch information from the GitHub API. It displays 'View Source' links for active branches and categorizes deployments with distinct badges.
- **24-Hour Grace Period:** Immediate cleanup of previews on branch deletion has been disabled. The nightly pruning workflow now checks the last modification timestamp of each deployment directory in the `gh-pages` branch. Deployments for deleted branches are only removed if they haven't been updated in over 24 hours.
- **Improved UX:** Deployments are sorted with open PRs and active branches first, followed by stale deployments in the grace period. Layout refinements ensure better mobile responsiveness and text truncation for long branch names.

Fixes #240

---
*PR created automatically by Jules for task [17607322833253096443](https://jules.google.com/task/17607322833253096443) started by @arii*

## Files Changed
- 🔴 `.github/workflows/cleanup-preview.yml` (+0/-44)
- 🟡 `.github/workflows/deploy.yml` (+32/-2)
- 🟡 `.github/workflows/prune-stale-previews.yml` (+27/-11)
- 🟡 `public/previews/index.html` (+56/-14)

## Diffs

### `.github/workflows/cleanup-preview.yml` (removed)
**Valid Comment Ranges (New File):** 0--1
```diff
@@ -1,44 +0,0 @@
     |-name: Cleanup Deleted Branch Previews
     |-
     |-on:
     |-  delete:
     |-
     |-concurrency:
     |-  group: "gh-pages-publish"
     |-  cancel-in-progress: false
     |-
     |-env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
     |-
     |-jobs:
     |-  cleanup:
     |-    if: github.event.ref_type == 'branch' && github.event.ref != 'main'
     |-    runs-on: ubuntu-latest
     |-    permissions:
     |-      contents: write
     |-    steps:
     |-      - name: Checkout gh-pages branch
     |-        uses: actions/checkout@v4
     |-        with:
     |-          ref: gh-pages
     |-
     |-      - name: Remove branch folder and update index
     |-        run: |
     |-          git config user.name "github-actions[bot]"
     |-          git config user.email "github-actions[bot]@users.noreply.github.com"
     |-
     |-          if [ -d "${{ github.event.ref }}" ]; then
     |-            git rm -r "${{ github.event.ref }}"
     |-            git commit -m "chore: cleanup preview site for deleted branch ${{ github.event.ref }}"
     |-          else
     |-            echo "Directory ${{ github.event.ref }} not found. Skipping deletion."
     |-          fi
     |-
     |-          # Since cleanup doesn't have a 'build' step, we have to rely on the fact
     |-          # that the fancy previews/index.html was already committed to the branch
     |-          # or is being maintained by the deployment action.
     |-          # If it gets deleted somehow, the deployment action will restore it.
     |-          # Here we just make sure we push the cleanup change.
     |-
     |-          git pull --rebase origin gh-pages
     |-          git push origin gh-pages
```

### `.github/workflows/deploy.yml` (modified)
**Valid Comment Ranges (New File):** 48-54, 167-201, 207-213
```diff
@@ -48,6 +48,7 @@ jobs:
  48 |           fi
  49 |           export VITE_APP_URL=https://${{ github.repository_owner }}.github.io/$REPO_NAME
  50 |           pnpm run build
  51 |+          git log -1 --format=%ct > dist/.timestamp
  52 | 
  53 |       - name: Deploy to gh-pages branch
  54 |         uses: peaceiris/actions-gh-pages@v4
@@ -166,6 +167,35 @@ jobs:
 167 |           cd gh-pages-branch
 168 |           mkdir -p previews
 169 | 
 170 |+          # Generate a metadata JSON with last updated timestamps for each deployment
 171 |+          echo "{" > previews/data.json
 172 |+          FIRST=true
 173 |+          # Find all index.html files to identify deployment directories (including nested ones)
 174 |+          for index_file in $(find . -maxdepth 3 -name "index.html"); do
 175 |+            DIR=$(dirname "$index_file" | sed 's|^\./||')
 176 |+
 177 |+            # Skip special folders and the root site
 178 |+            if [[ "$DIR" == "." || "$DIR" == "assets" || "$DIR" == "tmp" || "$DIR" == "previews" ]]; then
 179 |+              continue
 180 |+            fi
 181 |+
 182 |+            # Prefer the .timestamp file (source commit time) over gh-pages commit time
 183 |+            if [ -f "$DIR/.timestamp" ]; then
 184 |+              TIMESTAMP=$(cat "$DIR/.timestamp")
 185 |+            else
 186 |+              TIMESTAMP=$(git log -1 --format=%ct -- "$DIR")
 187 |+            fi
 188 |+            if [ -z "$TIMESTAMP" ]; then TIMESTAMP=$(date +%s); fi
 189 |+
 190 |+            if [ "$FIRST" = true ]; then
 191 |+              FIRST=false
 192 |+            else
 193 |+              echo "," >> previews/data.json
 194 |+            fi
 195 |+            echo "  \"$DIR\": $TIMESTAMP" >> previews/data.json
 196 |+          done
 197 |+          echo "}" >> previews/data.json
 198 |+
 199 |           # Validation: Ensure the dashboard exists in build artifacts
 200 |           if [ ! -f "../dist/previews/index.html" ]; then
 201 |             echo "Error: dist/previews/index.html not found! Deployment of preview index failed."
@@ -177,7 +207,7 @@ jobs:
 207 | 
 208 |           git config user.name "github-actions[bot]"
 209 |           git config user.email "github-actions[bot]@users.noreply.github.com"
     |-          git add previews/index.html
     |-          git commit -m "chore: update previews index after deployment" || echo "No changes to commit"
 210 |+          git add previews/index.html previews/data.json
 211 |+          git commit -m "chore: update previews index and metadata" || echo "No changes to commit"
 212 |           git pull --rebase origin gh-pages
 213 |           git push origin gh-pages
```

### `.github/workflows/prune-stale-previews.yml` (modified)
**Valid Comment Ranges (New File):** 10-21, 24-31, 37-72
```diff
@@ -10,16 +10,12 @@ jobs:
  10 |     permissions:
  11 |       contents: write
  12 |     steps:
     |-      - name: Checkout repository
     |-        uses: actions/checkout@v4
     |-        with:
     |-          fetch-depth: 0
     |-
  13 |       - name: Checkout gh-pages
  14 |         uses: actions/checkout@v4
  15 |         with:
  16 |           ref: gh-pages
  17 |           path: gh-pages-branch
  18 |+          fetch-depth: 0
  19 | 
  20 |       - name: Prune orphaned directories
  21 |         run: |
@@ -28,6 +24,8 @@ jobs:
  24 |           # Get list of all active remote branches
  25 |           ACTIVE_BRANCHES=$(git ls-remote --heads origin | awk -F'refs/heads/' '{print $2}')
  26 | 
  27 |+          NOW=$(date +%s)
  28 |+          GRACE_PERIOD=86400 # 24 hours in seconds
  29 |           CHANGES_MADE=false
  30 | 
  31 |           # Find all index.html files to identify deployment directories (including nested ones)
@@ -39,18 +37,36 @@ jobs:
  37 |               continue
  38 |             fi
  39 | 
     |-            # Remove folder if it doesn't match an active branch
     |-            if ! echo "$ACTIVE_BRANCHES" | grep -qx "$dir"; then
     |-              echo "Branch '$dir' no longer exists. Removing preview..."
     |-              git rm -r "$dir"
     |-              CHANGES_MADE=true
  40 |+            # Check if it doesn't match an active branch
  41 |+            if ! echo "$ACTIVE_BRANCHES" | grep -Fxq "$dir"; then
  42 |+              # Get the timestamp of the last update
  43 |+              if [ -f "$dir/.timestamp" ]; then
  44 |+                LAST_UPDATE=$(cat "$dir/.timestamp")
  45 |+              else
  46 |+                LAST_UPDATE=$(git log -1 --format=%ct -- "$dir")
  47 |+              fi
  48 |+
  49 |+              if [ -z "$LAST_UPDATE" ]; then
  50 |+                # Fallback if git log fails for some reason
  51 |+                LAST_UPDATE=0
  52 |+              fi
  53 |+
  54 |+              AGE=$((NOW - LAST_UPDATE))
  55 |+
  56 |+              if [ "$AGE" -gt "$GRACE_PERIOD" ]; then
  57 |+                echo "Branch '$dir' no longer exists and deployment is older than 24h (${AGE}s). Removing preview..."
  58 |+                git rm -r "$dir"
  59 |+                CHANGES_MADE=true
  60 |+              else
  61 |+                echo "Branch '$dir' no longer exists but deployment is within 24h grace period (${AGE}s). Skipping..."
  62 |+              fi
  63 |             fi
  64 |           done
  65 | 
  66 |           if [ "$CHANGES_MADE" = true ]; then
  67 |             git config user.name "github-actions[bot]"
  68 |             git config user.email "github-actions[bot]@users.noreply.github.com"
     |-            git commit -m "chore: prune orphaned branch previews"
  69 |+            git commit -m "chore: prune orphaned branch previews (grace period enforced)"
  70 |             git push origin gh-pages
  71 |           else
  72 |             echo "No stale previews to prune."
```

### `public/previews/index.html` (modified)
**Valid Comment Ranges (New File):** 47-132
```diff
@@ -47,44 +47,86 @@ <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl mb-2 flex items-ce
  47 |     <script>
  48 |         const REPO_OWNER = 'arii', REPO_NAME = 'tech-dancer';
  49 |         const BASE_URL = `https://${REPO_OWNER}.github.io/${REPO_NAME}`;
  50 |+        const GITHUB_REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
  51 |         const EXCLUDED = ['assets', 'previews', 'css', 'js', 'img', 'images', 'public'];
  52 |         const ICONS = {
  53 |             pr: `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" x2="6" y1="9" y2="21"/></svg>`,
  54 |             branch: `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
     |-            external: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`
  55 |+            external: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`,
  56 |+            clock: `<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
  57 |         };
  58 |         const escapeHtml = (u) => u.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#039;"}[m]));
  59 |+
  60 |+        function timeAgo(seconds) {
  61 |+            const diff = Math.floor(Date.now() / 1000) - seconds;
  62 |+            if (diff < 60) return 'just now';
  63 |+            if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  64 |+            if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  65 |+            return `${Math.floor(diff / 86400)}d ago`;
  66 |+        }
  67 |+
  68 |         async function init() {
  69 |             const grid = document.getElementById('grid'), loading = document.getElementById('loading'), errorAlert = document.getElementById('error-alert');
  70 |             try {
     |-                const [treeData, prs] = await Promise.all([
  71 |+                const [treeData, prs, branches, metadata] = await Promise.all([
  72 |                     fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/gh-pages?recursive=1`).then(r => r.ok ? r.json() : Promise.reject(new Error(`API Error: ${r.status}`))),
     |-                    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=open`).then(r => r.ok ? r.json() : [])
  73 |+                    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=open&per_page=100`).then(r => r.ok ? r.json() : []),
  74 |+                    fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/branches?per_page=100`).then(r => r.ok ? r.json() : []),
  75 |+                    fetch(`${BASE_URL}/previews/data.json`).then(r => r.ok ? r.json() : {}).catch(() => ({}))
  76 |                 ]);
  77 |                 loading.style.display = 'none';
  78 |+                const branchNames = new Set(branches.map(b => b.name));
  79 |                 const folders = treeData.tree.filter(i => i.path.endsWith('/index.html') && !EXCLUDED.some(e => i.path.startsWith(e)) && i.path !== 'index.html' && i.path !== '404.html')
  80 |                     .map(i => i.path.replace('/index.html', ''))
     |-                    .sort((a, b) => (prs.find(p => p.head.ref === b) ? 1 : 0) - (prs.find(p => p.head.ref === a) ? 1 : 0) || a.localeCompare(b));
  81 |+                    .sort((a, b) => {
  82 |+                        const activeA = branchNames.has(a) || prs.some(p => p.head.ref === a);
  83 |+                        const activeB = branchNames.has(b) || prs.some(p => p.head.ref === b);
  84 |+                        if (activeA && !activeB) return -1;
  85 |+                        if (!activeA && activeB) return 1;
  86 |+                        return (metadata[b] || 0) - (metadata[a] || 0);
  87 |+                    });
  88 |+
  89 |                 if (!folders.length) {
  90 |                     grid.innerHTML = `<div class="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"><p class="text-slate-500 dark:text-slate-400 text-lg">No active preview branches found.</p></div>`;
  91 |                     return;
  92 |                 }
  93 |                 folders.forEach(name => {
     |-                    const pr = prs.find(p => p.head.ref === name), url = `${BASE_URL}/${name}/`;
  94 |+                    const pr = prs.find(p => p.head.ref === name), isActive = branchNames.has(name), url = `${BASE_URL}/${name}/`;
  95 |+                    const timestamp = metadata[name];
  96 |                     const card = document.createElement('div');
     |-                    card.className = 'bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 hover:border-blue-300 dark:hover:border-blue-700';
     |-                    const badge = pr
     |-                        ? `<span class="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">Open PR</span>`
     |-                        : `<span class="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">Inactive / Merged</span>`;
  97 |+                    card.className = 'bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-center gap-5 hover:border-blue-300 dark:hover:border-blue-700';
  98 |+
  99 |+                    let badge, typeIcon, typeLabel;
 100 |+                    if (pr) {
 101 |+                        badge = `<span class="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800">Open PR</span>`;
 102 |+                        typeIcon = ICONS.pr;
 103 |+                        typeLabel = `PR #${pr.number}: ${escapeHtml(pr.title)}`;
 104 |+                    } else if (isActive) {
 105 |+                        badge = `<span class="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">Active Branch</span>`;
 106 |+                        typeIcon = ICONS.branch;
 107 |+                        typeLabel = `Deployed Branch`;
 108 |+                    } else {
 109 |+                        badge = `<span class="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800 flex items-center gap-1">${ICONS.clock} Recently Deleted</span>`;
 110 |+                        typeIcon = ICONS.branch;
 111 |+                        typeLabel = `Stale Deployment`;
 112 |+                    }
 113 |+
 114 |                     card.innerHTML = `
 115 |                         <div class="flex-1 min-w-0 w-full">
     |-                            <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
     |-                                ${pr ? `<a href="${pr.html_url}" target="_blank" rel="noopener" class="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-lg sm:text-xl flex items-center gap-2 truncate">${ICONS.pr} PR #${pr.number}: ${escapeHtml(pr.title)}</a>` : `<div class="text-slate-800 dark:text-slate-200 font-semibold text-lg sm:text-xl flex items-center gap-2">${ICONS.branch} Deployed Branch</div>`}
     |-                                <div class="hidden sm:block">${badge}</div>
 116 |+                            <div class="flex items-center justify-between sm:justify-start gap-3 mb-3">
 117 |+                                <div class="flex-1 min-w-0">
 118 |+                                    ${pr ? `<a href="${pr.html_url}" target="_blank" rel="noopener" class="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-lg sm:text-xl flex items-center gap-2 truncate w-full">${typeIcon} ${typeLabel}</a>` : `<div class="text-slate-800 dark:text-slate-200 font-semibold text-lg sm:text-xl flex items-center gap-2 truncate w-full">${typeIcon} ${typeLabel}</div>`}
 119 |+                                </div>
 120 |+                                <div class="hidden sm:block shrink-0">${badge}</div>
 121 |+                            </div>
 122 |+                            <div class="flex flex-wrap items-center gap-3">
 123 |+                                <span class="text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono px-2 py-1 rounded border border-slate-200 dark:border-slate-700 truncate max-w-[200px] sm:max-w-md">${escapeHtml(name)}</span>
 124 |+                                ${isActive ? `<a href="${GITHUB_REPO_URL}/tree/${encodeURIComponent(name)}" target="_blank" rel="noopener" class="text-xs text-slate-500 hover:text-blue-500 flex items-center gap-1 transition-colors">${ICONS.external} View Source</a>` : ''}
 125 |+                                ${timestamp ? `<span class="text-xs text-slate-400 flex items-center gap-1">${ICONS.clock} ${timeAgo(timestamp)}</span>` : ''}
 126 |+                                <div class="sm:hidden shrink-0">${badge}</div>
 127 |                             </div>
     |-                            <div class="flex items-center gap-2"><span class="text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono px-2 py-1 rounded border border-slate-200 dark:border-slate-700 truncate">${escapeHtml(name)}</span><div class="sm:hidden">${badge}</div></div>
 128 |                         </div>
     |-                        <a href="${url}" target="_blank" rel="noopener" class="w-full sm:w-auto bg-slate-900 dark:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 shadow-sm">View Deployment ${ICONS.external}</a>`;
 129 |+                        <a href="${url}" target="_blank" rel="noopener" class="w-full sm:w-auto bg-slate-900 dark:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity shrink-0">View Deployment ${ICONS.external}</a>`;
 130 |                     grid.appendChild(card);
 131 |                 });
 132 |             } catch (err) {
```