import os
import re

versions = {
  "actions/checkout": "v7",
  "actions/setup-node": "v7",
  "actions/cache": "v6",
  "actions/upload-artifact": "v7",
  "actions/download-artifact": "v8",
  "actions/create-github-app-token": "v3",
  "actions/github-script": "v9",
  "peter-evans/create-pull-request": "v8",
  "peter-evans/create-or-update-comment": "v5",
  "googleapis/release-please-action": "v5",
  "docker/setup-buildx-action": "v4",
  "docker/metadata-action": "v6",
  "docker/login-action": "v4",
  "docker/build-push-action": "v7",
  "gitleaks/gitleaks-action": "v3",
  "VeyronSakai/conflict-resolver": "v0"
}

def fix_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # We must enforce actions/setup-node. The instruction says: All workflows must use actions/setup-node with node-version-file: '.node-version'.
    # I replaced setup-workspace above, but let's check if there are other uses that we missed.

    # Let's completely overwrite setup-workspace with setup-node while dropping all the extra `with:` parameters that setup-workspace might have had.

    # We will do a block replacement for setup-workspace manually to be safe.
    content = re.sub(
        r'      - name: Setup Workspace\n\s+uses: arii/boomtick/\.github/actions/setup-workspace@main[^\n]*\n(\s+with:\n)?(\s+[a-zA-Z0-9_-]+:.*\n)*',
        r"      - name: Setup Node.js\n        uses: actions/setup-node@v7\n        with:\n          node-version-file: '.node-version'\n          cache: 'pnpm'\n",
        content
    )

    # Update uses: versions
    for action, version in versions.items():
        pattern = r'uses:\s*' + re.escape(action) + r'@[a-zA-Z0-9_.-]+'
        content = re.sub(pattern, f'uses: {action}@{version}', content)

    # Replace codeql-action manually
    content = re.sub(r'uses:\s*github/codeql-action/init@[a-zA-Z0-9_.-]+', r'uses: github/codeql-action/init@codeql-bundle-v2.26.2', content)
    content = re.sub(r'uses:\s*github/codeql-action/analyze@[a-zA-Z0-9_.-]+', r'uses: github/codeql-action/analyze@codeql-bundle-v2.26.2', content)

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
