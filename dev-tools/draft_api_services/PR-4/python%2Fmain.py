import argparse
import os
import sys
import json
from dotenv import load_dotenv

from orchestration_service import OrchestrationService

def main():
    load_dotenv()

    parser = argparse.ArgumentParser(description="AI Developer Tools CLI")
    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    # Command: review
    parser_review = subparsers.add_parser("review", help="Review a PR with AI")
    parser_review.add_argument("repo", help="Repository in 'owner/repo' format")
    parser_review.add_argument("pr_number", type=int, help="Pull Request number")

    # Command: jules-task
    parser_jules = subparsers.add_parser("jules-task", help="Start a Jules session")
    parser_jules.add_argument("repo", help="Repository in 'owner/repo' format")
    parser_jules.add_argument("branch", help="Starting branch name")
    parser_jules.add_argument("prompt", help="Prompt for Jules")
    parser_jules.add_argument("--title", help="Optional title for the session")

    # Command: workflow-audit
    parser_audit = subparsers.add_parser("workflow-audit", help="Audit a failed workflow run")
    parser_audit.add_argument("repo", help="Repository in 'owner/repo' format")
    parser_audit.add_argument("run_id", type=int, help="Workflow run ID to diagnose")

    # Command: sync-audit
    parser_sync = subparsers.add_parser("sync-audit", help="Analyze PR for sync and conflict issues")
    parser_sync.add_argument("repo", help="Repository in 'owner/repo' format")
    parser_sync.add_argument("pr_number", type=int, help="Pull Request number")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    try:
        orchestrator = OrchestrationService()

        if args.command == "review":
            print(f"Reviewing PR #{args.pr_number} in {args.repo}...")
            result = orchestrator.review_pr_with_ai(args.repo, args.pr_number)
            print(json.dumps(result, indent=2))

        elif args.command == "jules-task":
            print(f"Starting Jules task on {args.repo} ({args.branch})...")
            result = orchestrator.start_jules_task(args.repo, args.branch, args.prompt, args.title)
            print(f"\nJules Session Created!")
            print(f"URL: {result.get('ui_url')}")
            print(f"Name: {result.get('name')}")

        elif args.command == "workflow-audit":
            print(f"Auditing workflow run {args.run_id} in {args.repo}...")
            result = orchestrator.diagnose_failed_workflows(args.repo, args.run_id)
            print(json.dumps(result, indent=2))

        elif args.command == "sync-audit":
            print(f"Analyzing PR #{args.pr_number} in {args.repo} for sync issues...")
            result = orchestrator.analyze_sync_issues(args.repo, args.pr_number)
            print(json.dumps(result, indent=2))

    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
