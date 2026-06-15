import argparse

from dev_tools_sdk.config import load_project_config
from dev_tools_sdk.orchestrator import Orchestrator


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="SDK CLI")
    subparsers = parser.add_subparsers(dest="group")

    gh = subparsers.add_parser("gh")
    gh_subs = gh.add_subparsers(dest="command")
    audit = gh_subs.add_parser("audit")
    audit.add_argument("pr", type=int)

    ai = subparsers.add_parser("ai")
    ai_subs = ai.add_subparsers(dest="command")
    review = ai_subs.add_parser("review")
    review.add_argument("pr", type=int)
    analyze = ai_subs.add_parser("analyze")
    analyze.add_argument("path", type=str)

    jules = subparsers.add_parser("jules")
    jules_subs = jules.add_subparsers(dest="command")
    jules_subs.add_parser("sync")

    antigravity = subparsers.add_parser("antigravity")
    antigravity_subs = antigravity.add_subparsers(dest="command")
    antigravity_subs.add_parser("sync")

    repair = subparsers.add_parser("repair")
    repair_subs = repair.add_subparsers(dest="command")
    repair_subs.add_parser("local")

    env = subparsers.add_parser("env")
    env_subs = env.add_subparsers(dest="command")
    env_subs.add_parser("verify")

    return parser


def main():
    parser = build_parser()
    args = parser.parse_args()
    config = load_project_config()
    orchestrator = Orchestrator(config)

    if args.group == "env" and args.command == "verify":
        print(orchestrator.env_verify())


if __name__ == "__main__":
    main()
