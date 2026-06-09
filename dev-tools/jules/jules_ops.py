#!/usr/bin/env python3
import argparse
import csv
import json
import os
import re
import shutil
import subprocess
import sys
import time
import logging
from datetime import datetime, timezone

# Import unified configuration and client
from common_config import (
    setup_logging, setup_python_path, ensure_workspace, get_data_dir,
    HRM_REPO_DIR, JULES_DEFAULT_SOURCE
)
from jules_client import get_jules_client
from github_client import GitHubClient

# Optional Pandas Import
try:
    import pandas as pd
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False

# Setup
setup_python_path()
ensure_workspace()
logger = setup_logging("jules_ops", level=logging.INFO)

# Backward compatibility
GIT_REPO_PATH = str(HRM_REPO_DIR)
DEFAULT_SOURCE = JULES_DEFAULT_SOURCE


# -------------------------------------------------------------------------
# GITHUB UTILITIES
# -------------------------------------------------------------------------

# Initialized GitHub Client
gh_client = GitHubClient(repo_path=HRM_REPO_DIR)

def fetch_issue_context(issue_number):
    logger.info(f"📥 Fetching context from Issue #{issue_number}...")
    data = gh_client.get_issue(issue_number)

    if data:
        return {
            "title": data["title"],
            "prompt": (
                f"Task: {data['title']}\n\n"
                f"Context from Issue #{issue_number}:\n"
                f"{data['body']}\n\nReference: {data['url']}"
            ),
        }
    return None


def format_time(iso_str):
    """Converts ISO string to granular relative time."""
    if not iso_str:
        return ""
    try:
        dt = datetime.fromisoformat(iso_str.replace("Z", "+00:00"))
        delta = datetime.now(dt.tzinfo) - dt
        if delta.days > 365:
            return f"{delta.days // 365}y ago"
        if delta.days > 0:
            return f"{delta.days}d ago"
        hours = delta.seconds // 3600
        if hours > 0:
            return f"{hours}h ago"
        minutes = (delta.seconds % 3600) // 60
        return f"{minutes}m ago"
    except ValueError:
        return iso_str


def get_state_icon(state, created_at_iso):
    """Returns an icon based on state and staleness."""
    if state == "SUCCEEDED":
        return "✅"
    if state in ["FAILED", "CANCELLED", "TERMINATED"]:
        return "🔴"

    # Check for stale running sessions (> 24 hours)
    if state == "RUNNING":
        try:
            dt = datetime.fromisoformat(created_at_iso.replace("Z", "+00:00"))
            delta = datetime.now(dt.tzinfo) - dt
            if delta.days >= 1:
                return "🐢"  # Stale/Slow
        except Exception:
            pass
        return "🏃"

    return "⚪"


# -------------------------------------------------------------------------
# 3. DATA PROCESSING & CORRELATION
# -------------------------------------------------------------------------


def extract_issue_id(text):
    """Heuristic to find Issue ID in branches/titles."""
    if not text:
        return None
    match = re.search(r"#(\d+)", text)
    if match:
        return match.group(1)
    match = re.search(r"issue[-/](\d+)", text, re.IGNORECASE)
    if match:
        return match.group(1)
    return None


def normalize_sessions(sessions):
    data = []
    for s in sessions:
        outputs = s.get("outputs", [])
        pr_url = None
        for o in outputs:
            if "pullRequest" in o:
                pr_url = o["pullRequest"].get("url")
                break

        sid = (
            s.get("name", "").split("/")[-1]
            if "/" in s.get("name", "")
            else s.get("name", "N/A")
        )

        # Extract branch directly from session sourceContext
        session_branch = (
            s.get("sourceContext", {})
            .get("githubRepoContext", {})
            .get("startingBranch")
        )

        data.append(
            {
                "id": sid,
                "full_name": s.get("name"),
                "state": s.get("state"),
                "created_at": s.get("createTime"),
                "title": s.get("title", "").split("\n")[0],
                "pr_url": pr_url,
                "branch": session_branch,  # Add the branch here
            }
        )
    return data


def normalize_issues(issues):
    data = []
    for i in issues:
        assignees = [a["login"] for a in i.get("assignees", [])]
        data.append(
            {
                "id": str(i.get("number")),
                "title": i.get("title"),
                "assignees": ", ".join(assignees),
                "updated_at": i.get("updatedAt"),
                "url": i.get("url"),
            }
        )
    return data


def normalize_prs(prs):
    data = []
    for p in prs:
        data.append(
            {
                "id": str(p.get("number")),
                "title": p.get("title"),
                "branch": p.get("headRefName"),
                "review": p.get("reviewDecision"),
                "updated_at": p.get("updatedAt"),
                "url": p.get("url"),
            }
        )
    return data


def correlate_data(sessions, issues, prs):
    """Groups data into Workstreams."""
    normalized_sessions = normalize_sessions(sessions)
    normalized_issues = normalize_issues(issues)
    normalized_prs = normalize_prs(prs)

    issue_map = {i["id"]: i for i in normalized_issues}
    pr_map_by_url = {p["url"]: p for p in normalized_prs}

    workstreams = []

    # 1. Start with Sessions
    for s in normalized_sessions:
        row = {
            "session_id": s["id"],
            "session_state": s["state"],
            "session_title": s["title"],
            "session_created": s["created_at"],
            "last_activity": s["created_at"],  # default
            "pr_id": None,
            "pr_status": None,
            "branch": s["branch"],  # Initialize branch from session data
            "issue_id": None,
            "issue_title": None,
        }

        # Link PR
        if s["pr_url"] and s["pr_url"] in pr_map_by_url:
            pr = pr_map_by_url[s["pr_url"]]
            row["pr_id"] = f"#{pr['id']}"
            row["pr_status"] = pr["review"]
            row["branch"] = pr["branch"]
            row["last_activity"] = pr[
                "updated_at"
            ]  # PR update is newer than session create

            # Link Issue via PR
            found_issue = extract_issue_id(pr["branch"]) or extract_issue_id(
                pr["title"]
            )
            if found_issue:
                row["issue_id"] = f"#{found_issue}"
                if found_issue in issue_map:
                    row["issue_title"] = issue_map[found_issue]["title"]

        # Link Issue via Session Title
        if not row["issue_id"]:
            found_issue = extract_issue_id(s["title"])
            if found_issue:
                row["issue_id"] = f"#{found_issue}"
                if found_issue in issue_map:
                    row["issue_title"] = issue_map[found_issue]["title"]

        workstreams.append(row)

    # 2. Catch Orphan PRs
    linked_pr_urls = {s["pr_url"] for s in normalized_sessions if s["pr_url"]}
    for p in normalized_prs:
        if p["url"] not in linked_pr_urls:
            iid = extract_issue_id(p["branch"]) or extract_issue_id(p["title"])
            workstreams.append(
                {
                    "session_id": "-",
                    "session_state": "-",
                    "session_title": "-",
                    "session_created": "-",
                    "last_activity": p["updated_at"],
                    "pr_id": f"#{p['id']}",
                    "pr_status": p["review"],
                    "branch": p["branch"],
                    "issue_id": f"#{iid}" if iid else None,
                    "issue_title": (
                        issue_map[iid]["title"]
                        if (iid and iid in issue_map)
                        else None
                    ),
                }
            )

    # Sort by last_activity
    workstreams.sort(key=lambda x: x.get("last_activity") or "", reverse=True)
    return workstreams


# -------------------------------------------------------------------------
# 4. DASHBOARD & EXPORT
# -------------------------------------------------------------------------


def print_pandas_dashboard(sessions, issues, prs):
    workstreams = correlate_data(sessions, issues, prs)
    df_ws = pd.DataFrame(workstreams)

    print("\n" + "=" * 100)
    print(" 🔗 ACTIVE WORKSTREAMS (Grouped)")
    print("=" * 100)
    if not df_ws.empty:
        view = df_ws[
            [
                "issue_id",
                "issue_title",
                "session_id",
                "session_state",
                "pr_id",
                "pr_status",
                "last_activity",
            ]
        ].copy()
        view["last_activity"] = view["last_activity"].apply(format_time)

        # Rename for display
        view.rename(
            columns={
                "issue_id": "Issue",
                "issue_title": "Task",
                "session_id": "Jules ID",
                "session_state": "State",
                "pr_id": "PR",
                "pr_status": "Review",
                "last_activity": "Updated",
            },
            inplace=True,
        )

        view["Task"] = view["Task"].apply(
            lambda x: (str(x)[:30] + "..") if x and len(str(x)) > 30 else x
        )
        print(view.to_string(index=False))
    else:
        print("No active workstreams found.")

    print("\n" + "-" * 100)
    print(" 📢 BACKLOG (Unassigned Issues)")
    print("-" * 100)

    assigned_ids = set()
    for w in workstreams:
        if w["issue_id"]:
            assigned_ids.add(w["issue_id"].replace("#", ""))

    norm_issues = normalize_issues(issues)
    backlog = [i for i in norm_issues if i["id"] not in assigned_ids]

    df_bl = pd.DataFrame(backlog)
    if not df_bl.empty:
        view_bl = df_bl[["id", "title", "updated_at"]].copy()
        view_bl["updated_at"] = view_bl["updated_at"].apply(format_time)
        print(view_bl.to_string(index=False))
    else:
        print("No orphaned issues.")


def print_dashboard(sessions, issues, prs):
    workstreams = correlate_data(sessions, issues, prs)

    print("\nACTIVE WORKSTREAMS (Correlated)")
    print(
        f"{'UPDATED':<9} {'ISSUE':<8} {'SESSION':<18} {'ST':<4} "
        f"{'PR':<6} {'REV':<4} {'TASK'}"
    )
    print("-" * 100)

    for w in workstreams[:25]:
        updated = format_time(w["last_activity"])[:9]
        issue = w["issue_id"] or "-"
        sess = w["session_id"][:16] or "-"

        # Use Icon for state
        state_icon = get_state_icon(w["session_state"], w["session_created"])

        pr = w["pr_id"] or "-"

        # Review Icon
        rev = w["pr_status"] or ""
        rev_icon = (
            "✅"
            if rev == "APPROVED"
            else (
                "🚫"
                if rev == "CHANGES_REQUESTED"
                else "👀" if rev == "REVIEW_REQUIRED" else "-"
            )
        )

        task = w["issue_title"] or w["session_title"] or ""

        print(
            f"{updated:<9} {issue:<8} {sess:<18} "
            f"{state_icon:<4} {pr:<6} {rev_icon:<4} {task[:35]}"
        )

    print("\n📢 OPEN ISSUES (Raw List)")
    print(f"{'ID':<6} {'UPDATED':<10} {'TITLE'}")
    print("-" * 80)
    for i in issues[:10]:
        print(
            f"#{i['number']:<5} {format_time(i['updatedAt']):<10} "
            f"{i['title'][:60]}"
        )


def export_data(sessions, issues, prs, fmt="csv"):
    """Exports data to files, using Pandas if available."""
    workstreams = correlate_data(sessions, issues, prs)
    data_dir = get_data_dir()

    datasets = {
        "jules_sessions": normalize_sessions(sessions),
        "github_issues": normalize_issues(issues),
        "github_prs": normalize_prs(prs),
        "consolidated_workstreams": workstreams,
    }

    logger.info(f"💾 Exporting data in {fmt.upper()} format to {data_dir}...")

    for name, data in datasets.items():
        filename = data_dir / f"{name}.{fmt}"
        if not data:
            continue

        try:
            if HAS_PANDAS:
                # Use Pandas for robust export
                df = pd.DataFrame(data)
                if fmt == "csv":
                    df.to_csv(filename, index=False)
                elif fmt == "json":
                    df.to_json(filename, orient="records", indent=2)
            else:
                # Fallback to standard library
                if fmt == "csv":
                    with open(
                        filename, "w", newline="", encoding="utf-8"
                    ) as f:
                        writer = csv.DictWriter(f, fieldnames=data[0].keys())
                        writer.writeheader()
                        writer.writerows(data)
                elif fmt == "json":
                    with open(filename, "w", encoding="utf-8") as f:
                        json.dump(data, f, indent=2)

            logger.info(f"  ✅ Saved {filename}")
        except Exception as e:
            logger.error(f"  ❌ Failed to save {filename}: {e}")


def generate_markdown_summary(sessions):
    filename = "jules_sessions_summary.md"
    sessions.sort(key=lambda s: s.get("createTime", ""), reverse=True)

    header = "| Session Name | State | Age | Title | PR Link |\n"
    separator = "|---|---|---|---|---|\n"

    try:
        with open(filename, "w") as f:
            f.write(
                f"# Jules Session Summary\nGenerated: {datetime.now()}\n\n"
            )
            f.write(header)
            f.write(separator)

            for session in sessions:
                name = session.get("name", "N/A").split("/")[-1]
                state = session.get("state", "N/A")
                created = session.get("createTime", "")
                age = format_time(created)
                title = session.get("title", "N/A")

                pr_link = ""
                outputs = session.get("outputs", [])
                for output in outputs:
                    if "pullRequest" in output:
                        pr_url = output["pullRequest"].get("url", "")
                        pr_link = f"[PR]({pr_url})"
                        break

                f.write(
                    f"| {name} | {state} | {age} | {title} | {pr_link} |\n"
                )
        logger.info(f"📄 Summary generated: {filename}")
    except Exception as e:
        logger.error(f"Failed to generate summary: {e}")


# -------------------------------------------------------------------------
# 5. MAIN CLI
# -------------------------------------------------------------------------


def main():
    parser = argparse.ArgumentParser(
        description="Jules Ops & GitHub Sync Tool"
    )
    parser.add_argument(
        "--api-key", help="Jules API Key (or set JULES_API_KEY env)"
    )

    subparsers = parser.add_subparsers(
        dest="command", help="Available commands"
    )

    # Status
    p_status = subparsers.add_parser("status", help="Show unified Dashboard")
    p_status.add_argument(
        "--style",
        choices=["table", "pandas"],
        default="table",
        help="Output style",
    )

    # Export
    p_export = subparsers.add_parser("export", help="Export data to files")
    p_export.add_argument(
        "--format",
        choices=["csv", "json"],
        default="csv",
        help="Export format",
    )

    # Create / Work-on
    p_create = subparsers.add_parser(
        "create", help="Create session from prompt"
    )
    p_create.add_argument("--prompt", required=True, help="Instruction text")
    p_create.add_argument("--branch", help="Target branch")
    p_create.add_argument("--title", help="Session title")
    p_create.add_argument(
        "--source",
        default=DEFAULT_SOURCE,
        help="Source name (default: github/arii/hrm)",
    )
    p_create.add_argument(
        "--no-watch", action="store_true", help="Don't watch after creating"
    )

    p_work = subparsers.add_parser(
        "work-on", help="Create session from GitHub Issue"
    )
    p_work.add_argument("issue_id", type=int, help="GitHub Issue Number")
    p_work.add_argument("--branch", help="Target branch (optional)")

    # Session Management
    p_watch = subparsers.add_parser("watch", help="Monitor a session")
    p_watch.add_argument("session_name", help="Session ID/Name")

    p_msg = subparsers.add_parser("message", help="Send message to session")
    p_msg.add_argument("session_name", help="Session ID/Name")
    p_msg.add_argument("text", help="Message text")

    p_pub = subparsers.add_parser("publish", help="Tell Jules to publish PR")
    p_pub.add_argument("session_name", help="Session ID/Name")

    p_del = subparsers.add_parser("delete", help="Delete a session")
    p_del.add_argument("session_name", help="Session ID/Name")

    p_del_old = subparsers.add_parser(
        "delete-old", help="Delete sessions older than N hours"
    )
    p_del_old.add_argument(
        "hours_old", type=int, default=10, help="Sessions older than this many hours will be deleted"
    )

    # Health Check
    p_health = subparsers.add_parser(
        "health-check", help="Check session health and identify stalled/orphaned sessions"
    )
    p_health.add_argument(
        "--clean", action="store_true", help="Automatically delete stalled/orphaned sessions"
    )

    subparsers.add_parser("list-sources", help="List available Jules sources")
    subparsers.add_parser(
        "summary", help="Generate Markdown summary of sessions"
    )

    args = parser.parse_args()

    # --- Execution ---
    if args.command is None:
        parser.print_help()
        return

    # Initialize Client
    client = get_jules_client(api_key=args.api_key)

    # Common Fetch Logic for Status and Export
    if args.command in ["status", "export"]:
        logger.info("🔄 Refreshing data from Jules and GitHub...")
        sessions = client.list_sessions()

        issues = gh_client.list_issues(state="open", limit=100)
        prs = gh_client.list_prs(state="open", limit=100)

        if args.command == "status":
            if args.style == "pandas":
                if HAS_PANDAS:
                    print_pandas_dashboard(sessions, issues, prs)
                else:
                    logger.warning(
                        "Pandas is not installed. Falling back to table view."
                    )
                    print_dashboard(sessions, issues, prs)
            else:
                print_dashboard(sessions, issues, prs)

        elif args.command == "export":
            export_data(sessions, issues, prs, fmt=args.format)

    elif args.command == "create":
        session_name = client.create_session(
            args.prompt, args.source, args.branch, args.title
        )
        if session_name:
            print(f"✅ Session started: {session_name}")
            if not args.no_watch:
                client.monitor_session(session_name)

    elif args.command == "work-on":
        data = fetch_issue_context(args.issue_id)
        if not data:
            logger.error("Could not fetch issue data.")
            sys.exit(1)

        branch_name = args.branch or f"feature/issue-{args.issue_id}"
        logger.info(
            f"Assigning Jules  Issue #{args.issue_id} -> Branch: {branch_name}"
        )
        session_name = client.create_session(
            prompt=data["prompt"],
            source=DEFAULT_SOURCE,
            branch=branch_name,
            title=f"Fix: {data['title']} (#{args.issue_id})",
        )

        if session_name:
            print(f"✅ Session started: {session_name}")
            client.monitor_session(session_name)

    elif args.command == "watch":
        client.monitor_session(args.session_name)

    elif args.command == "message":
        if client.send_message(args.session_name, args.text):
            logger.info("📨 Message sent.")
            client.monitor_session(args.session_name)

    elif args.command == "publish":
        if client.send_message(
            args.session_name,
            "Please publish the branch and create the Pull Request now.",
        ):
            logger.info("📨 Publish request sent to Jules.")
            logger.info("   Monitoring for PR link...")
            client.monitor_session(args.session_name)

    elif args.command == "delete":
        client.delete_session(args.session_name)

    elif args.command == "delete-old":
        # New command to delete old sessions
        hours_old = args.hours_old
        logger.info(f"🗑️ Deleting sessions older than {hours_old} hours...")
        sessions = client.list_sessions()
        deleted_count = 0
        for s in sessions:
            created_at_iso = s.get("createTime")
            if created_at_iso:
                try:
                    dt_utc = datetime.fromisoformat(created_at_iso.replace("Z", "+00:00"))
                    now_utc = datetime.now(timezone.utc)
                    delta = now_utc - dt_utc

                    if delta.total_seconds() > hours_old * 3600:
                        session_id = (
                            s.get("name", "").split("/")[-1]
                            if "/" in s.get("name", "")
                            else s.get("name", "N/A")
                        )
                        logger.info(f"    Deleting session: {session_id} (Created: {format_time(created_at_iso)})")
                        client.delete_session(session_id)
                        deleted_count += 1
                        time.sleep(1)  # Add a delay to avoid rate-limiting
                except ValueError as e:
                    logger.warning(f"Could not parse createTime '{created_at_iso}' for session {s.get('name', 'N/A')}: {e}")
        logger.info(f"✅ Deleted {deleted_count} sessions older than {hours_old} hours.")

    elif args.command == "health-check":
        logger.info("🏥 Running Session Health Check...")
        sessions = client.list_sessions()
        prs = gh_client.list_prs(state="all", limit=100) # Need closed/merged too

        pr_map = {p['url']: p for p in prs}

        stalled_sessions = []
        orphaned_sessions = []

        now_utc = datetime.now(timezone.utc)

        for s in sessions:
            sid = s.get("name", "").split("/")[-1]
            state = s.get("state")
            created_at_iso = s.get("createTime")

            # Check stalled: Running for > 24h
            if state == "RUNNING" and created_at_iso:
                try:
                    dt_utc = datetime.fromisoformat(created_at_iso.replace("Z", "+00:00"))
                    if (now_utc - dt_utc).total_seconds() > 24 * 3600:
                        stalled_sessions.append(s)
                except ValueError:
                    pass

            # Check orphaned: Associated PR is closed/merged but session is active
            outputs = s.get("outputs", [])
            for o in outputs:
                if "pullRequest" in o:
                    pr_url = o["pullRequest"].get("url")
                    if pr_url in pr_map:
                        pr = pr_map[pr_url]
                        if pr['state'] in ['MERGED', 'CLOSED'] and state not in ['SUCCEEDED', 'FAILED', 'CANCELLED', 'TERMINATED']:
                            orphaned_sessions.append((s, pr['state']))

        if not stalled_sessions and not orphaned_sessions:
            print("✅ All sessions look healthy.")
        else:
            if stalled_sessions:
                print(f"\n🐢 Found {len(stalled_sessions)} Stalled Sessions (>24h running):")
                for s in stalled_sessions:
                    print(f"  - {s.get('name')} ({s.get('title')})")

            if orphaned_sessions:
                print(f"\n👻 Found {len(orphaned_sessions)} Orphaned Sessions (PR closed/merged):")
                for s, status in orphaned_sessions:
                    print(f"  - {s.get('name')} (PR Status: {status})")

            if args.clean:
                print("\n🧹 Cleaning up unhealthy sessions...")
                for s in stalled_sessions:
                    sid = s.get("name", "").split("/")[-1]
                    logger.info(f"Deleting stalled session {sid}...")
                    client.delete_session(sid)

                for s, _ in orphaned_sessions:
                    sid = s.get("name", "").split("/")[-1]
                    logger.info(f"Deleting orphaned session {sid}...")
                    client.delete_session(sid)
                print("✅ Cleanup complete.")
            else:
                print("\nUse --clean to delete these sessions.")

    elif args.command == "list-sources":
        sources = client.list_sources()
        print(f"\nFound {len(sources)} sources:")
        for s in sources:
            print(f"- {s.get('name')} (ID: {s.get('id')})")

    elif args.command == "summary":
        sessions = client.list_sessions()
        generate_markdown_summary(sessions)


if __name__ == "__main__":
    main()
