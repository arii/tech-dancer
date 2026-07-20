# PR Context: #3863 — Fix submodule update workflow target ref bug
**Author:** @google-labs-jules[bot]

## Description
This change fixes a bug where automated submodule update triggers inadvertently target active caller branches instead of the `main` branch. It updates the workflow bash script to enforce the `TARGET_REF` to `"main"` on non-`workflow_dispatch` events, ensuring the branch generated is strictly `automation/update-submodule-main`.

---
*PR created automatically by Jules for task [10355295892380927479](https://jules.google.com/task/10355295892380927479) started by @arii*

## CI Status
- ❌ **Deployment Impact Analysis**: completed (failure)
  <details><summary>Failure Logs Snippet</summary>

  ```
      `- [Link to artifacts](https://github.com/${owner}/${repo}/actions/runs/${context.runId})`,
    bodyParts.push(impactBodyText, '');
  const truncationNotice = '\n\n... (truncated due to GitHub comment size limits)\n';
  let currentContent = bodyParts.join('\n');
  // Adding 1 because joining `bodyParts` with `\n` and `commentTag` will add a newline
     // subtracting 2 to account for the newlines joining bodyParts
     bodyParts = [safeContent, truncationNotice];
  bodyParts.push(commentTag);
  const body = bodyParts.join('\n');
  const comments = await github.paginate(github.rest.issues.listComments, {
  const existingComment = comments.find(c => c.body.includes(commentTag));
mkdir -p artifacts/logs/ai
# Sync from the TS logger location to the workspace log location expected by Python CLI
# Sync to artifacts for upload
cp -r .boomtick/logs/ai/* artifacts/logs/ai/ 2>/dev/null || true
shell: bash --noprofile --norc -e -o pipefail {0}
path: artifacts/
Artifact download URL: https://github.com/arii/tech-dancer/actions/runs/29711589758/artifacts/8449098058
echo "CI Metrics verification failed."
shell: bash --noprofile --norc -e -o pipefail {0}
  ```
  </details>
- ⏳ **CodeQL**: completed (neutral)
- ⏳ **deploy**: completed (skipped)
- ⏳ **build**: completed (skipped)
- ✅ **Validate all workflow files**: completed (success)
- ✅ **Security Scan (oxlint)**: completed (success)
- ✅ **Build & E2E**: completed (success)
- ✅ **Security Scan (semgrep)**: completed (success)
- ❌ **Security Scan (gitleaks)**: completed (failure)
  <details><summary>Failure Logs Snippet</summary>

  ```
  ##[group]Initialize Schemas and Contracts
##[group]Run sync-contracts in mcp
Scope: all 2 workspace projects
+ tsx 4.23.1
+ vitest 4.1.10
.. preinstall$ node scripts/check-runtime-files.mjs
â   Ignored build scripts: esbuild@0.28.1.                                     â
â   to run scripts.                                                            â
No projects matched the filters in "/home/runner/work/tech-dancer/tech-dancer"
shell: /usr/bin/bash --noprofile --norc -e -o pipefail {0}
. postinstall$ python3 scripts/sync-python-deps.py
. postinstall: ð Syncing Python dependencies from /home/runner/work/tech-dancer/tech-dancer/boomtick-pkg/cli/requirements.txt...
â   Ignored build scripts: @firebase/util@1.15.0, @google/genai@2.8.0,         â
â   to run scripts.                                                            â
(node:3077) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
const error = new requestError.RequestError(toErrorMessage(data), status, {
RequestError [HttpError]: No server is currently available to service your request. Sorry about that. Please try resubmitting your request and contact us if the problem persists.
url: 'https://api.github.com/repos/arii/tech-dancer/pulls/3863/commits',
message: 'No server is currently available to service your request. Sorry about that. Please try resubmitting your request and contact us if the problem persists.'
url: 'https://api.github.com/repos/arii/tech-dancer/pulls/3863/commits',
  ```
  </details>
- ✅ **Anti-Pattern Audit**: completed (success)
- ✅ **Lint & Type Check**: completed (success)
- ✅ **verify-changes / FOUNDATIONAL GATE: Checks for actual code modifications**: completed (success)

## Files Changed
- 🟡 `.github/workflows/update-submodule.yml`

## Diffs

### `.github/workflows/update-submodule.yml` (modified)
```diff
@@ -46,15 +46,27 @@ jobs:
  46 |         id: target
  47 |         env:
  48 |           INPUT_REF: ${{ github.event.inputs.ref }}
  49 |+          EVENT_NAME: ${{ github.event_name }}
  50 |         run: |
     |-          TARGET_REF="${INPUT_REF:-main}"
  51 |+          # Sanitize INPUT_REF to prevent command injection and invalid branch names
  52 |+          SANITIZED_INPUT_REF=$(echo "$INPUT_REF" | tr -cd '[:alnum:]_./-')
  53 |+
  54 |+          if [[ "$EVENT_NAME" == "workflow_dispatch" && -n "$SANITIZED_INPUT_REF" ]]; then
  55 |+            TARGET_REF="$SANITIZED_INPUT_REF"
  56 |+          else
  57 |+            TARGET_REF="main"
  58 |+          fi
  59 |           echo "target_ref=$TARGET_REF" >> "$GITHUB_OUTPUT"
  60 |
     |-          # Replace slashes with hyphens for safe branch name
     |-          SAFE_REF=$(echo "$TARGET_REF" | tr '/' '-')
  61 |+          if [[ "$TARGET_REF" == "main" ]]; then
  62 |+            SAFE_REF="main"
  63 |+          else
  64 |+            # Replace slashes with hyphens for safe branch name
  65 |+            SAFE_REF=$(echo "$TARGET_REF" | tr '/' '-')
  66 |
     |-          # Further sanitize to ensure a valid branch name
     |-          SAFE_REF=$(echo "$SAFE_REF" | tr -cd '[:alnum:]_.-')
  67 |+            # Further sanitize to ensure a valid branch name
  68 |+            SAFE_REF=$(echo "$SAFE_REF" | tr -cd '[:alnum:]_.-')
  69 |+          fi
  70 |
  71 |           echo "safe_ref=$SAFE_REF" >> "$GITHUB_OUTPUT"
  72 |         shell: bash
```