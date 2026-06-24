import sys
import os
import json
import time
from typing import List, Dict, Any

try:
    from tdw_services.services.github import GitHubClient
except ImportError:
    print("Error: Could not import tdw_services. Ensure you have run `pip install -e dev-tools/` and your PYTHONPATH is set correctly (e.g., `export PYTHONPATH=$PYTHONPATH:$(pwd)/dev-tools`).")
    sys.exit(1)

def main() -> None:
    try:
        client = GitHubClient()
        repo = client.repo

        if not isinstance(repo, str) or not repo:
            raise ValueError("GitHub repository could not be determined or is not a string.")

        def fetch_prs_with_retry(retries: int = 3, delay: int = 5) -> List[Dict[str, Any]]:
            for attempt in range(retries):
                try:
                    res = client.run_authenticated_gh(['api', f'/repos/{repo}/pulls?state=all&per_page=100'])
                    return json.loads(res)
                except Exception as e:
                    print(f"Attempt {attempt+1} failed: {e}")
                    if attempt < retries - 1:
                        time.sleep(delay)
                    else:
                        raise

        def fetch_and_filter_comments(pr_number: int, endpoint: str, comment_type: str) -> List[Dict[str, Any]]:
            fetched_comments = []
            res = client.run_authenticated_gh(['api', f'/repos/{repo}/{endpoint}/{pr_number}/comments'])
            comments: List[Dict[str, Any]] = json.loads(res)
            for comment in comments:
                user_login: str = comment.get('user', {}).get('login', '')
                if 'bot' in user_login.lower() or user_login in ['github-actions[bot]', 'tech-dancer-bot']:
                    fetched_comments.append({
                        'type': comment_type,
                        'pr': pr_number,
                        'bot': user_login,
                        'body': comment['body'],
                        'html_url': comment['html_url']
                    })
            return fetched_comments

        print("Fetching PRs...")
        prs: List[Dict[str, Any]] = fetch_prs_with_retry()

        results: List[Dict[str, Any]] = []
        # Process up to 50 recent PRs
        print("Collecting AI review comments from the last 50 PRs...")
        for pr in prs[:50]:
            pr_number: int = pr['number']
            try:
                # Read issue comments and review comments
                results.extend(fetch_and_filter_comments(pr_number, 'issues', 'issue'))
                results.extend(fetch_and_filter_comments(pr_number, 'pulls', 'review'))
            except Exception as e:
                print(f"Error fetching comments for PR #{pr_number}: {e}")

        # Filter for AI review comments
        ai_comments: List[Dict[str, Any]] = [c for c in results if "AI Review" in c['body'] or "Gemini Code Review Agent" in c['body'] or "<!-- ai-review-count" in c['body']]

        with open('ai_reviews_summary.json', 'w') as f:
            json.dump(ai_comments, f, indent=2)

        print(f"Done! Collected {len(ai_comments)} AI review comments in ai_reviews_summary.json")
    except Exception as e:
        print(f"Fatal error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()