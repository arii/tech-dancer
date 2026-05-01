import os
import json
import sys
from gh_client import get_gh_variable, set_gh_variable
from repo_utils import get_bundle_size, get_any_count

def resolve_baseline(file_path: str | None, env_var: str, default_file: str, fallback_value: int) -> int:
    """Resolves a baseline value from CLI argument, environment variable, GitHub variable, or default file."""
    if file_path and os.path.exists(file_path):
        with open(file_path, 'r') as f:
            return int(f.read().strip() or fallback_value)

    env_val = os.environ.get(env_var)
    if env_val:
        return int(env_val)

    # Try fetching from GitHub Variable
    gh_val = get_gh_variable(env_var)
    if gh_val:
        return int(gh_val)

    if os.path.exists(default_file):
        with open(default_file, 'r') as f:
            return int(f.read().strip() or fallback_value)

    return fallback_value

def handle_ratchet_any(args):
    current = get_any_count()
    baseline = resolve_baseline(args.baseline_file, 'ANY_COUNT_BASELINE', "any-count.txt", 0)

    res = {"current": current, "baseline": baseline}
    if not args.json: print(f"TypeScript 'any' Ratchet: Current={current}, Baseline={baseline}")

    if current > baseline:
        msg = f"'any' count increased from {baseline} to {current}."
        if args.json: print(json.dumps({"status": "error", "message": msg, "data": res}, indent=2))
        else: print(f"❌ Error: {msg}")
        sys.exit(1)

    if args.update:
        if not args.dry_run:
            if set_gh_variable("ANY_COUNT_BASELINE", str(current)):
                if not args.json: print(f"✅ Updated GitHub variable ANY_COUNT_BASELINE to {current}")
            else:
                if not args.json: print("⚠️ Failed to update GitHub variable. Falling back to file.")
                # Fallback to file update if gh CLI fails (e.g. local dev)
                update_file = args.baseline_file or "any-count.txt"
                with open(update_file, 'w') as f:
                    f.write(str(current))
        elif not args.json:
            print(f"[DRY-RUN] Would update GitHub variable ANY_COUNT_BASELINE to {current}")
    if args.json: print(json.dumps({"status": "success", "data": res}, indent=2))

def handle_bundle_size(args):
    size = get_bundle_size()
    baseline = resolve_baseline(args.baseline_file, 'BUNDLE_BASELINE_KB', ".bundle-baseline", 1000)

    res = {"size_kb": size, "baseline_kb": baseline, "threshold_kb": baseline + args.threshold}
    if not args.json: print(f"Bundle Size Check: Current={size}KB, Baseline={baseline}KB")

    if size > res["threshold_kb"]:
        msg = f"Bundle size exceeds threshold ({size}KB > {res['threshold_kb']}KB)."
        if args.json: print(json.dumps({"status": "error", "message": msg, "data": res}, indent=2))
        else: print(f"❌ Error: {msg}")
        sys.exit(1)

    if args.update:
        if not args.dry_run:
            if set_gh_variable("BUNDLE_BASELINE_KB", str(size)):
                if not args.json: print(f"✅ Updated GitHub variable BUNDLE_BASELINE_KB to {size}")
            else:
                if not args.json: print("⚠️ Failed to update GitHub variable. Falling back to file.")
                # Fallback to file update if gh CLI fails (e.g. local dev)
                update_file = args.baseline_file or ".bundle-baseline"
                with open(update_file, 'w') as f:
                    f.write(str(size))
        elif not args.json:
            print(f"[DRY-RUN] Would update GitHub variable BUNDLE_BASELINE_KB to {size}")
    if args.json: print(json.dumps({"status": "success", "data": res}, indent=2))
