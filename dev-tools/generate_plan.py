import subprocess
import sys
import os
import logging
import shutil
import tempfile
from typing import Tuple

# Configure structured logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

class PlanGenerationError(Exception):
    """Custom exception for plan generation failures."""
    pass

def get_resource_paths() -> Tuple[str, str]:
    """Returns the paths for the template and instructions."""
    base_dir = os.path.dirname(__file__)
    return os.path.join(base_dir, "plan-template.md"), os.path.join(base_dir, "instructions.txt")

def fetch_issue(issue_number: int) -> str:
    """Fetches issue data from GitHub."""
    logger.debug(f"Attempting to fetch issue #{issue_number}")
    try:
        issue_data = subprocess.check_output(
            ["gh", "issue", "view", str(issue_number), "--json", "title,body"],
            text=True,
            stderr=subprocess.PIPE
        )
        logger.info(f"Successfully fetched issue #{issue_number}")
        return issue_data
    except subprocess.CalledProcessError as e:
        error_msg = e.stderr.strip() if e.stderr else str(e)
        logger.debug(f"gh cli error: {error_msg}")
        raise PlanGenerationError(f"Failed to fetch issue #{issue_number}: {error_msg}") from e

def render_plan(issue_data: str, template_path: str, instructions_path: str) -> None:
    """Calls the LLM to generate the plan and saves it atomically."""
    with open(template_path, "r") as f:
        template_content = f.read()
    with open(instructions_path, "r") as f:
        instructions_content = f.read()

    prompt = f"Instructions:\n{instructions_content}\n\nTemplate:\n{template_content}\n\nUsing this issue data: {issue_data}, fill out the plan-template.md."

    logger.info("Generating plan via LLM...")
    temp_fd, temp_path = tempfile.mkstemp(suffix=".md")
    os.close(temp_fd)

    try:
        with open(temp_path, "w") as f:
            subprocess.run(
                ["llm", "prompt", "-s", "You are a senior dev.", prompt],
                stdout=f,
                stderr=subprocess.PIPE,
                check=True,
                text=True
            )

        # Atomic replacement of the final file
        shutil.move(temp_path, "plan.md")
        logger.info("Successfully created plan.md")

    except subprocess.CalledProcessError as e:
        error_msg = e.stderr.strip() if e.stderr else str(e)
        logger.debug(f"llm cli error: {error_msg}")
        if os.path.exists(temp_path):
            os.remove(temp_path)
        raise PlanGenerationError(f"LLM generation failed: {error_msg}") from e

def generate_plan(issue_number: str) -> None:
    if not issue_number.isdigit():
        logger.error(f"Issue number must be numeric, got: '{issue_number}'")
        sys.exit(1)

    try:
        template_path, instructions_path = get_resource_paths()
        issue_data = fetch_issue(int(issue_number))
        render_plan(issue_data, template_path, instructions_path)
    except PlanGenerationError as e:
        logger.error(str(e))
        sys.exit(1)
    except Exception as e:
        logger.exception(f"An unexpected error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Allow overriding log level via environment variable for debugging
    log_level = os.environ.get("LOG_LEVEL", "INFO").upper()
    logging.getLogger().setLevel(log_level)

    if len(sys.argv) < 2:
        logger.error("Usage: python generate_plan.py <issue_number>")
        sys.exit(1)
    else:
        generate_plan(sys.argv[1])
