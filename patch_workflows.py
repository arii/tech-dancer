import os
import glob

concurrency_template = """
concurrency:
  group: ${{ github.workflow }}-${{ github.event.issue.number || github.ref }}
  cancel-in-progress: true
"""

files_to_patch = [
    ".github/workflows/ai-chatops.yml",
    ".github/workflows/issue_to_pr.yml",
    ".github/workflows/validate_issue.yml"
]

for file_path in files_to_patch:
    with open(file_path, 'r') as f:
        content = f.read()

    if "concurrency:" not in content:
        # insert after permissions block
        if "permissions:" in content:
            parts = content.split("permissions:")
            # find end of permissions block (next top level key)
            rest = parts[1]
            lines = rest.split("\n")
            end_idx = 0
            for i, line in enumerate(lines[1:], 1):
                if line and not line.startswith(" ") and not line.startswith("\t"):
                    end_idx = i
                    break

            if end_idx > 0:
                new_rest = "\n".join(lines[:end_idx]) + "\n" + concurrency_template + "\n".join(lines[end_idx:])
                new_content = parts[0] + "permissions:" + new_rest

                with open(file_path, 'w') as f:
                    f.write(new_content)
                print(f"Patched {file_path}")
