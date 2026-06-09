#!/usr/bin/env python3
import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import time

# Add workspace root to path before other imports
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


# Import unified configuration and client
from common_config import (
    setup_logging, setup_python_path, WORKSPACE_ROOT, HRM_REPO_DIR, WORKTREES_BASE
)

# Setup
setup_python_path()

# Environment flags
SKIP_JULES = os.environ.get('SKIP_JULES_INTEGRATION', '').lower() in ('1', 'true', 'yes')
COMMENT_JULES = os.environ.get('COMMENT_JULES', '').lower() in ('1', 'true', 'yes')
SKIP_REBASE = os.environ.get('SKIP_REBASE_INTEGRATION', '').lower() in ('1', 'true', 'yes')

# Import Jules client if available
try:
    from jules_client import get_jules_client
    JULES_AVAILABLE = True and not SKIP_JULES
except ImportError:
    JULES_AVAILABLE = False

# Setup logging
logger = setup_logging("process_pr")

# Backward compatibility
REPO_DIR = str(HRM_REPO_DIR)

if SKIP_JULES:
    print("[INFO] Jules integration disabled via SKIP_JULES_INTEGRATION")
if COMMENT_JULES:
    print("[INFO] Jules mention enabled via COMMENT_JULES")

# Attempt to import Secrets Manager
try:
    import secrets_ops

    SECRETS_AVAILABLE = True
except ImportError:
    SECRETS_AVAILABLE = False


# Ensure worktrees base exists
os.makedirs(WORKTREES_BASE, exist_ok=True)


def run(cmd, cwd=None, check=True, capture_output=False, env=None):
    """
    Run a subprocess command.
    If capture_output is True, it streams output to the console AND captures it
    to return to the caller (useful for logs).
    """
    cmd_str = " ".join(cmd)
    print(f"[CMD] {cmd_str}")

    # Use the passed env or default to current environment
    run_env = env if env is not None else os.environ.copy()

    if capture_output:
        # Use Popen to stream stdout while capturing it
        process = subprocess.Popen(
            cmd,
            cwd=cwd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,  # Merge stderr into stdout
            text=True,
            bufsize=1,  # Line buffered
            env=run_env,
        )

        captured_lines = []

        # Read stream line by line
        with process.stdout:
            for line in iter(process.stdout.readline, ""):
                print(line, end="")  # Stream to console immediately
                captured_lines.append(line)

        process.wait()
        returncode = process.returncode
        stdout_content = "".join(captured_lines)

        if check and returncode != 0:
            # Raise error with captured output attached
            raise subprocess.CalledProcessError(
                returncode, cmd, output=stdout_content
            )

        # Return object compatible with subprocess.CompletedProcess
        return type(
            "CompletedProcess",
            (object,),
            {
                "stdout": stdout_content,
                "stderr": "",  # Merged into stdout
                "returncode": returncode,
            },
        )

    else:
        # Standard run: Output goes directly to console, no capturing
        try:
            result = subprocess.run(
                cmd, cwd=cwd, check=check, text=True, env=run_env
            )
            return result
        except subprocess.CalledProcessError as e:
            print(f"[ERROR] Command failed: {cmd_str}")
            raise e


def get_pr_details(pr_number):
    """Fetch PR branch name and status using gh CLI."""
    try:
        cmd = [
            "gh",
            "pr",
            "view",
            str(pr_number),
            "--json",
            "headRefName,headRefOid,url,isDraft,state,title",
            "--repo",
            "arii/hrm",
        ]
        res = run(cmd, check=True, capture_output=True)
        return json.loads(res.stdout)
    except Exception:
        print(
            f"[ERROR] Failed to fetch PR #{pr_number}. " "Is gh CLI installed?"
        )
        sys.exit(1)


def create_commit_status(pr_info, status, description, context="verification"):
    """Creates a commit status for the PR's head SHA."""
    owner = "arii"
    repo = "hrm"
    sha = pr_info["headRefOid"]
    
    print(f"[INFO] Setting commit status for {sha} to {status}: {description}")

    try:
        run(
            [
                "gh",
                "api",
                "--method",
                "POST",
                f"/repos/{owner}/{repo}/statuses/{sha}",
                "-f",
                f"state={status}",
                "-f",
                f"description={description}",
                "-f",
                f"context={context}",
            ],
            check=True,
        )
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Failed to create commit status: {e}")
        # Don't fail the whole script if this fails


def setup_worktree(branch_name):
    """Creates a worktree for the branch."""
    worktree_path = os.path.join(WORKTREES_BASE, branch_name)

    # Prune existing worktrees first to be safe
    run(["git", "worktree", "prune"], cwd=REPO_DIR, check=False)

    if os.path.exists(worktree_path):
        print(f"[WARN] Worktree path {worktree_path} exists. " "Removing it.")
        shutil.rmtree(worktree_path)
        run(["git", "worktree", "prune"], cwd=REPO_DIR, check=False)

    print(f"[INFO] Creating worktree for branch: {branch_name}")
    # Fetch latest to ensure we know about the branch
    run(["git", "fetch", "origin"], cwd=REPO_DIR)
    
    # Force fetch the branch to get latest
    run(["git", "fetch", "origin", f"{branch_name}:{branch_name}"], cwd=REPO_DIR, check=False)

    try:
        # Try checking out existing branch
        run(
            ["git", "worktree", "add", worktree_path, branch_name],
            cwd=REPO_DIR,
        )
    except subprocess.CalledProcessError:
        # If local branch doesn't match remote or doesn't exist, try tracking
        try:
            run(
                [
                    "git",
                    "worktree",
                    "add",
                    "--track",
                    "-b",
                    branch_name,
                    worktree_path,
                    f"origin/{branch_name}",
                ],
                cwd=REPO_DIR,
            )
        except subprocess.CalledProcessError:
            print("[ERROR] Failed to create worktree. Does branch exist?")
            sys.exit(1)

    return worktree_path


def rebase_and_push(worktree_path, branch_name):
    """
    Attempts to rebase onto origin/leader.
    If rebase fails, it aborts the rebase and performs a MERGE instead.
    It deliberately commits the conflict markers so they can be pushed
    and analyzed by the agent.
    """
    print("[INFO] Fetching origin/leader...")
    run(["git", "fetch", "origin", "leader"], cwd=worktree_path)

    print(f"[INFO] Attempting rebase of {branch_name}...")
    try:
        run(
            ["git", "rebase", "origin/leader"],
            cwd=worktree_path,
            capture_output=True,
        )
        print("[OK] Rebase successful.")
        # If rebase succeeds, we still force push to ensure remote is updated
        print("[INFO] Force pushing successful rebase...")
        run(
            ["git", "push", "origin", branch_name, "--force"],
            cwd=worktree_path,
            check=False,
        )
        return True
    except subprocess.CalledProcessError:
        print("[WARN] Rebase failed due to conflicts.")
        print("[INFO] Aborting rebase to fallback to Merge strategy...")
        # Abort the rebase to get back to clean state
        run(["git", "rebase", "--abort"], cwd=worktree_path, check=False)

        print("[INFO] Falling back to Merge to capture conflicts...")
        try:
            # Attempt merge
            run(
                ["git", "merge", "origin/leader"],
                cwd=worktree_path,
                capture_output=True,
            )
            # If merge succeeds without conflicts, great!
            print("[OK] Merge successful.")
        except subprocess.CalledProcessError:
            print("[WARN] Merge conflicts detected. Committing markers...")
            # 1. Stage all files (including those with <<<< markers)
            run(["git", "add", "."], cwd=worktree_path, check=False)

            # 2. Commit the conflicts.
            run(
                [
                    "git",
                    "commit",
                    "-m",
                    "Merge origin/leader (with unresolved conflicts)",
                ],
                cwd=worktree_path,
                check=False,
            )

            # Return False to indicate we have conflicts that need resolution
            print("[INFO] Force pushing changes (with potential conflicts)...")
            run(
                ["git", "push", "origin", branch_name, "--force"],
                cwd=worktree_path,
                check=False,
            )
            return False

    print("[INFO] Force pushing changes...")
    run(
        ["git", "push", "origin", branch_name, "--force"],
        cwd=worktree_path,
        check=False,
    )
    return True


def run_checks(worktree_path):
    """Runs the suite of checks and returns a list of results."""
    # We apply robust flags here to prevent hangs and ensure correct exit code
    # --ci: Tells Jest to run in non-interactive mode.
    # --reporter=list: Tells Playwright to output text only.
    checks = [
        {"name": "Lint", "cmd": ["npm", "run", "lint"]},
        {"name": "Build", "cmd": ["npm", "run", "build"]},
        {"name": "Unit Tests", "cmd": ["npm", "run", "test", "--", "--ci"]},
        {
            "name": "Visual Tests",
            "cmd": ["npm", "run", "test:visual", "--", "--reporter=list"],
        },
    ]

    # Setup CI environment as an extra layer of safety
    ci_env = os.environ.copy()
    ci_env["CI"] = "true"

    results = []
    failure_details = None

    for check in checks:
        print(f"\n[RUN] Running: {check['name']}")
        start_time = time.time()
        try:
            # Command output is streamed to console via run()
            proc = run(
                check["cmd"],
                cwd=worktree_path,
                check=False,  # Don't raise on non-zero, we'll check output
                capture_output=True,
                env=ci_env,
            )

            duration = round(time.time() - start_time, 2)

            # Check for test failures in output
            # Playwright: look for "X failed" or "X flaky"
            # Jest: look for "Tests: X failed"
            output_lower = proc.stdout.lower() if proc.stdout else ""
            test_failed = False

            if check["name"] == "Visual Tests":
                # Playwright specific checks
                # Look for the summary line "X failed"
                if re.search(r"\d+\s+failed", output_lower):
                    test_failed = True
                # Also check return code
                if proc.returncode != 0:
                    test_failed = True
            elif check["name"] == "Unit Tests":
                # Jest specific checks - look for summary line
                if re.search(r"test suites?:.*\d+\s+failed", output_lower):
                    test_failed = True
                if proc.returncode != 0:
                    test_failed = True
            else:
                # For lint and build, rely on exit code
                if proc.returncode != 0:
                    test_failed = True

            if test_failed:
                results.append(
                    {
                        "name": check["name"],
                        "status": "[FAIL]",
                        "duration": f"{duration}s",
                    }
                )
                failure_details = {
                    "step": check["name"],
                    "cmd": " ".join(check["cmd"]),
                    "log": (
                        proc.stdout if proc.stdout else "No output captured"
                    ),
                }
                print(f"[ERROR] {check['name']} Failed!")
                break  # Stop at first failure
            else:
                results.append(
                    {
                        "name": check["name"],
                        "status": "[PASS]",
                        "duration": f"{duration}s",
                    }
                )
        except subprocess.CalledProcessError as e:
            duration = round(time.time() - start_time, 2)
            results.append(
                {
                    "name": check["name"],
                    "status": "[FAIL]",
                    "duration": f"{duration}s",
                }
            )

            # Capture failure info
            stdout = e.output if hasattr(e, "output") else str(e)
            failure_details = {
                "step": check["name"],
                "cmd": " ".join(check["cmd"]),
                "log": stdout,
            }
            print(f"[ERROR] {check['name']} Failed!")
            break  # Stop at first failure

    return results, failure_details


def post_pr_comment(pr_number, results, failure_details, session_url=None, analyzer_json=None):
    """Posts a comment to the PR with the results."""

    # Summary header
    summary_status = "PASS" if not failure_details else "FAIL"
    body = f"### Automated Verification Results — {summary_status}\n\n"
    
    # Add Jules mention on failure if requested
    if failure_details and COMMENT_JULES:
        body += "@jules\n\n"

    if results:
        # Table of results
        body += "| Check | Status | Duration |\n"
        body += "|---|---|---|\n"
        for r in results:
            body += f"| {r['name']} | {r['status']} | {r['duration']} |\n"
    else:
        body += "**Verification skipped due to merge/rebase failures.**\n"

    if failure_details:
        body += f"\n\n**Verification Failed at: {failure_details['step']}**\n"
        if session_url:
            body += f"Jules session created: {session_url}\n"

        body += "\n<details><summary>Failure Logs</summary>\n\n```\n"
        # Truncate log if too long for comment
        body += failure_details["log"][-2000:]
        body += "\n```\n</details>"
        if analyzer_json:
            body += "\n<details><summary>Structure Analyzer</summary>\n\n````json\n"
            body += analyzer_json[:4000]
            body += "\n````\n</details>"
    else:
        body += "\n\nAll checks passed! Ready for review."
        if analyzer_json:
            body += "\n<details><summary>Structure Analyzer</summary>\n\n````json\n"
            body += analyzer_json[:4000]
            body += "\n````\n</details>"

    print("[INFO] Posting comment to PR...")
    run(
        [
            "gh",
            "pr",
            "comment",
            str(pr_number),
            "--body",
            body,
            "--repo",
            "arii/hrm",
        ],
        check=False,
    )


def update_pr_status(pr_number):
    """Updates PR to ready for review if it is a draft."""
    print("[INFO] Marking PR as ready for review...")
    run(
        ["gh", "pr", "ready", str(pr_number), "--repo", "arii/hrm"],
        check=False,
    )


def mark_pr_as_draft(pr_number):
    """Converts PR back to draft status if tests fail."""
    print("[INFO] Tests failed. Converting PR back to Draft...")
    # 'gh pr ready --undo' converts a ready PR back to draft
    run(
        ["gh", "pr", "ready", str(pr_number), "--undo", "--repo", "arii/hrm"],
        check=False,
    )


def trigger_jules_fix(branch_name, pr_number, pr_title, failure_details):
    """Creates a Jules session to fix the issue."""
    if not JULES_AVAILABLE:
        print("[WARN] Jules integration not available.")
        return None

    print("\n[JULES] Creating Jules Session for Fix...")
    client = get_jules_client()

    # Construct prompt
    prompt = (
        f'The verification failed for PR #{pr_number} ("{pr_title}").\n\n'
        f"**Failed Step:** {failure_details['step']}\n"
        f"**Command:** `{failure_details['cmd']}`\n\n"
        f"**Error Log:**\n```\n{failure_details['log']}\n```\n\n"
        f"Please analyze, fix branch `{branch_name}`, and verify with:\n"
        "1. npm run lint\n2. npm run build\n"
        "3. npm run test\n4. npm run test:visual"
    )

    session_title = f"Fix {failure_details['step']} Failure - PR #{pr_number}"

    try:
        session_name = client.create_session(
            prompt=prompt,
            source="sources/github/arii/hrm",  # Default source
            branch=branch_name,
            title=session_title,
        )
        print(f"[OK] Created Session: {session_name}")
        return session_name
    except Exception as e:
        print(f"[ERROR] Failed to create Jules session: {e}")
        return None


def main():
    parser = argparse.ArgumentParser(
        description="Automated PR Verification & Fix Loop"
    )
    parser.add_argument("pr_number", help="GitHub PR number (e.g. 160)")
    parser.add_argument(
        "--start",
        action="store_true",
        help="Start production server if all checks pass",
    )
    parser.add_argument(
        "--skip-testing",
        action="store_true",
        help="Skip all testing and verification steps",
    )
    args = parser.parse_args()

    # 0. Kill existing processes to ensure a clean slate
    print("\n[STEP] Ensuring no stray processes are running...")
    run(["npm", "run", "kill-all"], cwd=REPO_DIR, check=False)

    # 1. Validate HRM layout before proceeding
    validator = os.path.join(WORKSPACE_ROOT, "local-dev", "validate_hrm_layout.py")
    if os.path.exists(validator):
        try:
            run([sys.executable, validator], cwd=WORKSPACE_ROOT)
        except subprocess.CalledProcessError:
            print("[FAIL] HRM layout validation failed. Aborting.")
            sys.exit(1)

    # 1. Get PR Details
    print(f"[INFO] Fetching details for PR #{args.pr_number}...")
    pr_info = get_pr_details(args.pr_number)
    create_commit_status(pr_info, "pending", "Running verification checks...")
    branch_name = pr_info["headRefName"]
    print(f"   Branch: {branch_name}")
    print(f"   Draft:  {pr_info['isDraft']}")

    # 2. Setup Worktree
    worktree_path = setup_worktree(branch_name)

    # Check if branch already has conflict markers
    print("\n[STEP] Checking for existing conflicts...")
    conflict_files = []
    for root, dirs, files in os.walk(worktree_path):
        # Skip node_modules and .git
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.next']]
        for file in files:
            if file.endswith(('.js', '.ts', '.tsx', '.jsx', '.json', '.md', '.css')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        if '<<<<<<< HEAD' in content or '=======' in content and '>>>>>>>' in content:
                            conflict_files.append(os.path.relpath(filepath, worktree_path))
                except Exception:
                    continue
    
    if conflict_files:
        print(f"[WARN] Branch already contains unresolved conflicts in {len(conflict_files)} file(s):")
        for cf in conflict_files[:5]:  # Show first 5
            print(f"  - {cf}")
        print("[INFO] Will attempt rebase/merge to resolve or update conflicts...")
        has_existing_conflicts = True
    else:
        has_existing_conflicts = False

    # 3. Rebase & Force Push (Early Fail Check or fix existing conflicts)
    print("\n[STEP] Attempting to sync with leader (Rebase/Merge)...")
    
    # If existing conflicts, reset to the commit before the conflict merge
    if has_existing_conflicts:
        print("[INFO] Resetting to clean state before attempting fresh rebase/merge...")
        # Get the parent of HEAD (before the bad merge)
        run(["git", "reset", "--hard", "HEAD~1"], cwd=worktree_path, check=False)
    
    is_git_clean = True # Assume clean if skipping rebase

    if SKIP_REBASE:
        print("[INFO] Skipping rebase/merge due to --skip-rebase flag.")
    else:
        # 3. Rebase & Force Push (Early Fail Check or fix existing conflicts)
        print("\n[STEP] Attempting to sync with leader (Rebase/Merge)...")
        
        # If existing conflicts, reset to the commit before the conflict merge
        if has_existing_conflicts:
            print("[INFO] Resetting to clean state before attempting fresh rebase/merge...")
            # Get the parent of HEAD (before the bad merge)
            run(["git", "reset", "--hard", "HEAD~1"], cwd=worktree_path, check=False)
        
        is_git_clean = rebase_and_push(worktree_path, branch_name)

        # After a push, the head SHA might change, so we get it again.
        res = run(["git", "rev-parse", "HEAD"], cwd=worktree_path, capture_output=True)
        new_sha = res.stdout.strip()
        if new_sha:
            pr_info["headRefOid"] = new_sha

    results = []
    failure = None
    analyzer_summary = None

    if not is_git_clean:
        print("[FAIL] Git rebase/merge failed with conflicts.")
        failure = {
            "step": "Git Rebase/Merge",
            "cmd": "git rebase origin/leader",
            "log": "Merge conflicts detected. "
            "Conflict markers have been committed and pushed.",
        }
    elif args.skip_testing:
        print("\n[INFO] Skipping testing as per --skip-testing flag.")
        results = [{"name": "Verification", "status": "[SKIPPED]", "duration": "0s"}]
        failure = None
    else:
        # 4. Setup Dependencies (Only if git is clean)
        print("\n[STEP] Setting up dependencies...")
        setup_script = os.path.join(worktree_path, "scripts", "setup.sh")
        try:
            if os.path.exists(setup_script):
                print("[INFO] Running setup.sh...")
                run([setup_script], cwd=worktree_path)
            else:
                print("[WARN] scripts/setup.sh not found, running npm install.")
                run(["npm", "install"], cwd=worktree_path)
        except subprocess.CalledProcessError as e:
            print("[ERROR] Setup failed - likely due to unresolved conflicts in package.json")
            failure = {
                "step": "Dependency Setup",
                "cmd": "scripts/setup.sh" if os.path.exists(setup_script) else "npm install",
                "log": f"Setup failed. Check for merge conflicts in package.json or other files.\n{str(e)}",
            }
            results = []
            # Skip to posting results
            session_link = None
            create_commit_status(pr_info, "failure", "Dependency setup failed")
            post_pr_comment(args.pr_number, results, failure, session_link, None)
            print("\n[DONE] Process Complete.")
            return

        # 5. Provision Secrets (for build/test)
        if SECRETS_AVAILABLE:
            print("\n[STEP] Provisioning secrets...")
            secrets_ops.provision_secrets(worktree_path)
        else:
            print(
                "[WARN] secrets_ops.py not found. "
                "Skipping secrets provisioning."
            )

        # 6. Run local-first verification
        print("\n[STEP] Running local-first verification: npm run verify...")
        proc = run([
            "npm",
            "run",
            "verify",
        ], cwd=worktree_path, check=False, capture_output=True)

        output = proc.stdout if proc.stdout else ""
        passed = proc.returncode == 0

        if passed:
            results = [{"name": "npm run verify", "status": "[PASS]", "duration": "n/a"}]
            failure = None
        else:
            results = [{"name": "npm run verify", "status": "[FAIL]", "duration": "n/a"}]
            failure = {
                "step": "npm run verify",
                "cmd": "npm run verify",
                "log": output,
            }

        # 7. Run Codebase Auditor (Expand script capability)
        auditor_script = os.path.join(WORKSPACE_ROOT, "scripts", "audit_codebase.py")
        if os.path.exists(auditor_script) and not failure:
            print("\n[STEP] Running Codebase Auditor...")
            # We want to scan only changed files in the worktree
            # But getting changed files relative to leader in a worktree is tricky if we just merged.
            # We'll diff against origin/leader.
            try:
                diff_cmd = ["git", "diff", "--name-only", "--diff-filter=d", "origin/leader...HEAD"]
                diff_proc = run(diff_cmd, cwd=worktree_path, capture_output=True, check=False)
                changed_files = diff_proc.stdout.splitlines() if diff_proc.stdout else []

                # Filter for relevant files
                changed_files = [f for f in changed_files if f.endswith(('.ts', '.tsx', '.js', '.jsx'))]

                if changed_files:
                    # Run auditor on these files
                    # We need to pass absolute paths or run from worktree root
                    # Let's run from worktree root and pass relative paths
                    audit_cmd = ["python3", auditor_script, "--json"] + changed_files

                    # Need to make sure common_config can be found, so set PYTHONPATH
                    audit_env = os.environ.copy()
                    audit_env["PYTHONPATH"] = str(WORKSPACE_ROOT)

                    audit_proc = run(audit_cmd, cwd=worktree_path, capture_output=True, check=False, env=audit_env)

                    if audit_proc.returncode != 0:
                        print("[WARN] Auditor found issues.")
                        try:
                            findings = json.loads(audit_proc.stdout)
                            if findings:
                                # Append to results
                                results.append({"name": "Codebase Audit", "status": "[WARN]", "duration": "n/a"})
                                # We won't fail the build for now, but we will add it to the comment
                                audit_log = "\n".join([f"[{f['auditor']}] {f['file']}:{f['line']} - {f['message']}" for f in findings])

                                # If we already have a failure, we append to it? No, failure is None here.
                                # Let's create a separate section or just append to failure details if we wanted to fail.
                                # For now, let's treat it as a pass with warnings, or fail if severe?
                                # Let's fail if security issues are found.
                                security_issues = [f for f in findings if f['auditor'] == 'Security']
                                if security_issues:
                                    print("[FAIL] Security issues found!")
                                    failure = {
                                        "step": "Security Audit",
                                        "cmd": " ".join(audit_cmd),
                                        "log": audit_log
                                    }
                                    results[-1]["status"] = "[FAIL]"
                                else:
                                    # Just append to analyzer summary or similar?
                                    # Let's attach it to analyzer_summary for now as a "Audit Report"
                                    if analyzer_summary is None:
                                        analyzer_summary = ""
                                    analyzer_summary += "\n\n### Codebase Audit Findings\n" + audit_log
                        except json.JSONDecodeError:
                            print("[WARN] Auditor output not valid JSON.")
                else:
                    print("[INFO] No relevant changed files to audit.")

            except Exception as e:
                print(f"[WARN] Failed to run auditor: {e}")


        # Optional: run structure analyzer and append summary
        analyzer_path = os.path.join(WORKSPACE_ROOT, "agent-requests", "analyze_structure.py")
        if os.path.exists(analyzer_path):
            try:
                aproc = run(["python", analyzer_path, "--json"], cwd=WORKSPACE_ROOT, check=False, capture_output=True)
                analyzer_json_out = aproc.stdout
                if analyzer_summary:
                    analyzer_summary = analyzer_summary + "\n\n--- Structure Analysis ---\n" + analyzer_json_out
                else:
                    analyzer_summary = analyzer_json_out
            except Exception:
                pass # analyzer_summary already handled or None

    # 7. Handle Outcome
    session_link = None
    if failure:
        create_commit_status(pr_info, "failure", f"Verification failed at: {failure['step']}")
        # Create Jules Session
        session_id = trigger_jules_fix(
            branch_name, args.pr_number, pr_info["title"], failure
        )
        if session_id:
            session_link = f"Session ID: {session_id}"

        # If it was ready for review, revert to draft
        if not pr_info["isDraft"]:
            mark_pr_as_draft(args.pr_number)
    else:
        create_commit_status(pr_info, "success", "All checks passed!")
        # Success Action: Mark ready BEFORE user testing
        if pr_info["isDraft"]:
            update_pr_status(args.pr_number)

    # 8. Post Results
    post_pr_comment(args.pr_number, results, failure, session_link, analyzer_summary)

    # 9. User Testing (If successful and requested)
    if not failure and is_git_clean and args.start:
        print("\n[SUCCESS] All checks passed!")
        print("[STEP] Preparing for manual verification...")

        # Ensure secrets are provisioned (in case they weren't earlier)
        if SECRETS_AVAILABLE:
            secrets_ops.provision_secrets(worktree_path)

        prod_script = os.path.join(worktree_path, "start-production.sh")
        if os.path.exists(prod_script) and os.access(prod_script, os.X_OK):
            print(f"\n[INFO] Launching production server: {prod_script}")
            print("       Press Ctrl+C to stop and finish.")
            try:
                # Run interactively
                subprocess.run([prod_script], cwd=worktree_path)
            except KeyboardInterrupt:
                print("\n[STOP] Server stopped by user.")
        else:
            print("[WARN] start-production.sh not found or not executable.")
    elif not failure and is_git_clean:
        print("\n[SUCCESS] All checks passed. Use --start to run server.")

    print("\n[DONE] Process Complete.")


if __name__ == "__main__":
    main()
