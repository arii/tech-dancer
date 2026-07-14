import os
import re

workflows_dir = '.github/workflows'

def update_action_versions(content):
    # Mapping of old versions to new versions based on instructions
    replacements = {
        r'actions/checkout@v[0-9]+': 'actions/checkout@v4',
        r'actions/setup-node@v[0-9]+': 'actions/setup-node@v4',
        r'actions/cache@v[0-9\.]+': 'actions/cache@v4',
        r'docker/setup-buildx-action@v[0-9]+': 'docker/setup-buildx-action@v3', # Correcting to v3 based on latest major
        r'docker/login-action@v[0-9]+': 'docker/login-action@v3', # Correcting to v3 based on latest major
        r'docker/metadata-action@v[0-9]+': 'docker/metadata-action@v5', # Correcting to v5 based on latest major
        r'docker/build-push-action@v[0-9]+': 'docker/build-push-action@v5', # Correcting to v5 based on latest major
        r'peter-evans/create-or-update-comment@v[0-9]+': 'peter-evans/create-or-update-comment@v4',
        r'peter-evans/create-pull-request@v[0-9]+': 'peter-evans/create-pull-request@v6',
        r'actions/upload-artifact@v[0-9]+': 'actions/upload-artifact@v4',
        r'actions/download-artifact@v[0-9]+': 'actions/download-artifact@v4',
        r'actions/github-script@v[0-9]+': 'actions/github-script@v7',
    }
    for old, new in replacements.items():
        content = re.sub(old, new, content)
    return content

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Node.js version compliance
    # Replace node-version: <number> or node-version: '<number>' with node-version-file: '.node-version'
    content = re.sub(r'node-version:\s*[\'"]?[\d\.x]+[\'"]?', 'node-version-file: \'.node-version\'', content)

    # Action Version Pinning
    content = update_action_versions(content)

    # Package Manager Selection
    # Replace npm and yarn with pnpm
    content = re.sub(r'\bnpm run\b', 'pnpm run', content)
    content = re.sub(r'\bnpm install\b', 'pnpm install', content)
    content = re.sub(r'\byarn run\b', 'pnpm run', content)
    content = re.sub(r'\byarn install\b', 'pnpm install', content)
    content = re.sub(r'\bnpm ci\b', 'pnpm install --frozen-lockfile', content)
    content = re.sub(r'\byarn install --frozen-lockfile\b', 'pnpm install --frozen-lockfile', content)

    with open(filepath, 'w') as f:
        f.write(content)

for filename in os.listdir(workflows_dir):
    if filename.endswith('.yml') or filename.endswith('.yaml'):
        filepath = os.path.join(workflows_dir, filename)
        process_file(filepath)
        print(f"Processed {filename}")
