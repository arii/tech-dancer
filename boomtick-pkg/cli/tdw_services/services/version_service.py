import os
import re
import json
import requests
from packaging import version
from typing import Dict, Optional, List

class VersionService:
    # Registry Cache
    _NPM_CACHE = {}
    _GITHUB_CACHE = {}

    def fetch_latest_npm(self, package_name: str) -> Optional[str]:
        if package_name in self._NPM_CACHE:
            return self._NPM_CACHE[package_name]
        try:
            url = f"https://registry.npmjs.org/{package_name}/latest"
            res = requests.get(url, timeout=5)
            if res.status_code == 200:
                ver = res.json().get("version")
                self._NPM_CACHE[package_name] = ver
                return ver
        except Exception:
            pass
        return None

    def fetch_latest_node(self) -> Optional[str]:
        if "node" in self._NPM_CACHE:
            return self._NPM_CACHE["node"]
        try:
            url = "https://nodejs.org/dist/index.json"
            res = requests.get(url, timeout=5)
            if res.status_code == 200:
                # Latest is the first one
                ver = res.json()[0].get("version").lstrip('v')
                self._NPM_CACHE["node"] = ver
                return ver
        except Exception:
            pass
        return None

    def fetch_latest_gh_action(self, action_path: str) -> Optional[str]:
        if action_path in self._GITHUB_CACHE:
            return self._GITHUB_CACHE[action_path]
        try:
            url = f"https://api.github.com/repos/{action_path}/releases/latest"
            headers = {}
            # Try to use token if available
            token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
            if token:
                headers["Authorization"] = f"token {token}"

            res = requests.get(url, headers=headers, timeout=5)
            if res.status_code == 200:
                tag = res.json().get("tag_name")
                self._GITHUB_CACHE[action_path] = tag
                return tag
        except Exception:
            pass
        return None

    def compare_versions(self, v1: str, v2: str) -> int:
        """Returns 1 if v1 > v2, -1 if v1 < v2, 0 if v1 == v2."""
        if v1 == v2: return 0
        try:
            v1_clean = v1.lstrip('v')
            v2_clean = v2.lstrip('v')

            if '.x' in v1_clean: v1_clean = v1_clean.replace('.x', '.0')
            if '.x' in v2_clean: v2_clean = v2_clean.replace('.x', '.0')

            pv1 = version.parse(v1_clean)
            pv2 = version.parse(v2_clean)
            if pv1 > pv2: return 1
            if pv1 < pv2: return -1
            return 0
        except Exception:
            if v1 > v2: return 1
            if v1 < v2: return -1
            return 0

    def get_stack_versions(self, fetch_latest: bool = False) -> Dict[str, str]:
        """Extracts core versions (Node, pnpm, GHA) from the repository."""
        versions = {
            "node": "24.16.0",
            "pnpm": "10.28.2",
            "actions/checkout": "v4",
            "actions/setup-node": "v4",
            "actions/upload-artifact": "v4",
        }

        try:
            if os.path.exists(".node-version"):
                with open(".node-version", "r") as f:
                    v = f.read().strip().lstrip('v')
                    if v: versions["node"] = v
            elif os.path.exists(".nvmrc"):
                with open(".nvmrc", "r") as f:
                    v = f.read().strip().lstrip('v')
                    if v: versions["node"] = v

            if os.path.exists("package.json"):
                with open("package.json", "r") as f:
                    pkg = json.load(f)
                    if "packageManager" in pkg:
                        versions["pnpm"] = pkg["packageManager"].replace("pnpm@", "")
                    elif "engines" in pkg and "pnpm" in pkg["engines"]:
                        versions["pnpm"] = pkg["engines"]["pnpm"]

                    if "engines" in pkg and "node" in pkg["engines"] and not os.path.exists(".node-version"):
                         versions["node"] = pkg["engines"]["node"]

            workflow_dir = ".github/workflows"
            if os.path.exists(workflow_dir):
                for filename in os.listdir(workflow_dir):
                    if not (filename.endswith(".yml") or filename.endswith(".yaml")):
                        continue
                    try:
                        with open(os.path.join(workflow_dir, filename), "r") as f:
                            content = f.read()
                            matches = re.findall(r"uses:\s+([\w\-/]+)@([\w\.]+)", content)
                            for action, v_str in matches:
                                if not action.startswith("actions/"): continue
                                current_v = versions.get(action)
                                if not current_v or self.compare_versions(v_str, current_v) > 0:
                                    versions[action] = v_str
                    except Exception: pass

            if fetch_latest:
                latest_node = self.fetch_latest_node()
                if latest_node: versions["latest_node"] = latest_node

                latest_pnpm = self.fetch_latest_npm("pnpm")
                if latest_pnpm: versions["latest_pnpm"] = latest_pnpm

                for action in ["actions/checkout", "actions/setup-node"]:
                    latest_a = self.fetch_latest_gh_action(action)
                    if latest_a: versions[f"latest_{action}"] = latest_a

        except Exception:
            pass

        return versions

    def parse_diff(self, diff_text: str) -> List[Dict]:
        """Parses a git diff to find version changes."""
        changes = []

        ACTION_PATTERN = re.compile(r"uses:\s+([\w\-/]+)@([\w\.]+)")
        PKG_JSON_VERSION_PATTERN = re.compile(r'"(node|pnpm|[\w\-\./@]+)":\s*"([\d\.\^x~<>=\| v]+)"')
        PM_PATTERN = re.compile(r'"packageManager":\s*"pnpm@([\d\.]+)"')

        SENSITIVE_FILES = [".nvmrc", ".node-version", "package.json"]
        SENSITIVE_DIRS = [".github/workflows/"]

        hunks = re.split(r"^(?=--- )", diff_text, flags=re.MULTILINE)
        for hunk in hunks:
            if not hunk.strip(): continue

            lines = hunk.splitlines()
            current_file = None
            for line in lines:
                if line.startswith("--- a/"):
                    current_file = line[6:]
                    break
                elif line.startswith("+++ b/"):
                    current_file = line[6:]
                    break

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
                    m = ACTION_PATTERN.search(content)
                    if m: removals[m.group(1)] = m.group(2)
                    m = PKG_JSON_VERSION_PATTERN.search(content)
                    if m: removals[m.group(1)] = m.group(2)
                    m = PM_PATTERN.search(content)
                    if m: removals["pnpm"] = m.group(1)
                    if current_file in [".nvmrc", ".node-version"]:
                        removals["node"] = content.replace("v", "")

                elif line.startswith("+"):
                    content = line[1:].strip()
                    m = ACTION_PATTERN.search(content)
                    if m: additions[m.group(1)] = m.group(2)
                    m = PKG_JSON_VERSION_PATTERN.search(content)
                    if m: additions[m.group(1)] = m.group(2)
                    m = PM_PATTERN.search(content)
                    if m: additions["pnpm"] = m.group(1)
                    if current_file in [".nvmrc", ".node-version"]:
                        additions["node"] = content.replace("v", "")

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

    def verify_changes(self, changes: List[Dict]) -> List[Dict]:
        """Verifies changes against HEAD and registries."""
        findings = []
        stack = self.get_stack_versions()

        for c in changes:
            head_v = stack.get(c["name"])
            if not head_v and c["name"] == "node": head_v = stack.get("node")
            if not head_v and c["name"] == "pnpm": head_v = stack.get("pnpm")

            if head_v:
                if self.compare_versions(c["new"], head_v) < 0:
                    findings.append({
                        "severity": "error",
                        "file": c["file"],
                        "message": f"Version downgrade detected for {c['name']}: {head_v} -> {c['new']}",
                        "type": "downgrade"
                    })

            latest = None
            if c["name"] == "node":
                latest = self.fetch_latest_node()
            elif c["type"] == "action":
                latest = self.fetch_latest_gh_action(c["name"])
            elif c["name"] in ["pnpm"] or c["type"] == "dependency":
                 latest = self.fetch_latest_npm(c["name"])

            if latest:
                if self.compare_versions(c["new"], latest) < 0:
                    findings.append({
                        "severity": "warn",
                        "file": c["file"],
                        "message": f"Proposed version for {c['name']} ({c['new']}) is outdated. Latest is {latest}.",
                        "type": "outdated"
                    })

            if c["name"] == "node":
                 if head_v and self.compare_versions(c["new"], head_v) != 0:
                     if os.environ.get("ALLOW_NODE_VERSION_CHANGE") != "true":
                         findings.append({
                            "severity": "error",
                            "file": c["file"],
                            "message": f"Hard block: Node.js version modification detected ({head_v} -> {c['new']}). Modification is forbidden unless ALLOW_NODE_VERSION_CHANGE=true.",
                            "type": "hard_block"
                        })

        return findings
