file_path = ".github/workflows/validate_issue.yml"
with open(file_path, 'r') as f:
    content = f.read()

concurrency_template = """
concurrency:
  group: ${{ github.workflow }}-${{ github.event.issue.number || github.ref }}
  cancel-in-progress: true
"""

parts = content.split("jobs:")
new_content = parts[0] + concurrency_template + "\njobs:" + parts[1]

with open(file_path, 'w') as f:
    f.write(new_content)
