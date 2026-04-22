import urllib.request
import json
import logging
from typing import List, Dict, Any, Optional

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

REPO_URL = "https://api.github.com/repos/arii/tech-dancer/issues"

KEYWORDS = [
    'dance', 'tech', 'gear', 'wcs', 'west coast swing', 'bug', 'feature',
    'folio', 'stacks', 'data', 'lab', 'hub', 'ui', 'ux', 'components', 'design'
]

def fetch_issues(url: str) -> List[Dict[str, Any]]:
    """Fetches open issues from the specified GitHub repository URL."""
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Python urllib'})
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = response.read()
                return json.loads(data)
            else:
                logger.error(f"Failed to fetch issues, HTTP status: {response.status}")
                return []
    except Exception as e:
        logger.error(f"Error fetching issues: {e}")
        return []

def check_relevance(issue: Dict[str, Any], keywords: List[str]) -> bool:
    """Checks if the issue is relevant based on the presence of keywords in title or body."""
    title = issue.get('title', '').lower()
    body = issue.get('body') or ''
    body = body.lower()

    for keyword in keywords:
        if keyword in title or keyword in body:
            return True
    return False

def main() -> None:
    logger.info("Fetching issues from GitHub...")
    issues = fetch_issues(REPO_URL)

    if not issues:
        logger.info("No issues found or failed to fetch.")
        return

    logger.info(f"Found {len(issues)} open issues. Reviewing relevance...")
    print("-" * 50)

    for issue in issues:
        title = issue.get('title', 'No Title')
        number = issue.get('number', 'Unknown')
        url = issue.get('html_url', '')

        is_relevant = check_relevance(issue, KEYWORDS)
        status = "Relevant" if is_relevant else "Not Relevant"

        print(f"Issue #{number}: {title}")
        print(f"URL: {url}")
        print(f"Status: {status}")
        print("-" * 50)

if __name__ == "__main__":
    main()
