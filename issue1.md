**Problem Statement**
The automated AI slop audit script located at `.agents/scripts/audit-ai-slop.py` fails to execute out of the box, crashing with a `ModuleNotFoundError: No module named 'yaml'`.

**Root Cause Analysis**
The script relies on the `yaml` module (`PyYAML`) to parse `.agents/audit.config.yaml`. However, `PyYAML` is not declared in the project's core dependencies or automatically bootstrapped for agent scripts, leading to execution failures in standard development environments.

**Proposed Spec / Design**
Agent orchestration scripts should either:
1. Have their dependencies explicitly managed and installed via a dedicated `requirements-agents.txt` or integrated into `requirements-dev.txt`.
2. Automatically bootstrap their required dependencies (e.g., using `pip install -r` inline or via a setup wrapper).
3. Alternatively, migrate the configuration from `.yaml` to `.json` to utilize Python's standard library `json` module, removing the external dependency entirely.

**Acceptance Criteria**
- Running `python3 .agents/scripts/audit-ai-slop.py` succeeds without manual intervention.
- Configuration parsing works correctly.
- If dependencies are kept, they are formally tracked in the repository.

**Context**
Encountered during the automated execution of the "AI Slop Audit" task.
