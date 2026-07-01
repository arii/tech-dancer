import os
import sys
from typing import List, Optional, Set

try:
    from dev_tools.utils import log_info, verify_pr_scope
except ImportError:
    def log_info(msg): print(msg, file=sys.stderr)
    def verify_pr_scope(file_list=None): return None

if __name__ == "__main__":
    # If run as a script, it expects file names as arguments or via stdin
    # If no arguments/stdin, it auto-detects changed files in the repo
    files = sys.argv[1:]
    if not files and not sys.stdin.isatty():
        files = sys.stdin.read().splitlines()

    if not files:
        warning = verify_pr_scope()
    else:
        warning = verify_pr_scope(files)

    if warning:
        log_info(warning)
        sys.exit(1)
    sys.exit(0)
