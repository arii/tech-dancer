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

    # 2. Missing error handling in scripts (check first 15 lines for set -e, set -u, set -o pipefail)
    # Combined flags like 'set -eu' are supported.
    uncommented_first_lines = [re.sub(r'#.*', '', line) for line in lines[:15]]
    settings_content = " ".join(uncommented_first_lines)

    missing_settings = []
    if not re.search(r'set\s+-[^ \n]*e', settings_content):
        missing_settings.append("set -e (errexit)")
    if not re.search(r'set\s+-[^ \n]*u', settings_content):
        missing_settings.append("set -u (nounset)")
    if "pipefail" not in settings_content:
        missing_settings.append("set -o pipefail")

    if missing_settings and len(lines) > 5:
        findings.append(f"Script lacks recommended settings in first 15 lines: {', '.join(missing_settings)}")

    # 3. Pattern checks
    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped or stripped.startswith('#'):
            continue

        # Hardcoded absolute paths (excluding common system ones)
        # Look for tokens starting with / that aren't in the allowlist
        for match in re.finditer(r'(^|\s|["\'])(?P<full_path>/(?P<path>[a-zA-Z0-9._/-]*))', line):
            full_path = match.group('full_path')
            path = match.group('path')
            # Allowlist common system directories
            allowlist = ['bin/', 'usr/bin/', 'dev/', 'proc/', 'tmp/', 'etc/', 'lib/', 'var/lib/', 'sys/', 'usr/sbin/', 'sbin/', 'var/run/']
            if not any(path.startswith(a) for a in allowlist) and path not in ['', '/']:
                # Avoid flagging division in JS/Python or common single-char patterns
                if '/' in path and not re.search(r'[0-9]\s*/\s*[0-9]', line):
                    findings.append(f"Line {i+1}: Potential hardcoded absolute path: {full_path}")

        # Unquoted variables in risky commands (rm, cp, mv, ls)
        if re.search(r'\b(rm|cp|mv|ls)\b', line):
            # Matches $VAR or ${VAR}
            for var_match in re.finditer(r'(?P<var>\$[a-zA-Z0-9_]+|\$\{[a-zA-Z0-9_]+\})', line):
                pre = line[:var_match.start()]
                # Check if it's inside double quotes (simplistic)
                if (pre.count('"') - pre.count('\\"')) % 2 == 0:
                    # Check if it's inside single quotes
                    if (pre.count("'") - pre.count("\\'")) % 2 == 0:
                        findings.append(f"Line {i+1}: Unquoted variable expansion in risky command: {var_match.group('var')}")

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
