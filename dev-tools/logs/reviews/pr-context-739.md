# PR Context: #739 — Fix GitHub Actions workflow syntax error for unquoted boolean env variables
**Author:** @arii

## Description
Fixes the `Unexpected value ''` parsing error in all GitHub Actions workflows by wrapping the boolean `true` in quotes within the top-level `env` blocks.

---
*PR created automatically by Jules for task [355947351825814968](https://jules.google.com/task/355947351825814968) started by @arii*

## Files Changed
- 🟡 `.github/workflows/auto-conflict-resolver.yml`
- 🟡 `.github/workflows/ci.yml`
- 🟡 `.github/workflows/codeql.yml`
- 🟡 `.github/workflows/conflict-check.yml`
- 🟡 `.github/workflows/deploy.yml`
- 🟡 `.github/workflows/issue_to_pr.yml`
- 🟡 `.github/workflows/jules-fix-trigger.yml`
- 🟡 `.github/workflows/prune-stale-previews.yml`
- 🟡 `.github/workflows/security.yml`
- 🟡 `.github/workflows/self-healing.yml`
- 🟡 `.github/workflows/update-snapshots.yml`
- 🟡 `.github/workflows/validate_issue.yml`
- 🟡 `.github/workflows/wcs_etl.yml`
- 🟡 `tests/dev-tools/test_td_cli.py`

## Diffs

### `.github/workflows/auto-conflict-resolver.yml` (modified)
```diff
@@ -33,7 +33,7 @@ on:
  33 |         type: string
  34 | 
  35 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
  36 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  37 |   TARGET: ${{ inputs.target_branch || 'main' }}
  38 |   SOURCE: ${{ inputs.source_branch }}
  39 |   PR_NUMBER: ${{ inputs.pr_number || github.event.issue.number || '0' }}
```

### `.github/workflows/ci.yml` (modified)
```diff
@@ -39,7 +39,7 @@ concurrency:
  39 |   cancel-in-progress: true
  40 | 
  41 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
  42 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  43 |   ANY_COUNT_BASELINE: ${{ vars.ANY_COUNT_BASELINE }}
  44 |   BUNDLE_BASELINE_KB: ${{ vars.BUNDLE_BASELINE_KB }}
  45 |   AUDIT_BASELINE: ${{ vars.AUDIT_BASELINE }}
```

### `.github/workflows/codeql.yml` (modified)
```diff
@@ -22,7 +22,7 @@ on:
  22 |   workflow_dispatch:
  23 | 
  24 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
  25 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  26 | 
  27 | jobs:
  28 |   analyze:
```

### `.github/workflows/conflict-check.yml` (modified)
```diff
@@ -9,7 +9,7 @@ permissions:
   9 |   contents: read
  10 | 
  11 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
  12 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  13 | 
  14 | jobs:
  15 |   conflict-check:
```

### `.github/workflows/deploy.yml` (modified)
```diff
@@ -17,7 +17,7 @@ concurrency:
  17 |   cancel-in-progress: false
  18 | 
  19 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
  20 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  21 | 
  22 | jobs:
  23 |   build_and_deploy:
```

### `.github/workflows/issue_to_pr.yml` (modified)
```diff
@@ -10,7 +10,7 @@ permissions:
  10 |   issues: read
  11 | 
  12 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
  13 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  14 | 
  15 | jobs:
  16 |   create-pr:
```

### `.github/workflows/jules-fix-trigger.yml` (modified)
```diff
@@ -11,7 +11,7 @@ permissions:
  11 |   actions: read
  12 | 
  13 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
  14 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  15 | 
  16 | jobs:
  17 |   trigger-jules:
```

### `.github/workflows/prune-stale-previews.yml` (modified)
```diff
@@ -9,7 +9,7 @@ concurrency:
   9 |   cancel-in-progress: false
  10 | 
  11 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
  12 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  13 | 
  14 | jobs:
  15 |   prune:
```

### `.github/workflows/security.yml` (modified)
```diff
@@ -24,7 +24,7 @@ permissions:
  24 |   contents: read
  25 | 
  26 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
  27 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  28 | 
  29 | jobs:
  30 |   oxlint:
```

### `.github/workflows/self-healing.yml` (modified)
```diff
@@ -14,7 +14,7 @@ permissions:
  14 |   actions: read
  15 | 
  16 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
  17 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  18 | 
  19 | jobs:
  20 |   repair:
```

### `.github/workflows/update-snapshots.yml` (modified)
```diff
@@ -5,7 +5,7 @@ on:
   5 |     types: [created]
   6 | 
   7 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
   8 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
   9 |   NODE_ENV: production
  10 |   REPO_NAME: ${{ github.event.repository.name }}
  11 |   VITE_BASE_PATH: /${{ github.event.repository.name }}/
```

### `.github/workflows/validate_issue.yml` (modified)
```diff
@@ -5,7 +5,7 @@ on:
   5 |     types: [opened, edited]
   6 | 
   7 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
   8 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
   9 | 
  10 | jobs:
  11 |   validate:
```

### `.github/workflows/wcs_etl.yml` (modified)
```diff
@@ -6,7 +6,7 @@ on:
   6 |   workflow_dispatch:
   7 | 
   8 | env:
     |-  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true
   9 |+  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: 'true'
  10 | 
  11 | jobs:
  12 |   build-test-deploy:
```

### `tests/dev-tools/test_td_cli.py` (modified)
```diff
@@ -12,7 +12,7 @@
  12 | 
  13 | class TestTDCLI(unittest.TestCase):
  14 | 
     |-    @patch('td_cli.get_github_token')
  15 |+    @patch('utils.get_github_token')
  16 |     @patch('td_cli.get_repo_name')
  17 |     @patch('github.Github')
  18 |     def test_validate_issue_dry_run_default(self, mock_github_class, mock_repo, mock_token):
```