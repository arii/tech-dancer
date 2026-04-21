import subprocess
import sys
import os

def generate_plan(issue_number):
    # 1. Fetch Issue from GitHub
    print(f"Fetching issue #{issue_number}...")
    issue_data = subprocess.check_output(
        ["gh", "issue", "view", str(issue_number), "--json", "title,body"],
        text=True
    )

    # 2. Prepare the prompt for the Agent
    # Note: Replace 'llm-command' with your specific AI CLI (e.g., 'gpt', 'gemini', 'anthropic')
    prompt = f"Using this issue data: {issue_data}, fill out the plan-template.md."

    # 3. Call the Agent and save to plan.md
    # This assumes you have a CLI tool for your LLM installed
    with open("plan.md", "w") as f:
        subprocess.run(
            ["llm", "prompt", "-s", "You are a senior dev.", prompt],
            stdout=f
        )

    print("Successfully created plan.md")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate_plan.py <issue_number>")
    else:
        generate_plan(sys.argv[1])
