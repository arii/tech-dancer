from __future__ import annotations

import argparse
import json

from .config import load_project_config
from .orchestrator import Orchestrator


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="td-sdk-cli", description="Dev Tools SDK CLI")
    root = parser.add_subparsers(dest="group", required=True)

    gh = root.add_parser("gh", help="GitHub operations")
    gh_sub = gh.add_subparsers(dest="command", required=True)
    gh_view = gh_sub.add_parser("view", help="Display PR summary")
    gh_view.add_argument("pr", type=int)
    gh_resolve = gh_sub.add_parser("resolve", help="Attempt conflict resolution")
    gh_resolve.add_argument("pr", type=int)
    gh_resolve.add_argument("--execute", action="store_true", help="Apply non-dry-run behavior")

    ai = root.add_parser("ai", help="AI operations")
    ai_sub = ai.add_subparsers(dest="command", required=True)
    ai_review = ai_sub.add_parser("review", help="Run local-first AI review")
    ai_review.add_argument("pr", type=int)

    jules = root.add_parser("jules", help="Jules agent operations")
    jules_sub = jules.add_subparsers(dest="command", required=True)
    jules_dispatch = jules_sub.add_parser("dispatch", help="Dispatch review task")
    jules_dispatch.add_argument("pr", type=int)

    env = root.add_parser("env", help="Environment checks")
    env_sub = env.add_subparsers(dest="command", required=True)
    env_sub.add_parser("verify", help="Verify runtime integrations")

    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    orchestrator = Orchestrator(load_project_config())

    if args.group == "gh" and args.command == "view":
        print(json.dumps(orchestrator.view_pr(args.pr), indent=2))
        return 0

    if args.group == "gh" and args.command == "resolve":
        print(orchestrator.resolve_pr(args.pr, dry_run=not args.execute))
        return 0

    if args.group == "ai" and args.command == "review":
        result = orchestrator.review_pr(args.pr)
        print(f"engine={result.engine}")
        print(result.output)
        return 0

    if args.group == "jules" and args.command == "dispatch":
        status = orchestrator.dispatch_jules_review(args.pr)
        print(f"status={status}")
        return 0

    if args.group == "env" and args.command == "verify":
        print(json.dumps(orchestrator.env_verify(), indent=2))
        return 0

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
