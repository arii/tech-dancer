# PR Context: #948 — Update GitHub Actions and remove Node 24 force environment variable
**Author:** @arii

## Description
This PR updates all GitHub Actions across the repository to their latest confirmed versions as of May 2026 and removes the deprecated `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` environment variable. This addresses Node.js 24 deprecation warnings and ensures the CI/CD pipeline uses modern, supported runtimes.

Fixes #904

---
*PR created automatically by Jules for task [9437545176145856493](https://jules.google.com/task/9437545176145856493) started by @arii*

## Files Changed
- 🟡 `.github/workflows/auto-conflict-resolver.yml`
- 🟡 `.github/workflows/ci.yml`
- 🟡 `.github/workflows/codeql.yml`
- 🟡 `.github/workflows/conflict-check.yml`
- 🟡 `.github/workflows/deploy.yml`
- 🟡 `.github/workflows/issue_to_pr.yml`
- 🟡 `.github/workflows/jules-fix-trigger.yml`
- 🟡 `.github/workflows/mass-audit-prs.yml`
- 🟡 `.github/workflows/mergellama.yml`
- 🟡 `.github/workflows/prune-stale-previews.yml`
- 🟡 `.github/workflows/security.yml`
- 🟡 `.github/workflows/self-healing.yml`
- 🟡 `.github/workflows/update-snapshots.yml`
- 🟡 `.github/workflows/validate_issue.yml`
- 🟡 `.github/workflows/wcs_etl.yml`

## Diffs

### `.github/workflows/auto-conflict-resolver.yml` (modified)
```diff
@@ -33,7 +33,6 @@ on:
  33 |         type: string
  34 | 
  35 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  36 |   TARGET: ${{ inputs.target_branch || 'main' }}
  37 |   SOURCE: ${{ inputs.source_branch }}
  38 |   PR_NUMBER: ${{ inputs.pr_number || github.event.issue.number || '0' }}
@@ -89,7 +88,7 @@ jobs:
  88 |           token: ${{ secrets.GITHUB_TOKEN }}
  89 | 
  90 |       - name: Checkout base repository
     |-        uses: actions/checkout@v4
  91 |+        uses: actions/checkout@v6
  92 |         with:
  93 |           fetch-depth: 0
  94 |           token: ${{ secrets.GITHUB_TOKEN }}
@@ -161,7 +160,7 @@ jobs:
 160 |       - name: Resolve conflicts
 161 |         if: steps.validate_branches.outputs.skipped != 'true' && steps.merge.outputs.merge_failed != 'true'
 162 |         id: resolve
     |-        uses: VeyronSakai/conflict-resolver@7d650534ba240658a381241823f8b4f13861c2ad # pin to v0.5.1
 163 |+        uses: VeyronSakai/conflict-resolver@v0.5
 164 | 
 165 |       - name: Commit and create PR
 166 |         if: steps.validate_branches.outputs.skipped != 'true' && steps.merge.outputs.merge_failed != 'true' && steps.resolve.outputs.unresolved-files == ''
```

### `.github/workflows/ci.yml` (modified)
```diff
@@ -40,7 +40,6 @@ concurrency:
  40 |   cancel-in-progress: true
  41 | 
  42 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  43 |   ANY_COUNT_BASELINE: ${{ vars.ANY_COUNT_BASELINE }}
  44 |   BUNDLE_BASELINE_KB: ${{ vars.BUNDLE_BASELINE_KB }}
  45 |   AUDIT_BASELINE: ${{ vars.AUDIT_BASELINE }}
@@ -51,15 +50,15 @@ jobs:
  50 |     runs-on: ubuntu-latest
  51 |     steps:
  52 |       - name: Checkout
     |-        uses: actions/checkout@v4.2.2
  53 |+        uses: actions/checkout@v6
  54 |         with:
  55 |           fetch-depth: 0
  56 | 
  57 |       - name: Setup pnpm
     |-        uses: pnpm/action-setup@v4.0.0
  58 |+        uses: pnpm/action-setup@v6
  59 | 
  60 |       - name: Setup Node.js
     |-        uses: actions/setup-node@v4.1.0
  61 |+        uses: actions/setup-node@v6
  62 |         with:
  63 |           node-version: 24
  64 |           cache: pnpm
@@ -99,15 +98,15 @@ jobs:
  98 |     runs-on: ubuntu-latest
  99 |     steps:
 100 |       - name: Checkout
     |-        uses: actions/checkout@v4.2.2
 101 |+        uses: actions/checkout@v6
 102 |         with:
 103 |           fetch-depth: 0
 104 | 
 105 |       - name: Setup pnpm
     |-        uses: pnpm/action-setup@v4.0.0
 106 |+        uses: pnpm/action-setup@v6
 107 | 
 108 |       - name: Setup Node.js
     |-        uses: actions/setup-node@v4.1.0
 109 |+        uses: actions/setup-node@v6
 110 |         with:
 111 |           node-version: 24
 112 |           cache: pnpm
@@ -142,13 +141,13 @@ jobs:
 141 |     runs-on: ubuntu-latest
 142 |     steps:
 143 |       - name: Checkout
     |-        uses: actions/checkout@v4.2.2
 144 |+        uses: actions/checkout@v6
 145 | 
 146 |       - name: Setup pnpm
     |-        uses: pnpm/action-setup@v4.0.0
 147 |+        uses: pnpm/action-setup@v6
 148 | 
 149 |       - name: Setup Node.js
     |-        uses: actions/setup-node@v4.1.0
 150 |+        uses: actions/setup-node@v6
 151 |         with:
 152 |           node-version: 24
 153 |           cache: pnpm
@@ -172,7 +171,7 @@ jobs:
 171 | 
 172 |       - name: Cache Playwright Browsers
 173 |         id: playwright-cache
     |-        uses: actions/cache@v4
 174 |+        uses: actions/cache@v5
 175 |         with:
 176 |           path: ~/.cache/ms-playwright
 177 |           key: ${{ runner.os }}-playwright-${{ hashFiles('pnpm-lock.yaml') }}
@@ -204,7 +203,7 @@ jobs:
 203 | 
 204 |       - name: Upload Test Results
 205 |         if: failure()
     |-        uses: actions/upload-artifact@v4
 206 |+        uses: actions/upload-artifact@v7
 207 |         with:
 208 |           name: playwright-report
 209 |           path: playwright-report/
```

### `.github/workflows/codeql.yml` (modified)
```diff
@@ -22,7 +22,6 @@ on:
  22 |   workflow_dispatch:
  23 | 
  24 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  25 | 
  26 | jobs:
  27 |   analyze:
@@ -39,7 +38,7 @@ jobs:
  38 | 
  39 |     steps:
  40 |     - name: Checkout repository
     |-      uses: actions/checkout@v4
  41 |+      uses: actions/checkout@v6
  42 | 
  43 |     - name: Initialize CodeQL
  44 |       uses: github/codeql-action/init@v4
```

### `.github/workflows/conflict-check.yml` (modified)
```diff
@@ -9,13 +9,12 @@ permissions:
   9 |   contents: read
  10 | 
  11 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  12 | 
  13 | jobs:
  14 |   conflict-check:
  15 |     runs-on: ubuntu-latest
  16 |     steps:
     |-      - uses: actions/checkout@v4
  17 |+      - uses: actions/checkout@v6
  18 |         with:
  19 |           fetch-depth: 0
  20 | 
```

### `.github/workflows/deploy.yml` (modified)
```diff
@@ -17,20 +17,19 @@ concurrency:
  17 |   cancel-in-progress: false
  18 | 
  19 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  20 | 
  21 | jobs:
  22 |   build_and_deploy:
  23 |     runs-on: ubuntu-latest
  24 |     steps:
  25 |       - name: Checkout Branch
     |-        uses: actions/checkout@v4.2.2
  26 |+        uses: actions/checkout@v6
  27 | 
  28 |       - name: Setup pnpm
     |-        uses: pnpm/action-setup@v4.0.0
  29 |+        uses: pnpm/action-setup@v6
  30 | 
  31 |       - name: Setup Node.js
     |-        uses: actions/setup-node@v4.1.0
  32 |+        uses: actions/setup-node@v6
  33 |         with:
  34 |           node-version: 24
  35 |           cache: 'pnpm'
@@ -180,7 +179,7 @@ jobs:
 179 |           clean: false # Do not delete other files in arii.github.io
 180 | 
 181 |       - name: Update Deployment Feedback
     |-        uses: actions/github-script@v7
 182 |+        uses: actions/github-script@v9
 183 |         with:
 184 |           github-token: ${{ secrets.GITHUB_TOKEN }}
 185 |           script: |
```

### `.github/workflows/issue_to_pr.yml` (modified)
```diff
@@ -10,18 +10,17 @@ permissions:
  10 |   issues: read
  11 | 
  12 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  13 | 
  14 | jobs:
  15 |   create-pr:
  16 |     if: contains(github.event.issue.title, 'Draft:') && (github.event.issue.author_association == 'OWNER' || github.event.issue.author_association == 'MEMBER' || github.event.issue.author_association == 'COLLABORATOR')
  17 |     runs-on: ubuntu-latest
  18 |     steps:
  19 |       - name: Checkout code
     |-        uses: actions/checkout@v4
  20 |+        uses: actions/checkout@v6
  21 | 
  22 |       - name: Set up Python
     |-        uses: actions/setup-python@v5
  23 |+        uses: actions/setup-python@v6
  24 |         with:
  25 |           python-version: '3.x'
  26 | 
@@ -73,7 +72,7 @@ jobs:
  72 |               f.write(f"SAFE_TITLE={safe_title}\n")
  73 | 
  74 |       - name: Create Pull Request
     |-        uses: peter-evans/create-pull-request@v6
  75 |+        uses: peter-evans/create-pull-request@v8
  76 |         with:
  77 |           token: ${{ secrets.GITHUB_TOKEN }}
  78 |           commit-message: "docs: add content from issue #${{ github.event.issue.number }}"
```

### `.github/workflows/jules-fix-trigger.yml` (modified)
```diff
@@ -11,7 +11,6 @@ permissions:
  11 |   actions: read
  12 | 
  13 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  14 | 
  15 | jobs:
  16 |   trigger-jules:
@@ -24,10 +23,10 @@ jobs:
  23 |     runs-on: ubuntu-latest
  24 |     steps:
  25 |       - name: Checkout
     |-        uses: actions/checkout@v4
  26 |+        uses: actions/checkout@v6
  27 | 
  28 |       - name: Set up Python
     |-        uses: actions/setup-python@v5
  29 |+        uses: actions/setup-python@v6
  30 |         with:
  31 |           python-version: '3.x'
  32 | 
```

### `.github/workflows/mass-audit-prs.yml` (modified)
```diff
@@ -13,25 +13,25 @@ jobs:
  13 |       pull-requests: write
  14 |     steps:
  15 |       - name: Checkout Repository
     |-        uses: actions/checkout@v4
  16 |+        uses: actions/checkout@v6
  17 |         with:
  18 |           fetch-depth: 0
  19 | 
  20 |       - name: Set up Python
     |-        uses: actions/setup-python@v5
  21 |+        uses: actions/setup-python@v6
  22 |         with:
  23 |           python-version: '3.12'
  24 | 
  25 |       - name: Install Python dependencies
  26 |         run: pip install PyGithub
  27 | 
  28 |       - name: Set up Node.js
     |-        uses: actions/setup-node@v4
  29 |+        uses: actions/setup-node@v6
  30 |         with:
  31 |           node-version: '22'
  32 | 
  33 |       - name: Setup pnpm
     |-        uses: pnpm/action-setup@v3
  34 |+        uses: pnpm/action-setup@v6
  35 |         with:
  36 |           version: 10
  37 | 
@@ -63,7 +63,7 @@ jobs:
  63 |           bash dev-tools/audit_headless.sh --sync
  64 | 
  65 |       - name: Commit and Push REVIEW_TRACKING.md
     |-        uses: stefanzweifel/git-auto-commit-action@v5
  66 |+        uses: stefanzweifel/git-auto-commit-action@v7
  67 |         with:
  68 |           commit_message: "chore: update PR review tracking"
  69 |           file_pattern: 'REVIEW_TRACKING.md pr_overlaps.txt'
  70 |\ No newline at end of file
```

### `.github/workflows/mergellama.yml` (modified)
```diff
@@ -9,26 +9,25 @@ permissions:
   9 |   pull-requests: write
  10 | 
  11 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  12 | 
  13 | jobs:
  14 |   resolve-conflicts:
  15 |     runs-on: ubuntu-latest
  16 |     if: github.event.pull_request.mergeable == false || contains(github.event.pull_request.labels.*.name, 'has-conflicts')
  17 |     steps:
  18 |       - name: Checkout Code
     |-        uses: actions/checkout@v4
  19 |+        uses: actions/checkout@v6
  20 |         with:
  21 |           fetch-depth: 0
  22 |           ref: ${{ github.head_ref }}
  23 | 
  24 |       - name: Setup Node.js
     |-        uses: actions/setup-node@v4
  25 |+        uses: actions/setup-node@v6
  26 |         with:
  27 |           node-version: '22'
  28 | 
  29 |       - name: Install pnpm
     |-        uses: pnpm/action-setup@v3
  30 |+        uses: pnpm/action-setup@v6
  31 |         with:
  32 |           version: 10
  33 | 
@@ -67,7 +66,7 @@ jobs:
  66 |           pnpm run type-check
  67 | 
  68 |       - name: Commit Changes
     |-        uses: stefanzweifel/git-auto-commit-action@v5
  69 |+        uses: stefanzweifel/git-auto-commit-action@v7
  70 |         with:
  71 |           commit_message: "chore: auto-resolved merge conflicts using MergeLlama"
  72 |           file_pattern: '.'
```

### `.github/workflows/prune-stale-previews.yml` (modified)
```diff
@@ -9,7 +9,6 @@ concurrency:
   9 |   cancel-in-progress: false
  10 | 
  11 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  12 | 
  13 | jobs:
  14 |   prune:
@@ -18,7 +17,7 @@ jobs:
  17 |       contents: write
  18 |     steps:
  19 |       - name: Checkout gh-pages
     |-        uses: actions/checkout@v4
  20 |+        uses: actions/checkout@v6
  21 |         with:
  22 |           ref: gh-pages
  23 |           path: gh-pages-branch
```

### `.github/workflows/security.yml` (modified)
```diff
@@ -24,21 +24,20 @@ permissions:
  24 |   contents: read
  25 | 
  26 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  27 | 
  28 | jobs:
  29 |   oxlint:
  30 |     name: Oxlint Scan
  31 |     runs-on: ubuntu-latest
  32 |     steps:
  33 |       - name: Checkout repository
     |-        uses: actions/checkout@v4
  34 |+        uses: actions/checkout@v6
  35 | 
  36 |       - name: Setup pnpm
     |-        uses: pnpm/action-setup@v4
  37 |+        uses: pnpm/action-setup@v6
  38 | 
  39 |       - name: Setup Node.js
     |-        uses: actions/setup-node@v4
  40 |+        uses: actions/setup-node@v6
  41 |         with:
  42 |           node-version: 24
  43 |           cache: 'pnpm'
@@ -54,7 +53,7 @@ jobs:
  53 |     runs-on: ubuntu-latest
  54 |     steps:
  55 |       - name: Checkout repository
     |-        uses: actions/checkout@v4
  56 |+        uses: actions/checkout@v6
  57 |         with:
  58 |           fetch-depth: 0
  59 | 
@@ -70,7 +69,7 @@ jobs:
  69 |       image: returntocorp/semgrep
  70 |     steps:
  71 |       - name: Checkout repository
     |-        uses: actions/checkout@v4
  72 |+        uses: actions/checkout@v6
  73 | 
  74 |       - name: Semgrep Scan
  75 |         run: semgrep scan --config auto --error
```

### `.github/workflows/self-healing.yml` (modified)
```diff
@@ -14,7 +14,6 @@ permissions:
  14 |   actions: read
  15 | 
  16 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  17 | 
  18 | jobs:
  19 |   repair:
@@ -35,7 +34,7 @@ jobs:
  34 |       OLLAMA_MODEL: "qwen2.5-coder:1.5b"
  35 |     steps:
  36 |       - name: Checkout trusted code
     |-        uses: actions/checkout@v4
  37 |+        uses: actions/checkout@v6
  38 |         with:
  39 |           persist-credentials: false
  40 | 
@@ -61,10 +60,10 @@ jobs:
  60 |           gh pr checkout "$ISSUE_NUMBER"
  61 | 
  62 |       - name: Setup pnpm
     |-        uses: pnpm/action-setup@v4
  63 |+        uses: pnpm/action-setup@v6
  64 | 
  65 |       - name: Setup Node.js
     |-        uses: actions/setup-node@v4
  66 |+        uses: actions/setup-node@v6
  67 |         with:
  68 |           node-version: 24
  69 |           cache: pnpm
```

### `.github/workflows/update-snapshots.yml` (modified)
```diff
@@ -5,7 +5,6 @@ on:
   5 |     types: [created]
   6 | 
   7 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
   8 |   NODE_ENV: production
   9 |   REPO_NAME: ${{ github.event.repository.name }}
  10 |   VITE_BASE_PATH: /${{ github.event.repository.name }}/
@@ -36,18 +35,18 @@ jobs:
  35 |             --jq '"HEAD_REF=" + .head.ref, "HEAD_REPO=" + .head.repo.full_name' >> "$GITHUB_ENV"
  36 | 
  37 |       - name: Checkout source branch
     |-        uses: actions/checkout@v4
  38 |+        uses: actions/checkout@v6
  39 |         with:
  40 |           ref: ${{ env.HEAD_REF }}
  41 |           repository: ${{ env.HEAD_REPO }}
  42 |           token: ${{ secrets.GITHUB_TOKEN }}
  43 |           fetch-depth: 0
  44 | 
  45 |       - name: Setup pnpm
     |-        uses: pnpm/action-setup@v4
  46 |+        uses: pnpm/action-setup@v6
  47 | 
  48 |       - name: Setup Node.js
     |-        uses: actions/setup-node@v4
  49 |+        uses: actions/setup-node@v6
  50 |         with:
  51 |           node-version: 22
  52 |           cache: pnpm
```

### `.github/workflows/validate_issue.yml` (modified)
```diff
@@ -5,7 +5,6 @@ on:
   5 |     types: [opened, edited]
   6 | 
   7 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
   8 | 
   9 | jobs:
  10 |   validate:
@@ -14,8 +13,8 @@ jobs:
  13 |       issues: write
  14 |       contents: read
  15 |     steps:
     |-      - uses: actions/checkout@v4.2.2
     |-      - uses: actions/setup-python@v5
  16 |+      - uses: actions/checkout@v6
  17 |+      - uses: actions/setup-python@v6
  18 |         with:
  19 |           python-version: '3.x'
  20 |       - run: pip install PyGithub
```

### `.github/workflows/wcs_etl.yml` (modified)
```diff
@@ -6,7 +6,6 @@ on:
   6 |   workflow_dispatch:
   7 | 
   8 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
   9 | 
  10 | jobs:
  11 |   build-test-deploy:
@@ -15,12 +14,12 @@ jobs:
  14 |       contents: write
  15 |     steps:
  16 |       - name: Checkout Repository
     |-        uses: actions/checkout@v4
  17 |+        uses: actions/checkout@v6
  18 |         with:
  19 |           lfs: true
  20 | 
  21 |       - name: Set up Python
     |-        uses: actions/setup-python@v5
  22 |+        uses: actions/setup-python@v6
  23 |         with:
  24 |           python-version: '3.11'
  25 |           cache: 'pip'
@@ -32,7 +31,7 @@ jobs:
  31 | 
  32 |       - name: Cache Playwright Browsers
  33 |         id: cache-playwright
     |-        uses: actions/cache@v4
  34 |+        uses: actions/cache@v5
  35 |         with:
  36 |           path: ~/.cache/ms-playwright
  37 |           key: playwright-etl-${{ runner.os }}-chromium-v1
```