# pylint: disable=missing-docstring,wrong-import-order,wrong-import-position
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../boomtick-pkg/cli')))
from dev_tools.utils import run_command
import json
from datetime import datetime



def run_cli(args, suppress_errors=False):
    try:
        res = run_command(["td-cli"] + args)
        return res if isinstance(res, str) else ""
    except Exception as e:
        if not suppress_errors:
            print(f"CLI Error: {e}")
        return "" if suppress_errors else None


try:
    from dev_tools.utils import call_ai, clean_llm_output, get_ai_synthesis_model
except ImportError:
    call_ai = None

    def get_ai_synthesis_model():
        return "gpt-4o-mini"

    def clean_llm_output(x):
        return x


def generate_text_ai(model, prompt):
    """Calls the real AI integration if available, otherwise falls back to a mock routing payload."""
    if call_ai:
        schema = {
            "type": "object",
            "properties": {
                "current_timestamp": {"type": "string"},
                "target_id": {"type": "string"},
                "task_objective": {"type": "string"},
                "interaction_history": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "timestamp": {"type": "string"},
                            "target_id": {"type": "string"},
                            "status": {"type": "string"},
                        },
                    },
                },
            },
            "required": ["current_timestamp", "target_id", "task_objective", "interaction_history"],
        }
        try:
            res = call_ai(prompt, model=model, schema=schema)
            if res:
                return clean_llm_output(res)
        except Exception as e:
            print(f"AI call failed, falling back to mock: {e}")

    # Fallback to mock routing decision
    return json.dumps(
        {
            "current_timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
            "target_id": "global-pr-review",
            "task_objective": "Review open PRs to determine merge readiness. Check CI passing and enforce DRY.",
            "interaction_history": [],
        }
    )


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

    model = get_ai_synthesis_model()
    llm_response = generate_text_ai(model=model, prompt=prompt)
    return json.loads(llm_response)


def execute_genai_routing():
    print("Evaluating repository state via GenAI...")
    payload = generate_dynamic_payload()

    print(f"Generated Payload for target: {payload.get('target_id')}")
    print(f"Objective: {payload.get('task_objective')}")

    print("Dispatching to primary agent...")
    run_cli(["agent", "dispatch", "main", json.dumps(payload)])


if __name__ == "__main__":
    execute_genai_routing()
