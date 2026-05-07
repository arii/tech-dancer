import os
import argparse
import json
from python.github_service import GithubService
from python.gemini_service import GeminiService
from python.jules_service import JulesService
from dotenv import load_dotenv

load_dotenv()

def main():
    parser = argparse.ArgumentParser(description="Repo Management CLI")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")

    # Repo Briefing
    briefing_parser = subparsers.add_parser("briefing", help="Generate a repository briefing")
    briefing_parser.add_argument("repo", help="Repository name (owner/repo)")

    # Workflow Audit
    workflow_parser = subparsers.add_parser("audit-workflows", help="Analyze workflow health")
    workflow_parser.add_argument("repo", help="Repository name (owner/repo)")
    workflow_parser.add_argument("--run-id", type=int, help="Specific run ID to analyze")

    # Backlog Audit
    backlog_parser = subparsers.add_parser("audit-backlog", help="Analyze backlog maintenance")
    backlog_parser.add_argument("repo", help="Repository name (owner/repo)")

    # PR Health
    pr_health_parser = subparsers.add_parser("pr-health", help="Analyze PR health")
    pr_health_parser.add_argument("repo", help="Repository name (owner/repo)")

    # Technical Audit
    tech_audit_parser = subparsers.add_parser("tech-audit", help="Run a technical audit")
    tech_audit_parser.add_argument("repo", help="Repository name (owner/repo)")
    tech_audit_parser.add_argument("agent_type", choices=['full-stack', 'testing', 'performance', 'frontend', 'cicd', 'security'], help="Type of agent")

    # Jules Cleanup
    jules_cleanup_parser = subparsers.add_parser("jules-cleanup", help="Analyze Jules sessions for cleanup")
    jules_cleanup_parser.add_argument("repo", help="Repository name (owner/repo)")

    args = parser.parse_args()

    github_token = os.environ.get("GITHUB_TOKEN")
    gemini_key = os.environ.get("GEMINI_API_KEY")
    jules_key = os.environ.get("JULES_API_KEY") or gemini_key # Fallback or separate key

    if not github_token:
        print("Error: GITHUB_TOKEN environment variable not set.")
        return
    if not gemini_key:
        print("Error: GEMINI_API_KEY environment variable not set.")
        return

    github = GithubService(github_token)
    gemini = GeminiService(gemini_key)

    if args.command == "briefing":
        print(f"Generating briefing for {args.repo}...")
        stats = github.fetch_repo_stats(args.repo)
        issues = github.fetch_issues(args.repo)
        prs = github.fetch_pull_requests(args.repo)
        velocity = github.get_velocity(args.repo)

        briefing = gemini.generate_repo_briefing(stats, velocity, issues[:5], prs[:5])
        print("\n--- Briefing ---\n")
        print(briefing)

    elif args.command == "audit-workflows":
        print(f"Auditing workflows for {args.repo}...")
        if args.run_id:
             # Analyze specific run
            runs = github.fetch_workflow_runs(args.repo)
            run = next((r for r in runs if r['id'] == args.run_id), None)
            if not run:
                print(f"Run {args.run_id} not found.")
                return
            jobs = github.fetch_workflow_run_jobs(args.repo, args.run_id)
            result = gemini.analyze_workflow_health(run, jobs)
            print(json.dumps(result, indent=2))
        else:
            # Qualitative analysis
            workflows = github.fetch_workflows_content(args.repo)
            runs = github.fetch_workflow_runs(args.repo)
            context = github.fetch_core_repo_context(args.repo)
            result = gemini.analyze_workflow_qualitative(workflows, runs, context)
            print(json.dumps(result, indent=2))

    elif args.command == "audit-backlog":
        print(f"Auditing backlog for {args.repo}...")
        issues = github.fetch_issues(args.repo)
        templates = github.fetch_repo_templates(args.repo)
        result = gemini.analyze_backlog_maintenance(issues, {'templates': templates})
        print(json.dumps(result, indent=2))

    elif args.command == "pr-health":
        print(f"Analyzing PR health for {args.repo}...")
        prs = github.fetch_pull_requests(args.repo)
        result = gemini.analyze_pull_requests(prs)
        print(json.dumps(result, indent=2))

    elif args.command == "tech-audit":
        print(f"Running technical audit ({args.agent_type}) for {args.repo}...")
        context = github.fetch_core_repo_context(args.repo)
        result = gemini.run_technical_audit(args.agent_type, context)
        print(json.dumps(result, indent=2))

    elif args.command == "jules-cleanup":
        if not jules_key:
             print("Error: JULES_API_KEY environment variable not set.")
             return
        jules = JulesService(jules_key)
        print(f"Analyzing Jules sessions for cleanup in {args.repo}...")

        # This requires matching sessions to repo, which might be tricky if we don't filter by source
        # For now, we'll list all sessions and try to match
        sessions = jules.list_sessions()
        all_prs = github.fetch_pull_requests(args.repo, 'all')
        all_issues = github.fetch_issues(args.repo, 'all')

        result = gemini.analyze_jules_cleanup(sessions, all_prs, all_issues)
        print(json.dumps(result, indent=2))

    else:
        parser.print_help()

if __name__ == "__main__":
    main()
