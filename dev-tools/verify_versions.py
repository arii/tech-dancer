import os
import sys
import re
import json
import requests
from packaging import version
from typing import Dict, List, Optional, Tuple

# Add dev-tools to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from utils import get_stack_versions, log_info, log_error, log_warn

# Registry Cache
_NPM_CACHE = {}
_GITHUB_CACHE = {}

def fetch_latest_npm(package_name: str) -> Optional[str]:
    if package_name in _NPM_CACHE:
        return _NPM_CACHE[package_name]
    try:
        url = f"https://registry.npmjs.org/{package_name}/latest"
        res = requests.get(url, timeout=5)
        if res.status_code == 200:
            ver = res.json().get("version")
            _NPM_CACHE[package_name] = ver
            return ver
    except Exception as e:
        log_warn(f"Failed to fetch latest npm version for {package_name}: {e}")
    return None

def fetch_latest_gh_action(action_path: str) -> Optional[str]:
    if action_path in _GITHUB_CACHE:
        return _GITHUB_CACHE[action_path]
    try:
        # actions/checkout -> https://api.github.com/repos/actions/checkout/releases/latest
        url = f"https://api.github.com/repos/{action_path}/releases/latest"
        headers = {}
        token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
        if token:
            headers["Authorization"] = f"token {token}"

        res = requests.get(url, headers=headers, timeout=5)
        if res.status_code == 200:
            tag = res.json().get("tag_name")
            _GITHUB_CACHE[action_path] = tag
            return tag
    except Exception as e:
        log_warn(f"Failed to fetch latest GitHub Action version for {action_path}: {e}")
    return None

def compare_versions(v1: str, v2: str) -> int:
    """Returns 1 if v1 > v2, -1 if v1 < v2, 0 if v1 == v2."""
    try:
        # Strip 'v' prefix
        v1_clean = v1.lstrip('v')
        v2_clean = v2.lstrip('v')

        # Handle '24.x' style versions by normalizing to '24.0.0' for comparison
        if '.x' in v1_clean: v1_clean = v1_clean.replace('.x', '.0')
        if '.x' in v2_clean: v2_clean = v2_clean.replace('.x', '.0')

        pv1 = version.parse(v1_clean)
        pv2 = version.parse(v2_clean)
        if pv1 > pv2: return 1
        if pv1 < pv2: return -1
        return 0
    except Exception:
        # Fallback to string comparison if parse fails
        if v1 > v2: return 1
        if v1 < v2: return -1
        return 0

def parse_diff(diff_text: str) -> List[Dict]:
    """Parses a git diff to find version changes."""
    changes = []
    current_file = None

    # Regex patterns
    ACTION_PATTERN = re.compile(r"uses:\s+([\w\-/]+)@([\w\.]+)")
    PKG_JSON_VERSION_PATTERN = re.compile(r'"(node|pnpm|[\w\-\./@]+)":\s*"([\d\.\^x~<>=\| v]+)"')
    PM_PATTERN = re.compile(r'"packageManager":\s*"pnpm@([\d\.]+)"')

    lines = diff_text.splitlines()
    for i, line in enumerate(lines):
        if line.startswith("--- a/"):
            current_file = line[6:]
            continue
        elif line.startswith("+++ b/"):
            current_file = line[6:]
            continue

        # Detect single-line additions (for synthesized diffs in post-processing)
        if line.startswith("+") and not line.startswith("+++"):
            added_line = line[1:].strip()

            # Check if this is part of a -/+ pair handled below
            if i > 0 and lines[i-1].startswith("-"):
                 continue

            m_add = ACTION_PATTERN.search(added_line)
            if m_add:
                changes.append({
                    "file": current_file or "unknown",
                    "type": "action",
                    "name": m_add.group(1),
                    "old": "unknown",
                    "new": m_add.group(2)
                })

            m_add = PKG_JSON_VERSION_PATTERN.search(added_line)
            if m_add:
                changes.append({
                    "file": current_file or "unknown",
                    "type": "dependency",
                    "name": m_add.group(1),
                    "old": "unknown",
                    "new": m_add.group(2)
                })

            m_add = PM_PATTERN.search(added_line)
            if m_add:
                changes.append({
                    "file": current_file or "unknown",
                    "type": "dependency",
                    "name": "pnpm",
                    "old": "unknown",
                    "new": m_add.group(1)
                })

        # Detect removals
        if line.startswith("-") and not line.startswith("---"):
            removed_line = line[1:].strip()
            # Look ahead for a corresponding '+' line
            if i + 1 < len(lines) and lines[i+1].startswith("+"):
                added_line = lines[i+1][1:].strip()

                # Check for GitHub Action change
                m_rem = ACTION_PATTERN.search(removed_line)
                m_add = ACTION_PATTERN.search(added_line)
                if m_rem and m_add and m_rem.group(1) == m_add.group(1):
                    changes.append({
                        "file": current_file,
                        "type": "action",
                        "name": m_rem.group(1),
                        "old": m_rem.group(2),
                        "new": m_add.group(2)
                    })

                # Check for package.json change
                m_rem = PKG_JSON_VERSION_PATTERN.search(removed_line)
                m_add = PKG_JSON_VERSION_PATTERN.search(added_line)
                if m_rem and m_add and m_rem.group(1) == m_add.group(1):
                     changes.append({
                        "file": current_file,
                        "type": "dependency",
                        "name": m_rem.group(1),
                        "old": m_rem.group(2),
                        "new": m_add.group(2)
                    })

                # Check for packageManager
                m_rem = PM_PATTERN.search(removed_line)
                m_add = PM_PATTERN.search(added_line)
                if m_rem and m_add:
                     changes.append({
                        "file": current_file,
                        "type": "dependency",
                        "name": "pnpm",
                        "old": m_rem.group(1),
                        "new": m_add.group(1)
                    })

                # Check for simple version files (.nvmrc, .node-version)
                if current_file in [".nvmrc", ".node-version"]:
                    old_v = removed_line.replace("v", "")
                    new_v = added_line.replace("v", "")
                    if old_v != new_v:
                        changes.append({
                            "file": current_file,
                            "type": "runtime",
                            "name": "node",
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
                    "message": f"Version downgrade detected for {c['name']}: {head_v} -> {c['new']}",
                    "type": "downgrade"
                })

        # 2. Compare against Latest (Outdated detection - optional warning)
        latest = None
        if c["type"] == "action":
            latest = fetch_latest_gh_action(c["name"])
        elif c["name"] in ["pnpm"] or c["type"] == "dependency":
             latest = fetch_latest_npm(c["name"])

        if latest:
            if compare_versions(c["new"], latest) < 0:
                findings.append({
                    "severity": "warn",
                    "file": c["file"],
                    "message": f"Proposed version for {c['name']} ({c['new']}) is outdated. Latest is {latest}.",
                    "type": "outdated"
                })

        # 3. Node.js Hard Block
        if c["name"] == "node":
             # Any modification to Node is a block unless overridden
             if os.environ.get("ALLOW_NODE_VERSION_CHANGE") != "true":
                 findings.append({
                    "severity": "error",
                    "file": c["file"],
                    "message": f"Hard block: Node.js version modification detected ({c['old']} -> {c['new']}). Modification is forbidden unless ALLOW_NODE_VERSION_CHANGE=true.",
                    "type": "hard_block"
                })

    return findings

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 verify_versions.py <diff_file_or_text>")
        sys.exit(1)

    input_val = sys.argv[1]
    if os.path.exists(input_val):
        with open(input_val, "r") as f:
            diff_text = f.read()
    else:
        diff_text = input_val

    changes = parse_diff(diff_text)
    findings = verify_changes(changes)

    if findings:
        print(json.dumps(findings, indent=2))
        # Exit with error code if any 'error' severity exists
        if any(f["severity"] == "error" for f in findings):
            sys.exit(1)
    else:
        print(json.dumps([], indent=2))

    sys.exit(0)

if __name__ == "__main__":
    main()
