import sys
import re

with open(".github/workflows/auto-conflict-resolver.yml", "r") as f:
    content = f.read()

# Fix 1: Random EOF for GITHUB_ENV injection
content = content.replace(
"""          # Read cleanly via jq and write to environment file securely using EOF
          {
            echo 'SOURCE<<EOF'""",
"""          EOF=$(dd if=/dev/urandom bs=15 count=1 status=none | base64)

          # Read cleanly via jq and write to environment file securely using randomized EOF
          {
            echo "SOURCE<<$EOF\"""")

content = re.sub(r"echo 'EOF'", "echo \"$EOF\"", content)
content = re.sub(r"echo 'TARGET<<EOF'", "echo \"TARGET<<$EOF\"", content)
content = re.sub(r"echo 'HEAD_REPO<<EOF'", "echo \"HEAD_REPO<<$EOF\"", content)
content = re.sub(r"echo 'ORIGINAL_TITLE<<EOF'", "echo \"ORIGINAL_TITLE<<$EOF\"", content)
content = re.sub(r"echo 'ORIGINAL_BODY<<EOF'", "echo \"ORIGINAL_BODY<<$EOF\"", content)

# Fix 2: Add actions: write permission
content = content.replace(
"""    permissions:
      contents: write
      pull-requests: write""",
"""    permissions:
      contents: write
      pull-requests: write
      actions: write""")

# Fix 3: Handle null body
content = content.replace(
"""          PR_TITLE="[Auto-Resolved] ${ORIGINAL_TITLE:-"Auto-resolve merge conflicts from ${TARGET} for ${SOURCE}"}"
          PR_BODY="${ORIGINAL_BODY:-"This PR suggests a resolution for the merge conflicts."}""",
"""          if [ "$ORIGINAL_BODY" = "null" ] || [ -z "$ORIGINAL_BODY" ]; then
            ORIGINAL_BODY="This PR suggests a resolution for the merge conflicts."
          fi

          PR_TITLE="[Auto-Resolved] ${ORIGINAL_TITLE:-"Auto-resolve merge conflicts from ${TARGET} for ${SOURCE}"}"
          PR_BODY="$ORIGINAL_BODY""")

with open(".github/workflows/auto-conflict-resolver.yml", "w") as f:
    f.write(content)
