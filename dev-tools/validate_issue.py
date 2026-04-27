#!/usr/bin/env python3
"""
validate_issue.py

Validates a GitHub Issue against repo standards before an agent works on it.
Checks for:
  1. Tailwind violations in code snippets (arbitrary values, raw layout classes)
  2. Suggestions to rebuild existing components
  3. Banned patterns (HashRouter, import React, inline styles)
  4. Missing required frontmatter fields for content issues
  5. Token compliance in suggested code
  6. References to outdated APIs or deprecated patterns

Usage: python3 dev-tools/validate_issue.py <ISSUE_NUMBER>
       python3 dev-tools/validate_issue.py --all-open
"""
import sys
import re
import argparse
from github_utils import get_github_token, get_repo_name
from github import Github

# Known existing components — agents should use these, not recreate them
EXISTING_COMPONENTS = {
    'Box': 'src/layouts/Box.tsx',
    'Stack': 'src/layouts/Stack.tsx',
    'Grid': 'src/layouts/Grid.tsx',
    'Text': 'src/layouts/Text.tsx',
    'Button': 'src/layouts/Button.tsx',
    'ContentCard': 'src/components/ui/ContentCard.tsx',
    'PageHeader': 'src/components/ui/PageHeader.tsx',
    'FilterBar': 'src/components/ui/FilterBar.tsx',
    'FolioGrid': 'src/components/ui/FolioGrid.tsx',
    'Skeleton': 'src/components/ui/Skeleton.tsx',
    'ViewToggle': 'src/components/ui/ViewToggle.tsx',
    'ListRow': 'src/components/ui/ListRow.tsx',
    'MarkdownRenderer': 'src/components/ui/MarkdownRenderer.tsx',
    'DetailLayout': 'src/components/layout/DetailLayout.tsx',
    'useSearchParam': 'src/hooks/useSearchParam.ts',
    'useHotkeys': 'src/hooks/useHotkeys.ts',
    'safeSearch': 'src/lib/utils.ts',
}

BANNED_PATTERNS = [
    (r'HashRouter', 'HashRouter is banned. Use createBrowserRouter (AGENTS.md §9)'),
    (r'import React from .react.', 'Unnecessary React import — React 17+ (AGENTS.md §4)'),
    (r'style=\{\{', 'Inline styles are banned. Use design tokens (AGENTS.md §11)'),
    (r'text-\[\d+px\]', 'Arbitrary px Tailwind value. Use design tokens (AGENTS.md §1)'),
    (r'bg-\[#', 'Raw hex color in Tailwind. Use CSS variables from tokens.css'),
    (r'<div\s+className=".*?(flex|grid|p-|m-)', 'Raw layout div. Use <Box/>, <Stack/>, <Grid/> primitives (AGENTS.md §3)'),
    (r'className=".*?text-\[\d', 'Arbitrary text size. Use typeSizes from design-tokens.ts'),
]

REQUIRED_FOR_CONTENT_ISSUES = ['type', 'title', 'date', 'author', 'category', 'excerpt']


def extract_code_blocks(text: str) -> list[str]:
    return re.findall(r'```(?:tsx?|jsx?|html)?\n(.*?)```', text, re.DOTALL)


def check_issue(issue, repo) -> dict:
    body = issue.body or ''
    title = issue.title or ''
    findings = []
    warnings = []

    # 1. Check code snippets for violations
    code_blocks = extract_code_blocks(body)
    for i, block in enumerate(code_blocks):
        for pattern, message in BANNED_PATTERNS:
            if re.search(pattern, block):
                findings.append(f"Code block {i+1}: {message}")

        # Check if issue suggests building something that exists
        for component, path in EXISTING_COMPONENTS.items():
            if re.search(rf'(create|build|make|add|new)\s+.*{component}', block, re.IGNORECASE):
                warnings.append(f"Code block {i+1}: Suggests creating `{component}` — it already exists at `{path}`")

    # 2. Check body text for rebuild suggestions
    for component, path in EXISTING_COMPONENTS.items():
        if re.search(rf'(create|build|make|add\s+a\s+new)\s+.*{component}\b', body, re.IGNORECASE):
            warnings.append(f"Issue text suggests creating `{component}` — already exists at `{path}`")

    # 3. Content issues (Draft: prefix) must have required frontmatter
    if title.startswith('Draft:') and '```markdown' in body:
        md_match = re.search(r'```markdown\n(.*?)\n```', body, re.DOTALL)
        if md_match:
            frontmatter = md_match.group(1)
            for field in REQUIRED_FOR_CONTENT_ISSUES:
                if not re.search(rf'^{field}:', frontmatter, re.MULTILINE):
                    findings.append(f"Content issue missing required frontmatter field: `{field}`")

    # 4. Check for missing acceptance criteria
    if not re.search(r'(acceptance criteria|definition of done|## done|verify|test)', body, re.IGNORECASE):
        warnings.append("No acceptance criteria found. Consider adding a 'Verification' or 'Done when' section.")

    # 5. Check for awareness of design system
    if re.search(r'tailwind|className.*flex|className.*grid', body, re.IGNORECASE):
        if not re.search(r'<Box|<Stack|<Grid|primitives|design.tokens', body, re.IGNORECASE):
            warnings.append("Issue mentions Tailwind/className layout but doesn't reference layout primitives (Box/Stack/Grid).")

    return {
        'issue_number': issue_number,
        'title': title,
        'url': issue.html_url,
        'findings': findings,  # Hard violations
        'warnings': warnings,  # Soft warnings
        'valid': len(findings) == 0,
    }


def post_validation_comment(issue, result: dict, dry_run: bool = False):
    if result['valid'] and not result['warnings']:
        return  # Nothing to report

    lines = ['## 🤖 Issue Quality Review\n']

    if result['findings']:
        lines.append('### ❌ Violations (must fix before agent work begins)\n')
        for f in result['findings']:
            lines.append(f'- {f}')
        lines.append('')

    if result['warnings']:
        lines.append('### ⚠️ Warnings (review before implementing)\n')
        for w in result['warnings']:
            lines.append(f'- {w}')

    lines.append('\n---\n*Generated by `dev-tools/validate_issue.py`*')

    comment_body = '\n'.join(lines)

    if dry_run:
        print(f"\n[DRY RUN] Would post comment to #{result['issue_number']}:\n{comment_body}")
    else:
        issue.create_comment(comment_body)
        print(f"✅ Posted validation comment to #{result['issue_number']}")


def main():
    parser = argparse.ArgumentParser(description='Validate GitHub Issues for repo compliance')
    parser.add_argument('issue_number', nargs='?', type=int)
    parser.add_argument('--all-open', action='store_true', help='Validate all open issues')
    parser.add_argument('--post-comments', action='store_true', help='Post findings as issue comments')
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()

    token = get_github_token()
    repo_name = get_repo_name()
    g = Github(token)
    repo = g.get_repo(repo_name)

    issues_to_check = []
    if args.all_open:
        issues_to_check = list(repo.get_issues(state='open'))
    elif args.issue_number:
        issues_to_check = [repo.get_issue(args.issue_number)]
    else:
        print("Specify an issue number or --all-open")
        sys.exit(1)

    total_findings = 0
    for issue in issues_to_check:
        result = check_issue(issue, repo)
        total_findings += len(result['findings'])

        status = '✅' if result['valid'] else '❌'
        warn_str = f" ({len(result['warnings'])} warnings)" if result['warnings'] else ''
        print(f"{status} #{result['issue_number']}: {result['title'][:60]}{warn_str}")

        for f in result['findings']:
            print(f"   ❌ {f}")
        for w in result['warnings']:
            print(f"   ⚠️  {w}")

        if args.post_comments and (result['findings'] or result['warnings']):
            post_validation_comment(issue, result, args.dry_run)

    if total_findings > 0:
        print(f"\n{total_findings} total violations found across {len(issues_to_check)} issues.")
        sys.exit(1)


if __name__ == '__main__':
    main()
