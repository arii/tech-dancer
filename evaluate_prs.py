import json
import os
import sys

# Ensure dev-tools is in path
sys.path.append(os.path.join(os.getcwd(), 'dev-tools'))

from utils import get_github_client, get_repo_name

def main():
    print("Fetching PRs...")
    gh = get_github_client()
    repo = gh.get_repo(get_repo_name())
    open_prs = list(repo.get_pulls(state='open', sort='created', direction='desc'))

    pr_data = []
    for pr in open_prs:
        if pr.number == 2540: continue
        print(f"Processing PR #{pr.number}: {pr.title}")

        files = []
        for f in pr.get_files():
            files.append({
                "filename": f.filename,
                "status": f.status,
                "patch": f.patch
            })

        checks = []
        try:
            commits = pr.get_commits()
            if commits.totalCount > 0:
                last_commit = commits[commits.totalCount - 1]
                check_runs = last_commit.get_check_runs()
                for run in check_runs:
                    checks.append({
                        "name": run.name,
                        "status": run.status,
                        "conclusion": run.conclusion
                    })
        except Exception as e:
            pass

        pr_data.append({
            "number": pr.number,
            "title": pr.title,
            "branch": pr.head.ref,
            "mergeable": pr.mergeable,
            "files": files,
            "checks": checks,
            "desc": pr.body
        })

    with open('pr_details.json', 'w') as f:
        json.dump(pr_data, f, indent=2)

    print(f"Dumped {len(pr_data)} PRs to pr_details.json")

if __name__ == "__main__":
    main()
