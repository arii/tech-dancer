# PR Context: #431 — ci: preserve original PR metadata and trigger CI on conflict resolution
**Author:** @arii

## Description
Modified the `auto-conflict-resolver.yml` workflow to fetch the original pull request's title and body using the `gh api`.
The PR created by the resolver now preserves this metadata rather than using generic text.
Since `gh pr create` executed with a `GITHUB_TOKEN` is prevented by GitHub Actions from triggering `pull_request` workflows, target workflows were updated with the `workflow_dispatch` event, and the resolver script now manually executes them via `gh workflow run`, satisfying the requirement to run regular PR validations.

---
*PR created automatically by Jules for task [15088861936508531586](https://jules.google.com/task/15088861936508531586) started by @arii*

## Files Changed
- 🟡 `.github/workflows/auto-conflict-resolver.yml`
- 🟡 `.github/workflows/ci.yml`
- 🟡 `.github/workflows/codeql.yml`
- 🟡 `.github/workflows/conflict-check.yml`
- 🟡 `.github/workflows/lint.yml`
- 🟡 `.github/workflows/smoke-tests.yml`

## Diffs

### `.github/workflows/auto-conflict-resolver.yml` (modified)
```diff
@@ -46,26 +46,35 @@ jobs:
  46 |     permissions:
  47 |       contents: write
  48 |       pull-requests: write
  49 |+      actions: write
  50 |     steps:
     |-      - name: Resolve PR details (issue_comment)
     |-        if: github.event_name == 'issue_comment'
  51 |+      - name: Resolve PR details
  52 |+        if: env.PR_NUMBER && env.PR_NUMBER != '0'
  53 |         env:
  54 |           GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  55 |           GH_REPO: ${{ github.repository }}
  56 |         run: |
     |-          PR_INFO=$(gh api "repos/${GH_REPO}/pulls/${{ github.event.issue.number }}")
  57 |+          PR_INFO=$(gh api "repos/${GH_REPO}/pulls/${{ env.PR_NUMBER }}")
  58 |+
  59 |+          EOF=$(dd if=/dev/urandom bs=15 count=1 status=none | base64)
  60 | 
     |-          # Read cleanly via jq and write to environment file securely using EOF
  61 |+          # Read cleanly via jq and write to environment file securely using randomized EOF
  62 |           {
     |-            echo 'SOURCE<<EOF'
  63 |+            echo "SOURCE<<$EOF"
  64 |             echo "$PR_INFO" | jq -r '.head.ref'
     |-            echo 'EOF'
     |-            echo 'TARGET<<EOF'
  65 |+            echo "$EOF"
  66 |+            echo "TARGET<<$EOF"
  67 |             echo "$PR_INFO" | jq -r '.base.ref'
     |-            echo 'EOF'
     |-            echo 'HEAD_REPO<<EOF'
  68 |+            echo "$EOF"
  69 |+            echo "HEAD_REPO<<$EOF"
  70 |             echo "$PR_INFO" | jq -r '.head.repo.full_name'
     |-            echo 'EOF'
  71 |+            echo "$EOF"
  72 |+            echo "ORIGINAL_TITLE<<$EOF"
  73 |+            echo "$PR_INFO" | jq -r '.title'
  74 |+            echo "$EOF"
  75 |+            echo "ORIGINAL_BODY<<$EOF"
  76 |+            echo "$PR_INFO" | jq -r '.body'
  77 |+            echo "$EOF"
  78 |           } >> "$GITHUB_ENV"
  79 | 
  80 |       - name: Create or update comment
@@ -171,14 +180,32 @@ jobs:
 180 |           echo "resolved_sha=$(git rev-parse HEAD)" >> $GITHUB_OUTPUT
 181 | 
 182 |           # Create a pull request in the base repository against the target branch to suggest the fix
 183 |+          if [ "$ORIGINAL_BODY" = "null" ] || [ -z "$ORIGINAL_BODY" ]; then
 184 |+            ORIGINAL_BODY="This PR suggests a resolution for the merge conflicts."
 185 |+          fi
 186 |+
 187 |+          PR_TITLE="[Auto-Resolved] ${ORIGINAL_TITLE:-"Auto-resolve merge conflicts from ${TARGET} for ${SOURCE}"}"
 188 |+          PR_BODY="$ORIGINAL_BODY
 189 |+
 190 |+          ---
 191 |+          *Note: This PR was automatically generated to resolve merge conflicts from ${TARGET}.*"
 192 |+
 193 |           PR_URL=$(gh pr create \
 194 |             --repo "${{ github.repository }}" \
 195 |             --head "$RESOLVE_BRANCH" \
 196 |             --base "$TARGET" \
     |-            --title "Auto-resolve merge conflicts from ${TARGET} for ${SOURCE}" \
     |-            --body "This PR suggests a resolution for the merge conflicts. Please review and merge it to resolve the conflicts for the original PR.")
 197 |+            --title "$PR_TITLE" \
 198 |+            --body "$PR_BODY")
 199 | 
 200 |           echo "pr_url=${PR_URL}" >> $GITHUB_OUTPUT
 201 |+
 202 |+          # Manually trigger workflows to run on the new PR
 203 |+          gh workflow run ci.yml --ref "$RESOLVE_BRANCH" || true
 204 |+          gh workflow run lint.yml --ref "$RESOLVE_BRANCH" || true
 205 |+          gh workflow run smoke-tests.yml --ref "$RESOLVE_BRANCH" || true
 206 |+          gh workflow run codeql.yml --ref "$RESOLVE_BRANCH" || true
 207 |+          gh workflow run conflict-check.yml --ref "$RESOLVE_BRANCH" || true
 208 |+
 209 |         id: commit_push
 210 | 
 211 |       - name: Update comment on success
```

### `.github/workflows/ci.yml` (modified)
```diff
@@ -7,6 +7,7 @@ on:
   7 |   pull_request:
   8 |     branches:
   9 |       - '**'
  10 |+  workflow_dispatch:
  11 | 
  12 | permissions:
  13 |   contents: read
```

### `.github/workflows/codeql.yml` (modified)
```diff
@@ -7,6 +7,7 @@ on:
   7 |     branches: [ "main" ]
   8 |   schedule:
   9 |     - cron: '45 4 * * 6'
  10 |+  workflow_dispatch:
  11 | 
  12 | jobs:
  13 |   analyze:
```

### `.github/workflows/conflict-check.yml` (modified)
```diff
@@ -3,6 +3,7 @@ name: Merge Conflict Check
   3 | on:
   4 |   pull_request:
   5 |     branches: [main]
   6 |+  workflow_dispatch:
   7 | 
   8 | permissions:
   9 |   contents: read
```

### `.github/workflows/lint.yml` (modified)
```diff
@@ -5,6 +5,7 @@ on:
   5 |     branches: [main]
   6 |   pull_request:
   7 |     branches: [main]
   8 |+  workflow_dispatch:
   9 | 
  10 | permissions:
  11 |   contents: read
```

### `.github/workflows/smoke-tests.yml` (modified)
```diff
@@ -3,6 +3,7 @@ name: Smoke Tests
   3 | on:
   4 |   pull_request:
   5 |     branches: [main]
   6 |+  workflow_dispatch:
   7 | 
   8 | permissions:
   9 |   contents: read
```