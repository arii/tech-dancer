import re

content = """
    steps:
      - name: Checkout
        uses: actions/checkout@v6 # nosemgrep: yaml.github-actions.security.github-actions-mutable-action-tag.github-actions-mutable-action-tag

      - name: Setup Workspace
        uses: arii/boomtick/.github/actions/setup-workspace@main # nosemgrep: yaml.github-actions.security.github-actions-mutable-action-tag.github-actions-mutable-action-tag
        with:
          node-version-file: '.node-version'

      - name: Install dependencies
        run: npm ci
"""

# Replace setup-workspace with setup-node
content = re.sub(
    r'uses:\s*arii/boomtick/\.github/actions/setup-workspace@main(\s*#\s*nosemgrep.*)?\s*(with:\s*node-version-file:[^\n]*)?',
    r'uses: actions/setup-node@v7\n        with:\n          node-version-file: \'.node-version\'\n          cache: \'pnpm\'',
    content
)

content = re.sub(r'\bnpm\b', 'pnpm', content)

print(content)
