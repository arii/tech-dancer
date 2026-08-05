import os
import re

versions = {
  "actions/checkout": "v4",
  "actions/setup-node": "v4",
  "actions/setup-python": "v5",
  "actions/cache": "v4",
  "actions/upload-artifact": "v4",
  "actions/download-artifact": "v4",
  "actions/create-github-app-token": "v1",
  "actions/github-script": "v7",
  "peter-evans/create-pull-request": "v6",
  "peter-evans/create-or-update-comment": "v4",
  "googleapis/release-please-action": "v4",
  "docker/setup-buildx-action": "v3",
  "docker/metadata-action": "v5",
  "docker/login-action": "v3",
  "docker/build-push-action": "v6",
  "gitleaks/gitleaks-action": "v2",
  "VeyronSakai/conflict-resolver": "v0"
}

def fix_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Add FORCE_JAVASCRIPT_ACTIONS_TO_NODE24 to `env` at root
    if "FORCE_JAVASCRIPT_ACTIONS_TO_NODE24:" not in content and "env:" in content:
        content = re.sub(r'\nenv:\n', '\nenv:\n  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true\n', content, count=1)
    elif "FORCE_JAVASCRIPT_ACTIONS_TO_NODE24:" not in content and "on:" in content:
        content = re.sub(r'(\non:[^\n]*\n)', r'\1env:\n  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true\n', content, count=1)

    # We cannot REMOVE setup-workspace! The test mandates it must be `arii/boomtick/.github/actions/setup-workspace@main`.
    # BUT the instructions say: "All workflows must use actions/setup-node with node-version-file: '.node-version'".
    # Wait, maybe `setup-workspace` is a local composite action and we can update `setup-workspace` to use `actions/setup-node`?
    # No, `setup-workspace` is in a submodule `arii/boomtick`!
    # But wait, the issue explicitly says:
    # "All workflows must use actions/setup-node with node-version-file: '.node-version'. Do NOT hardcode Node.js versions (e.g. node-version: 24.16.0 or node-version: '24.x') directly in workflow files."

    # Wait, the unit test `tests/unit/workflowActionsRef.test.ts` CHECKS for `setup-workspace@main`.
    # Can we just update the test?
    # Yes! We can update the test to check for `actions/setup-node` instead of `setup-workspace`!

    def replacer(match):
        block = match.group(0)
        has_python = 'setup-python: true' in block

        replacement = "      - name: Install pnpm\n        uses: pnpm/action-setup@v4\n        with:\n          version: 10\n"
        replacement += "      - name: Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version-file: '.node-version'\n          cache: 'pnpm'\n"
        if has_python:
            replacement += "      - name: Setup Python\n        uses: actions/setup-python@v5\n        with:\n          python-version: '3.12'\n"
        return replacement

    content = re.sub(
        r'      - name: Setup Workspace\n\s+uses: arii/boomtick/\.github/actions/setup-workspace@main[^\n]*\n(\s+with:\n)?(\s+[a-zA-Z0-9_-]+:.*\n)*',
        replacer,
        content
    )

    # Update uses: versions
    for action, version in versions.items():
        pattern = r'uses:\s*' + re.escape(action) + r'@[a-zA-Z0-9_.-]+'
        content = re.sub(pattern, f'uses: {action}@{version}', content)

    # Replace codeql-action manually to major version v3
    content = re.sub(r'uses:\s*github/codeql-action/init@[a-zA-Z0-9_.-]+', r'uses: github/codeql-action/init@v3', content)
    content = re.sub(r'uses:\s*github/codeql-action/analyze@[a-zA-Z0-9_.-]+', r'uses: github/codeql-action/analyze@v3', content)

    # replace npm ci / npm install with pnpm install
    content = re.sub(r'\bnpm\s+ci\b', 'pnpm install', content)
    content = re.sub(r'\bnpm\s+install\b', 'pnpm install', content)
    content = re.sub(r'\bnpm\s+run\b', 'pnpm run', content)

    # replace yarn
    content = re.sub(r'\byarn\s+install\b', 'pnpm install', content)
    content = re.sub(r'\byarn\s+', 'pnpm ', content)

    with open(filename, 'w') as f:
        f.write(content)

for f_name in os.listdir('.github/workflows'):
    if f_name.endswith('.yml'):
        fix_file(os.path.join('.github/workflows', f_name))

print("Fixes applied.")
