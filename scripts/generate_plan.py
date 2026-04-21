import subprocess
import sys
import os
import logging
import shutil
import tempfile

# Configure structured logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def generate_plan(issue_number):
    # 1. Validate dependencies and context
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

    # Load template and instructions
    with open(template_path, "r") as f:
        template_content = f.read()
    with open(instructions_path, "r") as f:
        instructions_content = f.read()

    # 2. Fetch Issue from GitHub
    logger.info(f"Fetching issue #{issue_number}...")
    try:
        issue_data = subprocess.check_output(
            ["gh", "issue", "view", str(issue_number), "--json", "title,body"],
            text=True
        )
    except subprocess.CalledProcessError as e:
        logger.error(f"Failed to fetch issue #{issue_number}: {e}")
        sys.exit(1)

    # 3. Prepare the prompt for the Agent
    prompt = f"Instructions:\n{instructions_content}\n\nTemplate:\n{template_content}\n\nUsing this issue data: {issue_data}, fill out the plan-template.md."

    # 4. Call the Agent and save to plan.md atomically
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

if __name__ == "__main__":
    if len(sys.argv) < 2:
        logger.error("Usage: python generate_plan.py <issue_number>")
        sys.exit(1)
    else:
        generate_plan(sys.argv[1])
