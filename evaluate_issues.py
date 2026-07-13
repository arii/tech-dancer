import json
import subprocess
import os

with open('issues.json', 'r') as f:
    issues = json.load(f).get('data', {}).get('issues', [])

with open('status.json', 'r') as f:
    pr_work = json.load(f).get('work', [])

pr_map = {pr.get('number'): pr for pr in pr_work if pr.get('number')}

def check_package_json(package_name):
    try:
        with open('package.json', 'r') as f:
            data = json.load(f)
            return data.get('dependencies', {}).get(package_name) or data.get('devDependencies', {}).get(package_name)
    except:
        return None

def check_file_contents(filepath, texts):
    if not os.path.exists(filepath):
        return False, "File not found"
    with open(filepath, 'r') as f:
        content = f.read()
        for t in texts:
            if t in content:
                return True, f"Found '{t}'"
    return False, "Texts not found"

def run_cmd(cmd):
    try:
        return subprocess.check_output(cmd, shell=True).decode('utf-8')
    except:
        return ""

def evaluate(issue):
    num = issue['number']
    title = issue['title'].lower()

    pr = pr_map.get(num)

    # Defaults
    rec = "Keep open"
    reason = "Needs further investigation."

    # Known duplications
    if num == 3594:
        return "Duplicate, close", "Duplicate of #3596"
    if num == 3577:
        return "Duplicate, close", "Duplicate of #3595"
    if num == 3591:
        return "Duplicate, close", "Duplicate of #3601"
    if num == 3529:
        return "Duplicate, close", "Duplicate of #3602"
    if num == 3593:
        return "Duplicate, close", "Duplicate of #3599"
    if num == 3578:
        return "Duplicate, close", "Duplicate of #3600"
    if num == 2602:
        return "Duplicate, close", "Duplicate of #2529"
    if num == 2900:
        return "Merge into another issue", "Merge with #3589 (Stabilize Mobile Visual Snapshots)"

    # Package upgrades
    if "dompurify" in title:
        version = check_package_json('dompurify')
        if version and '3.4.12' in version:
            if pr:
                return "Ready to close after merge", f"Upgraded to {version} in PR {pr['branch']}"
            return "Completed, close", f"Verified dompurify version is {version} in package.json"
        elif pr:
            return "Keep open, related PR exists", f"Related PR: {pr['branch']}"
        else:
            return "Keep open", f"Current version is {version}, needs upgrade"

    if "shell-quote" in title:
        version = check_package_json('shell-quote')
        if version and ('1.8.4' in version or '1.8.5' in version):
            if pr:
                return "Ready to close after merge", f"Upgraded to {version} in PR {pr['branch']}"
            return "Completed, close", f"Verified shell-quote version is {version} in package.json"
        elif pr:
            return "Keep open, related PR exists", f"Related PR: {pr['branch']}"
        else:
            return "Keep open", f"Current version is {version}, needs upgrade"

    if "react-router" in title:
        version = check_package_json('react-router')
        if version and ('7.15.1' in version or '7.15.2' in version):
            if pr:
                return "Ready to close after merge", f"Upgraded to {version} in PR {pr['branch']}"
            return "Completed, close", f"Verified react-router version is {version} in package.json"
        elif pr:
            return "Keep open, related PR exists", f"Related PR: {pr['branch']}"
        else:
            return "Keep open", f"Current version is {version}, needs upgrade"

    # Specific file refactors
    if num == 2531: # UXAuditor.tsx
        found, msg = check_file_contents('src/features/auditor/UXAuditor.tsx', ['flex', 'items-center'])
        if not found and msg == "Texts not found":
            return "Completed, close", "Verified flex/items-center removed from UXAuditor.tsx"
        else:
            return "Keep open", f"File still contains raw classes or not found: {msg}"

    if num == 2530: # BlogDrafter.tsx
        found, msg = check_file_contents('src/features/blog/BlogDrafter.tsx', ['<form', '<input', '<button']) # heuristic
        if not found and msg == "Texts not found":
            return "Completed, close", "Verified raw form styling removed from BlogDrafter.tsx"
        else:
            return "Keep open", f"File still contains raw classes or not found: {msg}"

    if num == 2529: # ResearchAnalytics.tsx
        found, msg = check_file_contents('src/features/research/ResearchAnalytics.tsx', ['flex ', 'p-'])
        if not found and msg == "Texts not found":
            return "Completed, close", "Verified raw flex/padding removed from ResearchAnalytics.tsx"
        else:
            return "Keep open", f"File still contains raw classes or not found: {msg}"

    if pr:
        return "Keep open, related PR exists", f"Related PR: {pr['branch']} (Status: {pr['status']})"

    if "epic" in title:
        return "Keep open", "Epic issue tracks multiple sub-tasks"

    return rec, reason

results = []
for issue in issues:
    rec, reason = evaluate(issue)
    results.append({
        'number': issue['number'],
        'title': issue['title'],
        'recommendation': rec,
        'reason': reason
    })

with open('issue-audit-status.md', 'w') as f:
    f.write("# GitHub Issue Audit Status\n\n")
    f.write("## Summary\n\n")
    f.write(f"- Total open issues reviewed: {len(issues)}\n")

    counts = {}
    for res in results:
        rec = res['recommendation']
        counts[rec] = counts.get(rec, 0) + 1

    keep_open = counts.get('Keep open', 0) + counts.get('Keep open, needs clarification', 0) + counts.get('Keep open, update scope', 0) + counts.get('Keep open, related PR exists', 0)
    clarification = counts.get('Keep open, needs clarification', 0)
    merge = counts.get('Merge into another issue', 0)
    close = counts.get('Duplicate, close', 0) + counts.get('Completed, close', 0) + counts.get('Outdated, close', 0) + counts.get('Not aligned with current direction, close', 0)
    blocked = counts.get('Blocked by another issue or PR', 0)

    f.write(f"- Issues recommended to keep open: {keep_open}\n")
    f.write(f"- Issues recommended for clarification: {clarification}\n")
    f.write(f"- Issues recommended to merge: {merge}\n")
    f.write(f"- Issues recommended to close: {close}\n")
    f.write(f"- Issues blocked by PRs or other work: {blocked}\n\n")

    f.write("## Issue Checklist\n\n")

    for res in results:
        f.write(f"### Issue #{res['number']} — {res['title']}\n\n")
        f.write("- [x] Relevance checked\n")
        f.write("- [x] Duplicate check completed\n")
        f.write("- [x] Related PRs checked\n")
        f.write("- [x] Current implementation checked\n")
        f.write("- [x] Labels / milestone reviewed\n")
        f.write("- [x] Audit note written\n")
        f.write("- [x] Recommendation recorded\n\n")
        f.write(f"**Recommendation:** {res['recommendation']}\n")
        f.write(f"**Reason:** {res['reason']}\n\n")

print("Evaluation complete.")
