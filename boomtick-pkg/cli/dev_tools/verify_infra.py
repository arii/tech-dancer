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

    with open(filepath, 'r') as f:
        lines = f.readlines()

    # 2. Missing error handling in scripts (check first 5 lines)
    if not any(any(kw in line for kw in ["set -e", "set -o pipefail"]) for line in lines[:5]):
        if len(lines) > 5:
            findings.append("Script lacks 'set -e' or 'set -o pipefail' for robust error handling in the first 5 lines.")

    # 3. Pattern checks
    for i, line in enumerate(lines):
        # Hardcoded absolute paths (excluding common system ones)
        if re.search(r'/(home|app|usr/local)/[a-zA-Z0-9]', line):
            findings.append(f"Line {i+1}: Potential hardcoded absolute path.")

        # Unquoted variables in risky commands
        if re.search(r'(rm|cp|mv|ls)\s+[^"\'\s]*\$[a-zA-Z0-9_]', line):
            findings.append(f"Line {i+1}: Unquoted variable in file operation (risk of word splitting).")

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
