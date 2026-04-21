import subprocess
import sys
import os
import logging
import shutil
import tempfile

# Configure structured logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def validate_env():
    """Validates required CLIs and files exist."""
    if not shutil.which("gh"):
        logger.error("The 'gh' CLI tool is not installed or not in PATH.")
        sys.exit(1)

    if not shutil.which("llm"):
        logger.error("The 'llm' CLI tool is not installed or not in PATH.")
        sys.exit(1)

    template_path = os.path.join(os.path.dirname(__file__), "plan-template.md")
    if not os.path.exists(template_path):
        logger.error(f"Template not found at {template_path}. Ensure it exists before execution.")
        sys.exit(1)

    instructions_path = os.path.join(os.path.dirname(__file__), "instructions.txt")
    if not os.path.exists(instructions_path):
        logger.error(f"Instructions not found at {instructions_path}.")
        sys.exit(1)

    return template_path, instructions_path

def fetch_issue(issue_number):
    """Fetches issue data from GitHub."""
    logger.info(f"Fetching issue #{issue_number}...")
    try:
        return subprocess.check_output(
            ["gh", "issue", "view", str(issue_number), "--json", "title,body"],
            text=True
        )
    except subprocess.CalledProcessError as e:
        logger.error(f"Failed to fetch issue #{issue_number}: {e}")
        sys.exit(1)

def render_plan(issue_data, template_path, instructions_path):
    """Calls the LLM to generate the plan and saves it atomically."""
    with open(template_path, "r") as f:
        template_content = f.read()
    with open(instructions_path, "r") as f:
        instructions_content = f.read()

    prompt = f"Instructions:\n{instructions_content}\n\nTemplate:\n{template_content}\n\nUsing this issue data: {issue_data}, fill out the plan-template.md."

    logger.info("Generating plan...")
    temp_fd, temp_path = tempfile.mkstemp(suffix=".md")
    os.close(temp_fd)

    try:
        with open(temp_path, "w") as f:
            subprocess.run(
                ["llm", "prompt", "-s", "You are a senior dev.", prompt],
                stdout=f,
                check=True
            )

        # Atomic replacement of the final file
        shutil.move(temp_path, "plan.md")
        logger.info("Successfully created plan.md")

    except subprocess.CalledProcessError as e:
        logger.error(f"LLM generation failed: {e}")
        if os.path.exists(temp_path):
            os.remove(temp_path)
        sys.exit(1)

def generate_plan(issue_number):
    template_path, instructions_path = validate_env()
    issue_data = fetch_issue(issue_number)
    render_plan(issue_data, template_path, instructions_path)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        logger.error("Usage: python generate_plan.py <issue_number>")
        sys.exit(1)
    else:
        generate_plan(sys.argv[1])
