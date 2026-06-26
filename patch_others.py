files_to_patch = [
    ".github/workflows/issue-comment-dispatcher.yml",
    ".github/workflows/jules-fix-trigger.yml",
    ".github/workflows/self-healing.yml",
    ".github/workflows/update-snapshots.yml",
    ".github/workflows/wcs_etl.yml"
]

concurrency_template = """
concurrency:
  group: ${{ github.workflow }}-${{ github.event.issue.number || github.ref }}
  cancel-in-progress: true
"""

for file_path in files_to_patch:
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        if "concurrency:" not in content:
            parts = content.split("jobs:")
            new_content = parts[0] + concurrency_template + "\njobs:" + parts[1]

            with open(file_path, 'w') as f:
                f.write(new_content)
            print(f"Patched {file_path}")
    except Exception as e:
        print(f"Failed to patch {file_path}: {e}")
