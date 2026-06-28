import os
import sys
import re
import json
import argparse
from typing import Dict, List, Optional, Tuple

# Standardize pathing for robust imports
try:
    from utils.path import setup_cli_paths
    setup_cli_paths()
except ImportError:
    _current_dir = os.path.dirname(os.path.abspath(__file__))
    _dev_tools_dir = os.path.join(_current_dir, "dev_tools")
    for _path in [_current_dir, _dev_tools_dir]:
        if _path not in sys.path:
            sys.path.insert(0, _path)

from utils import (
    get_stack_versions,
    log_info,
    log_error,
    log_warn,
    fetch_latest_npm,
    fetch_latest_gh_action,
    compare_versions
)

def parse_diff(diff_text: str) -> List[Dict]:
    """Parses a git diff to find version changes."""
    changes = []

    # Regex patterns
    ACTION_PATTERN = re.compile(r"uses:\s+([\w\-/]+)@([\w\.]+)")
    PKG_JSON_VERSION_PATTERN = re.compile(r'"(node|pnpm|[\w\-\./@]+)":\s*"([\d\.\^x~<>=\| v\*\+]+)"')
    PM_PATTERN = re.compile(r'"packageManager":\s*"pnpm@([\d\.]+)"')

    # Files we care about
    SENSITIVE_FILES = [".nvmrc", ".node-version", "package.json"]
    SENSITIVE_DIRS = [".github/workflows/"]

    # Split by standard git diff file markers
    files_diffs = re.split(r"^diff --git ", diff_text, flags=re.MULTILINE)

    for file_diff in files_diffs:
        if not file_diff.strip(): continue

        lines = file_diff.splitlines()
        current_file = None
        for line in lines:
            if line.startswith("--- a/"):
                current_file = line[6:]
                break
            elif line.startswith("+++ b/"):
                current_file = line[6:]
                break

        # Fallback for diffs that don't start with --- a/
        if not current_file:
            m = re.search(r"^\+\+\+ (?:b/)?([^\s]+)", file_diff, re.MULTILINE)
            if m:
                current_file = m.group(1)

        if not current_file:
            continue

        is_sensitive = (current_file in SENSITIVE_FILES or
                        any(current_file.startswith(sd) for sd in SENSITIVE_DIRS))
        if not is_sensitive:
            continue

        removals = {} # name -> version
        additions = {} # name -> version

        for line in lines:
            if line.startswith("--- ") or line.startswith("+++ ") or line.startswith("@@ "):
                continue

            if line.startswith("-"):
                content = line[1:].strip()
                # Check Actions
                m = ACTION_PATTERN.search(content)
                if m: removals[m.group(1)] = m.group(2)
                # Check Dependencies
                m = PKG_JSON_VERSION_PATTERN.search(content)
                if m: removals[m.group(1)] = m.group(2)
                # Check pnpm
                m = PM_PATTERN.search(content)
                if m: removals["pnpm"] = m.group(1)
                # Check node files
                if current_file and (current_file.endswith(".nvmrc") or current_file.endswith(".node-version")):
                    ver_match = re.search(r"([\d\.]+)", content)
                    if ver_match:
                        removals["node"] = ver_match.group(1)

            elif line.startswith("+"):
                content = line[1:].strip()
                m = ACTION_PATTERN.search(content)
                if m: additions[m.group(1)] = m.group(2)
                m = PKG_JSON_VERSION_PATTERN.search(content)
                if m: additions[m.group(1)] = m.group(2)
                m = PM_PATTERN.search(content)
                if m: additions["pnpm"] = m.group(1)
                if current_file and (current_file.endswith(".nvmrc") or current_file.endswith(".node-version")):
                    ver_match = re.search(r"([\d\.]+)", content)
                    if ver_match:
                        additions["node"] = ver_match.group(1)

        # Correlate changes
        for name, new_v in additions.items():
            old_v = removals.get(name, "unknown")
            type_val = "action" if "/" in name and "pnpm" not in name else "dependency"
            if name == "node" or current_file in [".nvmrc", ".node-version"]: type_val = "runtime"

            changes.append({
                "file": current_file,
                "type": type_val,
                "name": name,
                "old": old_v,
                "new": new_v
            })

    return changes

def verify_changes(changes: List[Dict]) -> List[Dict]:
    """Verifies changes against HEAD and registries."""
    findings = []
    stack = get_stack_versions()

    for c in changes:
        # 1. Compare against HEAD (Downgrade detection)
        head_v = stack.get(c["name"])
        if not head_v and c["name"] == "node": head_v = stack.get("node")
        if not head_v and c["name"] == "pnpm": head_v = stack.get("pnpm")

        if head_v:
            if compare_versions(c["new"], head_v) < 0:
                findings.append({
                    "severity": "error",
                    "file": c["file"],
                    "name": c["name"],
                    "head_version": head_v,
                    "proposed_version": c["new"],
                    "message": f"Version downgrade detected for {c['name']}: {head_v} -> {c['new']}",
                    "type": "downgrade"
                })

        # 2. Compare against Latest (Outdated detection - optional warning)
        from utils import fetch_latest_node # Import node fetcher
        latest = None
        if c["name"] == "node":
            latest = fetch_latest_node()
        elif c["type"] == "action":
            latest = fetch_latest_gh_action(c["name"])
        elif c["name"] in ["pnpm"] or c["type"] == "dependency":
             latest = fetch_latest_npm(c["name"])

        if latest:
            if compare_versions(c["new"], latest) < 0:
                findings.append({
                    "severity": "warn",
                    "file": c["file"],
                    "name": c["name"],
                    "latest_version": latest,
                    "proposed_version": c["new"],
                    "message": f"Proposed version for {c['name']} ({c['new']}) is outdated. Latest is {latest}.",
                    "type": "outdated"
                })

        # 3. Node.js Hard Block
        if c["name"] == "node":
             # Only trigger hard block if the version is ACTUALLY changing from HEAD
             if head_v and compare_versions(c["new"], head_v) != 0:
                 if os.environ.get("ALLOW_NODE_VERSION_CHANGE") != "true":
                     findings.append({
                        "severity": "error",
                        "file": c["file"],
                        "name": c["name"],
                        "message": f"Hard block: Node.js version modification detected ({head_v} -> {c['new']}). Modification is forbidden unless ALLOW_NODE_VERSION_CHANGE=true.",
                        "type": "hard_block"
                    })

    return findings

def fix_content(filepath: str, content: str, findings: List[Dict]) -> str:
    """Automatically reverts downgrades in the given content string."""
    new_content = content
    relevant_findings = [f for f in findings if f["file"] == filepath and f["type"] == "downgrade"]

    for f in relevant_findings:
        name = f["name"]
        old_v = f["head_version"]
        new_v = f["proposed_version"]

        if name == "node" and (filepath.endswith(".nvmrc") or filepath.endswith(".node-version")):
            # Entire file is likely the version
            if new_v in new_content:
                 new_content = new_content.replace(new_v, old_v)
        elif name == "pnpm" and '"packageManager":' in new_content:
             new_content = new_content.replace(f"pnpm@{new_v}", f"pnpm@{old_v}")
        else:
             # Standard "name": "version" or uses: name@version
             patterns = [
                 (rf'"{re.escape(name)}":\s*"{re.escape(new_v)}"', f'"{name}": "{old_v}"'),
                 (rf'uses:\s+{re.escape(name)}@{re.escape(new_v)}', f'uses: {name}@{old_v}')
             ]
             for pattern, replacement in patterns:
                 new_content = re.sub(pattern, replacement, new_content)

    return new_content

def verify_file_content(filepath: str, content: str) -> List[Dict]:
    """Validates a file's content without a diff by synthesizing a 'mock' diff against empty."""
    mock_diff = f"--- a/{filepath}\n+++ b/{filepath}\n"
    for line in content.splitlines():
        mock_diff += f"+{line}\n"

    changes = parse_diff(mock_diff)
    return verify_changes(changes)

def main():
    parser = argparse.ArgumentParser(description="Verify version changes for downgrades or hard blocks.")
    parser.add_argument("input", help="Path to diff file, file to check, or raw diff text.")
    parser.add_argument("--fix", action="store_true", help="Automatically revert detected downgrades.")
    args = parser.parse_args()

    input_val = args.input
    is_file = os.path.isfile(input_val)

    if is_file:
        with open(input_val, "r") as f:
            content = f.read()

        if "diff --git" in content or "--- a/" in content:
            # It's a diff file
            changes = parse_diff(content)
            findings = verify_changes(changes)
        else:
            # It's a single file to validate
            findings = verify_file_content(input_val, content)
            if args.fix and any(f["type"] == "downgrade" for f in findings):
                fixed = fix_content(input_val, content, findings)
                if fixed != content:
                    with open(input_val, "w") as f:
                        f.write(fixed)
                    log_info(f"✅ Reverted downgrades in {input_val}")
                    # Re-verify after fix
                    findings = verify_file_content(input_val, fixed)
    else:
        # It's raw text (likely a diff)
        changes = parse_diff(input_val)
        findings = verify_changes(changes)

    if findings:
        print(json.dumps(findings, indent=2))
        if any(f["severity"] == "error" for f in findings):
            sys.exit(1)
    else:
        print(json.dumps([], indent=2))

    sys.exit(0)

if __name__ == "__main__":
    main()
