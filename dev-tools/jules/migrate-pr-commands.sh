#!/bin/bash
# Script to automatically update npm commands to pnpm in open PRs
# Note when rebasing we will likely have merge issues due to package-lock.json
# if no dependencies are changed you can do:
# git checkout  origin/leader -- package.json
# git rm package-lock.json  package.json.patch
# scripts/setup.sh

set -e

PR_NUMBERS=(273 314 315 323)  # Major PRs that need updating

for PR in "${PR_NUMBERS[@]}"; do
    echo "🔄 Processing PR #$PR..."

    # Get PR branch name
    BRANCH=$(gh pr view $PR --json headRefName --jq '.headRefName')

    if [ -z "$BRANCH" ]; then
        echo "❌ Could not get branch name for PR #$PR"
        continue
    fi

    echo "📋 Branch: $BRANCH"

    # Switch to PR branch
    git fetch origin "$BRANCH"
    git checkout "$BRANCH"
    
    # Initialize submodule
    git submodule update --init --recursive

    # Navigate into the submodule directory
    cd hrm || { echo "❌ Could not find hrm submodule directory"; continue; }

    # Update package.json scripts (if they exist)
    if [ -f "package.json" ]; then
        echo "📦 Updating package.json scripts..."
        sed -i 's/npm run /pnpm run /g' package.json
        sed -i 's/npm version/pnpm version/g' package.json
        sed -i 's/npm install/pnpm install/g' package.json
    fi

    # Update shell scripts
    for file in $(find . -name "*.sh" -type f); do
        if grep -q "npm run\|npm install\|npm ci" "$file"; then
            echo "🔧 Updating $file..."
            sed -i 's/npm run /pnpm run /g' "$file"
            sed -i 's/npm install/pnpm install/g' "$file"
            sed -i 's/npm ci/pnpm install --frozen-lockfile/g' "$file"
        fi
    done

    # Update README and docs
    for file in README.md docs/*.md *.md; do
        if [ -f "$file" ] && grep -q "npm run\|npm install" "$file"; then
            echo "📝 Updating $file..."
            sed -i 's/npm run /pnpm run /g' "$file"
            sed -i 's/npm install/pnpm install/g' "$file"
            sed -i 's/npm ci/pnpm install --frozen-lockfile/g' "$file"
        fi
    done

    # Check if changes were made
    if [ -n "$(git status --porcelain)" ]; then
        git add .
        git commit -m "chore: migrate npm commands to pnpm

- Update package.json scripts: npm run → pnpm run
- Update shell scripts: npm install → pnpm install
- Update documentation: npm commands → pnpm commands
- Ensure consistency with PR #294 pnpm enforcement"

        git push origin "$BRANCH"
        echo "✅ PR #$PR updated successfully"

        # Add comment to PR
        gh pr comment $PR --body "🔄 **Auto-migrated to pnpm**

This PR has been automatically updated to use pnpm commands instead of npm to maintain consistency with the new package manager enforcement (PR #294).

**Changes made:**
- \`npm run\` → \`pnpm run\`
- \`npm install\` → \`pnpm install\`
- \`npm ci\` → \`pnpm install --frozen-lockfile\`

All functionality should remain identical."
    else
        echo "ℹ️  PR #$PR: No npm commands found to update"
    fi
    
    # Navigate back to the workspace root
    cd ..

    echo "---"
done

# Return to leader branch
git checkout leader
echo "🎉 Migration complete! All PRs updated to use pnpm."
