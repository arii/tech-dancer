import os
import re
import sys
from typing import Optional, List, Tuple, Union
from collections import defaultdict

# Import run_command from utils
from utils import run_command

# Use existing github_utils if possible, but we'll add common repo walking/matching logic here
def walk_tsx(root_dir='src'):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx'):
                yield os.path.join(root, file)

def find_patterns_in_file(filepath, patterns):
    """
    patterns: List of (regex_str, message)
    Returns: List of (line_num, message, match_str)
    """
    findings = []
    with open(filepath, 'r') as f:
        content = f.read()
        lines = content.split('\n')
        for i, line in enumerate(lines):
            for pattern, message in patterns:
                match = re.search(pattern, line)
                if match:
                    findings.append((i + 1, message, match.group()))
    return findings

def get_bundle_size(dist_dir='dist/assets'):
    """Returns bundle size in KB."""
    if not os.path.exists(dist_dir):
        print(f"⚠️  Warning: Directory not found: {dist_dir}", file=sys.stderr)
        return 0

    total_size = 0
    try:
        for f in os.listdir(dist_dir):
            if f.endswith('.js'):
                total_size += os.path.getsize(os.path.join(dist_dir, f))
    except Exception as e:
        print(f"⚠️  Warning: Failed to calculate bundle size: {e}", file=sys.stderr)
        return 0

    return total_size // 1024

def get_any_count(search_dir='src'):
    """Returns count of 'any' usages in TS/TSX files."""
    if not os.path.exists(search_dir):
        print(f"⚠️  Warning: Directory not found: {search_dir}", file=sys.stderr)
        return 0

    import shlex
    safe_dir = shlex.quote(search_dir)
    # Using check=False because grep exits non-zero on no matches
    cmd = f"grep -rn ': any\\b\\|as any\\b' {safe_dir} --include='*.tsx' --include='*.ts' | wc -l"
    res = run_command(cmd, shell=True, check=False)

    if res.returncode != 0:
        # If wc -l failed (unlikely) or other shell error
        return 0

    try:
        return int(res.stdout.strip() or 0)
    except ValueError:
        return 0
