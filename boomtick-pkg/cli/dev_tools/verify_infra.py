import sys
import subprocess
import re
import os

def check_shell_script(filepath):
    """Performs static analysis on a shell script."""
    findings = []

    # 1. Syntax check
    try:
        subprocess.run(["bash", "-n", filepath], check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError as e:
        findings.append(f"Syntax error: {e.stderr.strip()}")
        return findings

    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # 2. Missing error handling in scripts (check first 10 lines for set -e, set -u, set -o pipefail)
    # We use regex to ensure we don't match these in comments.
    checks = {
        "set -e": r"^\s*set\s+-e",
        "set -u": r"^\s*set\s+-u",
        "set -o pipefail": r"^\s*set\s+-o\s+pipefail"
    }

    missing_settings = []
    for name, pattern in checks.items():
        if not any(re.search(pattern, line) for line in lines[:10]):
            missing_settings.append(name)

    if missing_settings and len(lines) > 5:
        findings.append(f"Script lacks recommended settings in first 10 lines: {', '.join(missing_settings)}")

    # 3. Pattern checks
    for i, line in enumerate(lines):
        # Hardcoded absolute paths (excluding common system ones like /bin, /usr/bin, /dev, /proc)
        # Matches any path starting with / that isn't in a small allowlist
        if re.search(r'(?<![a-zA-Z0-9_])/(?!bin|usr/bin|dev|proc|tmp|etc|lib|var/lib|sys|usr/sbin|sbin)[a-zA-Z0-9]', line):
             # Heuristic check: ignore comment lines
             if not line.strip().startswith('#'):
                findings.append(f"Line {i+1}: Potential hardcoded absolute path: {line.strip()}")

        # Unquoted variables in risky commands (rm, cp, mv, ls)
        # Matches $VAR or ${VAR} not preceded by a quote
        if re.search(r'(rm|cp|mv|ls)\s+[^"\'\s]*\$[a-zA-Z0-9_{]', line):
            findings.append(f"Line {i+1}: Unquoted variable in file operation (risk of word splitting): {line.strip()}")

    return findings

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 verify_infra.py <filepath>")
        sys.exit(1)

    filepath = sys.argv[1]
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        sys.exit(1)

    findings = check_shell_script(filepath)
    if findings:
        print(f"Infrastructure violations found in {filepath}:")
        for f in findings:
            print(f"- {f}")
        sys.exit(1)
    else:
        print(f"No infrastructure violations found in {filepath}.")
        sys.exit(0)

if __name__ == "__main__":
    main()
