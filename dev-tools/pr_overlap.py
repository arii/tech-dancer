import subprocess
import json
import argparse
import sys
import os
import pickle
from collections import defaultdict

def main():
    parser = argparse.ArgumentParser(description="Identify and propose consolidation of Pull Requests (PRs) that demonstrate high levels of functional or structural overlap.")
    parser.add_argument("--limit", type=int, default=50, help="Limit the number of open PRs to process (default: 50)")
    parser.add_argument("--no-cache", action="store_true", help="Bust the cache and force fetching data from GitHub")
    args = parser.parse_args()

    CACHE_FILE = ".pr_cache.pkl"
    limit = args.limit

    def get_open_prs(limit):
        cmd = ["gh", "pr", "list", "--state", "open", "--limit", str(limit), "--json", "number,title"]
        try:
            return json.loads(subprocess.check_output(cmd, text=True))
        except subprocess.CalledProcessError as e:
            print(f"Error fetching open PRs: {e}", file=sys.stderr)
            sys.exit(1)

    def get_pr_files(pr_number):
        cmd = ["gh", "pr", "diff", str(pr_number), "--name-only"]
        try:
            files = subprocess.check_output(cmd, text=True).splitlines()
            return {f for f in files if not f.startswith("tests/visual.spec.ts-snapshots/")}
        except subprocess.CalledProcessError as e:
            print(f"Error fetching files for PR #{pr_number}: {e}", file=sys.stderr)
            return set()

    if not args.no_cache and os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, 'rb') as f:
            cache = pickle.load(f)
    else:
        cache = {"prs": {}, "files": {}}

    current_prs = get_open_prs(limit)
    for pr in current_prs:
        num = str(pr['number'])
        cache["prs"][num] = pr['title']
        cache["files"][num] = get_pr_files(num)

    with open(CACHE_FILE, 'wb') as f:
        pickle.dump(cache, f)

    # 1. Report specific exact-match overlap groups
    overlap_groups = defaultdict(list)
    for pr_num, files in cache["files"].items():
        for file in files:
            touching_prs = [p for p, fs in cache["files"].items() if file in fs]
            if len(touching_prs) > 1:
                overlap_groups[frozenset(touching_prs)].append(file)

    print("--- EXACT OVERLAP GROUPS ---")
    for pr_set, files in sorted(overlap_groups.items(), key=lambda x: len(x[1]), reverse=True):
        pr_list = sorted(list(pr_set), key=int)
        print(f"PRs {', '.join(pr_list)} overlap on {len(files)} files:")
        for pr in pr_list:
            print(f"  [{pr}] {cache['prs'].get(pr, 'Unknown PR')}")
        for f in sorted(files):
            print(f"    - {f}")

    # 2. Report connected clusters
    print("\n--- CONNECTED CLUSTERS ---")
    graph = defaultdict(set)
    all_prs = list(cache["files"].keys())
    for i, pr1 in enumerate(all_prs):
        for pr2 in all_prs[i+1:]:
            if cache["files"][pr1] & cache["files"][pr2]:
                graph[pr1].add(pr2)
                graph[pr2].add(pr1)

    visited = set()
    for pr in all_prs:
        if pr not in visited and pr in graph:
            component = {pr}
            stack = [pr]
            while stack:
                curr = stack.pop()
                for neighbor in graph[curr]:
                    if neighbor not in visited:
                        visited.add(neighbor)
                        component.add(neighbor)
                        stack.append(neighbor)
            visited.add(pr)

            comp_list = sorted(list(component), key=int)
            involved_files = set()
            for p in component:
                involved_files |= cache["files"][p]

            print(f"Cluster PRs {', '.join(comp_list)}:")
            for p in comp_list:
                print(f"  [{p}] {cache['prs'].get(p, 'Unknown PR')}")
            print("  All files touched by this cluster:")
            for f in sorted(list(involved_files)):
                print(f"    - {f}")
            print("-" * 40)

if __name__ == "__main__":
    main()
