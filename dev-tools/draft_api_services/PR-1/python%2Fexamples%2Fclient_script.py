import os
import json
from gemini_service import GeminiService
from gemini_service.models import RepoStats, GithubIssue, GithubUser, GithubPullRequest, GithubLabel

def main():
    # Ensure API_KEY is set in your environment
    if not os.environ.get("API_KEY"):
        print("Please set the API_KEY environment variable.")
        return

    service = GeminiService()

    # Example 1: Generate Repo Briefing
    print("--- Example 1: Generate Repo Briefing ---")
    stats = RepoStats(
        openIssuesCount=10,
        openPRsCount=2,
        lastUpdated="2023-10-27",
        stars=150,
        forks=30
    )
    velocity = {"opened": 5, "closed": 3}
    user = GithubUser(login="user1", avatar_url="", html_url="")
    label = GithubLabel(id=1, name="bug", color="red", description="Something is broken")
    recent_issues = [
        GithubIssue(id=1, number=101, title="Bug in login", user=user, state="open", html_url="", created_at="2023-10-26", updated_at="2023-10-26", labels=[label])
    ]
    recent_prs = [
        GithubPullRequest(id=2, node_id="node1", number=102, title="Fix login bug", user=user, state="open", html_url="", created_at="2023-10-26", updated_at="2023-10-26", draft=False, head={"ref": "fix/login", "sha": "abc"}, base={"ref": "main"}, labels=[label])
    ]

    briefing = service.generate_repo_briefing(stats, velocity, recent_issues, recent_prs)
    print(briefing)
    print("\n")

    # Example 2: Analyze Pull Requests
    print("--- Example 2: Analyze Pull Requests ---")
    pr_analysis = service.analyze_pull_requests(recent_prs)
    print(json.dumps(pr_analysis.model_dump(), indent=2))
    print("\n")

    # Example 3: Parse Issues from Text
    print("--- Example 3: Parse Issues from Text ---")
    text = "We need to fix the header alignment on mobile. Also, the footer links are broken."
    issues = service.parse_issues_from_text(text)
    for issue in issues:
        print(f"Title: {issue.title}")
        print(f"Body: {issue.body}")
        print(f"Priority: {issue.priority}")
        print("---")

if __name__ == "__main__":
    main()
