import os
import re
import subprocess
import sys
from typing import Optional, List, Tuple, Union
from collections import defaultdict

# Import execute from utils
from utils import execute

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
    # Avoid 2>/dev/null to see errors if dir doesn't exist
    # If this fails, let the CLIError bubble up to identify environment issues
    cmd = f"du -sk {dist_dir}/*.js | awk '{{sum+=$1}} END{{print sum}}'"
    result = execute(cmd, shell=True)
    return int(result) if result else 0

def get_any_count(search_dir='src'):
    """Returns count of 'any' usages in TS/TSX files."""
    # If grep fails (e.g. directory missing), let the CLIError bubble up
    cmd = f"grep -rn ': any\\b\\|as any\\b' {search_dir} --include='*.tsx' --include='*.ts' | wc -l"
    result = execute(cmd, shell=True)
    return int(result) if result else 0
