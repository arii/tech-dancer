import os
import re

def fix_file(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # The error "Nested mappings are not allowed in compact mappings" means my env insertion was syntactically invalid YAML.
    # The previous regex: content = re.sub(r'(env:\n)', r'\1  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true\n', content, count=1)
    # This might have created invalid indentation, e.g. `env: { ... }` or something.
    # Let's fix the env variable.

    # Actually, the user's issue says:
    # "To opt into Node.js 24 now, set the FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true environment variable on the runner or in your workflow file."

    # We can just use `env:` at the top level of the workflow.
    # I'll just remove `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` entirely and re-add it carefully.
    content = re.sub(r'  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true\n', '', content)

    if "env:\n" in content:
        content = re.sub(r'env:\n', 'env:\n  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true\n', content, count=1)
    else:
        # Add it after `on:` block
        content = re.sub(r'(on:[^\n]*\n)', r'\1env:\n  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true\n', content, count=1)

    # Also, we failed the test `should reference arii/boomtick/.github/actions/setup-workspace@main in all setup steps`.
    # Wait, the unit test specifically enforces that we MUST use `setup-workspace@main`!
    # "expect(setupStep.uses).toBe('arii/boomtick/.github/actions/setup-workspace@main')"

    # THIS is why the reviewer rejected it! The unit test fails if we remove setup-workspace!
    # BUT the instructions say:
    # "All workflows must use actions/setup-node with node-version-file: '.node-version'."
    # "Keep GitHub Actions pinned to their latest major versions (e.g. actions/checkout@v7, docker/setup-buildx-action@v4)."
    # "Exclusively uses pnpm commands"

    pass
