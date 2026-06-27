import argparse
import sys
import os
import json
from collections import defaultdict

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from utils import get_github_client, get_repo_name


def main():
    parser = argparse.ArgumentParser(description="Identify and propose consolidation of Pull Requests (PRs) that demonstrate high levels of functional or structural overlap.")
    parser.add_argument("--limit", type=int, default=50, help="Limit the number of open PRs to process (default: 50)")
    parser.add_argument("--no-cache", action="store_true", help="Bust the cache and force fetching data from GitHub")
    args = parser.parse_args()

    CACHE_FILE = ".pr_cache.json"
    limit = args.limit

    def get_open_prs(limit):
        try:
            client = get_github_client()
            repo = client.get_repo(get_repo_name())
            pulls = repo.get_pulls(state='open')
            prs = []
            for pr in list(pulls)[:limit]:
                prs.append({"number": pr.number, "title": pr.title})
            return prs
        except Exception as e:
            print(f"Error fetching open PRs: {e}", file=sys.stderr)
            sys.exit(1)

    def get_pr_files(pr_number):
        try:
            client = get_github_client()
            repo = client.get_repo(get_repo_name())
            pr = repo.get_pull(int(pr_number))
            files = pr.get_files()
            return [f.filename for f in files if not f.filename.startswith("tests/visual.spec.ts-snapshots/")]
        except Exception as e:
            print(f"Error fetching files for PR #{pr_number}: {e}", file=sys.stderr)
            return []

    if not args.no_cache and os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, 'r') as f:
            cache = json.load(f)
    else:
        cache = {"prs": {}, "files": {}}

    current_prs = get_open_prs(limit)
    for pr in current_prs:
        num = str(pr['number'])
        cache["prs"][num] = pr['title']
        cache["files"][num] = get_pr_files(num)

    with open(CACHE_FILE, 'w') as f:
        json.dump(cache, f, indent=2)

    # Convert lists to sets for calculations
    pr_files_sets = {num: set(files) for num, files in cache["files"].items()}

    # 1. Report specific exact-match overlap groups
    overlap_groups = defaultdict(list)
    all_prs_nums = list(pr_files_sets.keys())

    # We want to group PRs that share any file
    # This logic is slightly different from original which grouped by frozenset of PRs
    # but original only did exact frozenset matches. Let's stick to files.

    file_to_prs = defaultdict(list)
    for pr_num, files in pr_files_sets.items():
        for file in files:
            file_to_prs[file].append(pr_num)

    exact_match_groups = defaultdict(list)
    for file, pr_nums in file_to_prs.items():
        if len(pr_nums) > 1:
            exact_match_groups[frozenset(pr_nums)].append(file)

    print("--- EXACT OVERLAP GROUPS ---")
    for pr_set, files in sorted(exact_match_groups.items(), key=lambda x: len(x[1]), reverse=True):
        pr_list = sorted(list(pr_set), key=int)
        print(f"PRs {', '.join(pr_list)} overlap on {len(files)} files:")
        for pr in pr_list:
            print(f"  [{pr}] {cache['prs'].get(pr, 'Unknown PR')}")
        for f in sorted(files):
            print(f"    - {f}")

    # 2. Report connected clusters
    print("\n--- CONNECTED CLUSTERS ---")
    graph = defaultdict(set)
    for i, pr1 in enumerate(all_prs_nums):
        for pr2 in all_prs_nums[i+1:]:
            if pr_files_sets[pr1] & pr_files_sets[pr2]:
                graph[pr1].add(pr2)
                graph[pr2].add(pr1)

    visited = set()
    for pr in all_prs_nums:
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
                involved_files |= pr_files_sets[p]

            print(f"Cluster PRs {', '.join(comp_list)}:")
            for p in comp_list:
                print(f"  [{p}] {cache['prs'].get(p, 'Unknown PR')}")
            print("  All files touched by this cluster:")
            for f in sorted(list(involved_files)):
                print(f"    - {f}")
            print("-" * 40)

if __name__ == "__main__":
    main()
