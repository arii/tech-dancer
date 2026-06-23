import sys
import os
sys.path.insert(0, os.path.abspath('dev-tools'))
from tdw_services.services.github import GitHubClient
import json
import time

def main():
    client = GitHubClient()
    repo = client.repo

    def fetch_prs_with_retry(retries=3, delay=5):
        for attempt in range(retries):
            try:
                return client._request('GET', f'/repos/{repo}/pulls?state=all&per_page=100')
            except Exception as e:
                print(f"Attempt {attempt+1} failed: {e}")
                if attempt < retries - 1:
                    time.sleep(delay)
                else:
                    raise

    print("Fetching PRs...")
    prs = fetch_prs_with_retry()

    results = []
    # Process up to 50 recent PRs
    print("Collecting AI review comments from the last 50 PRs...")
    for pr in prs[:50]:
        pr_number = pr['number']
        try:
            # Read comments
            comments = client._request('GET', f'/repos/{repo}/issues/{pr_number}/comments')
            for comment in comments:
                user_login = comment.get('user', {}).get('login', '')
                if 'bot' in user_login.lower() or user_login in ['github-actions[bot]', 'tech-dancer-bot']:
                    results.append({
                        'type': 'issue',
                        'pr': pr_number,
                        'bot': user_login,
                        'body': comment['body'],
                        'html_url': comment['html_url']
                    })

            # Read review comments
            review_comments = client._request('GET', f'/repos/{repo}/pulls/{pr_number}/comments')
            for comment in review_comments:
                user_login = comment.get('user', {}).get('login', '')
                if 'bot' in user_login.lower() or user_login in ['github-actions[bot]', 'tech-dancer-bot']:
                    results.append({
                        'type': 'review',
                        'pr': pr_number,
                        'bot': user_login,
                        'body': comment['body'],
                        'html_url': comment['html_url']
                    })
        except Exception as e:
            print(f"Error fetching comments for PR #{pr_number}: {e}")

    # Filter for AI review comments
    ai_comments = [c for c in results if "AI Review" in c['body'] or "Gemini Code Review Agent" in c['body'] or "<!-- ai-review-count" in c['body']]

    with open('ai_reviews_summary.json', 'w') as f:
        json.dump(ai_comments, f, indent=2)

    print(f"Done! Collected {len(ai_comments)} AI review comments in ai_reviews_summary.json")

if __name__ == '__main__':
    main()
