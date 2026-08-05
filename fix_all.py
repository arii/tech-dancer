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
  "github/codeql-action/init": "v3",
  "github/codeql-action/analyze": "v3",
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

    # Replace setup-workspace with setup-node
    content = re.sub(
        r'uses:\s*arii/boomtick/\.github/actions/setup-workspace@main[^\n]*\n(\s*with:[^\n]*\n)?(\s*node-version-file:[^\n]*\n)?(\s*cache:[^\n]*\n)?',
        r'uses: actions/setup-node@v7\n        with:\n          node-version-file: \'.node-version\'\n          cache: \'pnpm\'\n',
        content
    )

    # Check if there are other uses of actions/setup-node that might need update
    content = re.sub(
        r'uses:\s*actions/setup-node@v[0-9]+[^\n]*\n(\s*with:[^\n]*\n)?(\s*node-version:[^\n]*\n)?(\s*node-version-file:[^\n]*\n)?(\s*cache:[^\n]*\n)?',
        r'uses: actions/setup-node@v7\n        with:\n          node-version-file: \'.node-version\'\n          cache: \'pnpm\'\n',
        content
    )

    # replace npm ci / npm install with pnpm install
    content = re.sub(r'\bnpm\s+ci\b', 'pnpm install', content)
    content = re.sub(r'\bnpm\s+install\b', 'pnpm install', content)
    content = re.sub(r'\bnpm\s+run\b', 'pnpm run', content)

    # replace yarn
    content = re.sub(r'\byarn\s+install\b', 'pnpm install', content)
    content = re.sub(r'\byarn\s+', 'pnpm ', content)

    # Update uses: versions
    for action, version in versions.items():
        pattern = r'uses:\s*' + re.escape(action) + r'@[a-zA-Z0-9_.-]+'
        content = re.sub(pattern, f'uses: {action}@{version}', content)

    # Replace codeql-action manually
    content = re.sub(r'uses:\s*github/codeql-action/(init|analyze)@[a-zA-Z0-9_.-]+', r'uses: github/codeql-action/\1@codeql-bundle-v2.26.2', content)

    with open(filename, 'w') as f:
        f.write(content)

for f_name in os.listdir('.github/workflows'):
    if f_name.endswith('.yml'):
        fix_file(os.path.join('.github/workflows', f_name))

print("Fixes applied.")
