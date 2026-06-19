import os
import sys
import json
import glob
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add dev-tools to the python path since scripts might run from root
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dev-tools')))
from tdw_services.services.jules import JulesClient

def main():
    task_id = os.environ.get("TASK_ID")
    if not task_id:
        logger.info("No TASK_ID provided in environment. Exiting.")
        sys.exit(0)

    session_id = f"sessions/{task_id}"
    logger.info(f"Targeting session: {session_id}")

    try:
        client = JulesClient()
    except Exception as e:
        logger.error(f"Failed to initialize JulesClient: {e}")
        sys.exit(1)

    artifacts_dir = "artifacts"
    if not os.path.isdir(artifacts_dir):
        logger.warning(f"Artifacts directory '{artifacts_dir}' not found. Cannot send impact analysis.")
        sys.exit(0)

    body = "## Deployment Impact Analysis\n\n"

    # Try deployment-review.md first
    deployment_review_path = os.path.join(artifacts_dir, "deployment-review.md")
    impact_md_path = os.path.join(artifacts_dir, "impact-analysis", "impact.md")

    if os.path.isfile(deployment_review_path):
        try:
            with open(deployment_review_path, "r", encoding="utf-8") as f:
                body += f.read() + "\n\n"
        except IOError as e:
            logger.error(f"Failed to read {deployment_review_path}: {e}")
    elif os.path.isfile(impact_md_path):
        try:
            with open(impact_md_path, "r", encoding="utf-8") as f:
                body += f.read() + "\n\n"
        except IOError as e:
            logger.error(f"Failed to read {impact_md_path}: {e}")
    else:
        body += "No impact report found.\n\n"

    # Append individual review files
    review_files = [
        "gemini-review.md",
        "github-models-review.md",
        "gemini-code-review.md",
        "github-models-code-review.md"
    ]

    for filename in review_files:
        filepath = os.path.join(artifacts_dir, filename)
        if os.path.isfile(filepath):
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    body += f.read() + "\n\n"
            except IOError as e:
                logger.error(f"Failed to read {filepath}: {e}")

    # Append verdict JSONs
    verdicts = []
    # Safe globbing within the artifacts directory to prevent traversal
    json_pattern = os.path.join(artifacts_dir, "*-verdict.json")
    for filepath in glob.glob(json_pattern):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                verdicts.append((os.path.basename(filepath), f.read()))
        except IOError as e:
             logger.error(f"Failed to read JSON verdict {filepath}: {e}")

    if verdicts:
        body += "## Verdict JSONs\n"
        for fname, content in verdicts:
            body += f"### {fname}\n```json\n{content}\n```\n\n"

    # Send the message
    try:
        result = client.send_message(session_id, body)
        if result.get("status") != "success":
             logger.error(f"Failed to send message to Jules API: {result}")
             sys.exit(1)
        logger.info(f"✅ Sent impact analysis to {session_id}")
    except Exception as e:
        logger.error(f"Exception while sending message: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
