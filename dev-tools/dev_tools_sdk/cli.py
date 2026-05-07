from __future__ import annotations

import argparse

from .config import load_project_config
from .orchestrator import Orchestrator


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="td-sdk-cli", description="Dev Tools SDK CLI")
    sub = parser.add_subparsers(dest="command", required=True)

    review = sub.add_parser("review", help="Run local-first AI review for a PR")
    review.add_argument("pr", type=int)

    dispatch = sub.add_parser("dispatch", help="Dispatch Jules review task")
    dispatch.add_argument("pr", type=int)

    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    orchestrator = Orchestrator(load_project_config())

    if args.command == "review":
        result = orchestrator.review_pr(args.pr)
        print(f"engine={result.engine}")
        print(result.output)
        return 0

    if args.command == "dispatch":
        status = orchestrator.dispatch_jules_review(args.pr)
        print(f"status={status}")
        return 0

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
