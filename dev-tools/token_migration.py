#!/usr/bin/env python3
"""
token_migration.py

Finds and replaces stale design token references in .tsx files.
Usage: python3 dev-tools/token_migration.py --find "accent-brand" --suggest "accent"
       python3 dev-tools/token_migration.py --migrate "text-accent-brand" "text-accent" --dry-run
"""

import os
import argparse
import re

def walk_tsx(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx'):
                yield os.path.join(root, file)

def find_token(token, root_dir):
    print(f"🔍 Searching for token: {token}")
    found_count = 0
    for filepath in walk_tsx(root_dir):
        with open(filepath, 'r') as f:
            content = f.read()
            if token in content:
                found_count += 1
                lines = content.split('\n')
                for i, line in enumerate(lines):
                    if token in line:
                        print(f"  {filepath}:{i+1}: {line.strip()}")
    print(f"\nTotal files with token: {found_count}")

def migrate_token(old, new, root_dir, dry_run=True):
    action = "[DRY-RUN] Would replace" if dry_run else "[EXECUTE] Replacing"
    print(f"{action} `{old}` with `{new}`")

    modified_count = 0
    for filepath in walk_tsx(root_dir):
        with open(filepath, 'r') as f:
            content = f.read()

        if old in content:
            modified_count += 1
            new_content = content.replace(old, new)
            if not dry_run:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"  ✅ Updated: {filepath}")
            else:
                print(f"  📝 Match in: {filepath}")

    print(f"\nTotal files modified: {modified_count}")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--find', help='Token to search for')
    parser.add_argument('--suggest', help='Suggested replacement (for display only)')
    parser.add_argument('--migrate', nargs=2, metavar=('OLD', 'NEW'), help='Migrate OLD token to NEW')
    parser.add_argument('--dry-run', action='store_true', default=False)
    args = parser.parse_args()

    root_dir = 'src'

    if args.find:
        find_token(args.find, root_dir)
        if args.suggest:
            print(f"Suggested replacement: {args.suggest}")
    elif args.migrate:
        migrate_token(args.migrate[0], args.migrate[1], root_dir, args.dry_run)
    else:
        parser.print_help()

if __name__ == '__main__':
    main()
