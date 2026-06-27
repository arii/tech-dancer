import subprocess
import json
import os
from datetime import datetime

CLI_BASE = ["python3", "boomtick-pkg/cli/dev_tools/td_cli.py"]

def run_cli(args):
    """Executes a BoomTick CLI command and returns the standard output."""
    cmd = CLI_BASE + args
    env = os.environ.copy()
    env["PYTHONPATH"] = "boomtick-pkg/cli:boomtick-pkg/cli/dev_tools"
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True, env=env)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"CLI Error: {e.stderr}")
        return None

def mock_generate_text(model, prompt):
    """
    Mock function for an LLM call. Replace this with your actual @google/genai 
    or LangChain python integration pointing to `ai_synthesis_model` in project_config.json.
    """
    # Mocking a dynamic routing decision
    return json.dumps({
        "current_timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "target_id": "global-pr-review",
        "task_objective": "Review open PRs to determine merge readiness. Check CI passing and enforce DRY.",
        "interaction_history": []
    })

def get_repo_status():
    stdout = run_cli(["gh", "status-board"])
    return stdout if stdout else "No active PRs or status board available."

def generate_dynamic_payload():
    repo_status = get_repo_status()
    
    prompt = f"""
    You are the Orchestrator. Review this repo status:
    {repo_status}
    
    Decide the single most important task for an engineering agent. 
    Output ONLY a JSON payload matching the expected Jules schema.
    """
    
    # Lightweight GenAI call (e.g., gpt-4o-mini or gemini fallback)
    llm_response = mock_generate_text(model="gpt-4o-mini", prompt=prompt)
    return json.loads(llm_response)

def execute_genai_routing():
    print("Evaluating repository state via GenAI...")
    payload = generate_dynamic_payload()
    
    print(f"Generated Payload for target: {payload.get('target_id')}")
    print(f"Objective: {payload.get('task_objective')}")
    
    print("Dispatching to Agent 1...")
    run_cli(["agent", "dispatch", "main", json.dumps(payload)])

if __name__ == "__main__":
    execute_genai_routing()
