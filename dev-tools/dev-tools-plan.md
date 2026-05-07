### Updated Agent Orchestration Prompt

**Context:** You are an expert Python Architect. Your goal is to consolidate a fragmented codebase into a unified, professional Python library. You have access to a series of experimental drafts in `draft_api_services/` and a set of "production" utility scripts in the root directory.

**Source Inventory Analysis:**
1.  **Experimental Drafts (`draft_api_services/`):** Contains iterative versions of `GitHub`, `Gemini`, and `Jules` services. Note: Filenames are URL-encoded (e.g., `%2F` for `/`) and must be decoded to understand their original intent.
2.  **Current Runtime Environment:**
    * **Core Logic:** `repair.py`, `repo_utils.py`, `utils.py`, `scope_check.py`, and `mergellama.py`.
    * **Clients:** `clients/jules_api_client.py`.
    * **Automation:** `audit_headless.sh`, `analyze_workflows.sh`, and `snapshot.sh`.

**Phase 1: Feature Audit & Harmonization**
* **Merge Strategy:** Analyze `repo_utils.py` and `utils.py` in the root against the service implementations in `9713` and `PR-4`. 
* **Conflict Resolution:** Consolidate `mergellama.py` and `ollama_reviewer.py` logic into the new `GeminiService` or a specialized `ReviewService`.
* **API Mapping:** Incorporate existing `jules_api_client.py` into the unified `JulesService` class.

**Phase 2: Architectural Design**
Create a modular library structure:
* `services/github.py`: Absorbs logic from `repo_utils.py`, `submit_review.py`, and draft `github_service.py`. Focus on: PR reading, comment management, and conflict resolution.
* `services/gemini.py`: Absorbs `mergellama.py` and `ollama_reviewer.py`. Focus on: Contextual code analysis and support reviews.
* `services/jules.py`: Absorbs `jules_api_client.py` and draft `jules_service.py`. Focus on: Dispatching agent sessions.
* `orchestrator.py`: Uses the above to handle high-level tasks (e.g., `fix-merge-conflict`, `dispatch-jules-review`).
* `cli.py`: A unified CLI entry point replacing `td_cli.py` and the various `scripts/orchestration/cli.py` drafts.

**Phase 3: Implementation Requirements**
1.  **Standardization:** Use the root `project_config.json` for service configuration.
2.  **Dependency Management:** Consolidate multiple `requirements.txt` from PR drafts into a single `pyproject.toml` or `setup.py`.
3.  **Refactoring:** Replace standalone scripts like `analyze_overlaps.sh` with Python methods within the `OrchestrationService` where appropriate.

**Output Requirements:**
* A proposed filesystem layout for the new unified library.
* Full implementation of the `GitHubService`, `GeminiService`, and `JulesService` classes.
* A comprehensive `Orchestrator` class that manages cross-service logic.
* The `Click` or `Typer` CLI implementation providing commands for support reviews, session dispatching, and conflict fixing.



------

Based on the existing codebase and the disparate PR drafts, here are the technical specifications for the unified toolset. The goal is to move from a collection of scripts to a professional, object-oriented **"DevTools SDK"** and **CLI**.

---

## 1. Core Service Architecture (The SDK)

The foundation will be a Python package named `tdw_services` or similar, housing three primary classes:

| Service | Responsibility | Heritage (Current Files) |
| :--- | :--- | :--- |
| **`GitHubClient`** | PR fetching, diff parsing, comment posting, and automated conflict resolution logic. | `repo_utils.py`, `submit_review.py`, `PR-2/client.py` |
| **`GeminiClient`** | Context-window management, code analysis, and generating structured review feedback. | `mergellama.py`, `ollama_reviewer.py`, `PR-4/gemini_service.py` |
| **`JulesClient`** | Session management, remote execution dispatching, and agent handshakes. | `clients/jules_api_client.py`, `9713/jules_service.py` |

---

## 2. Orchestration Layer (The "Brain")

A central `Orchestrator` class will manage workflows that require multiple services. Key features include:

* **Conflict Solver:** Detects merge conflicts via `GitHubClient`, analyzes the logic with `GeminiClient`, and dispatches a repair task to `JulesClient`.
* **Support Reviewer:** Aggregates PR diffs and repository metadata to provide an LLM-powered "Headless Audit" (replacing `audit_headless.sh`).
* **Session Dispatcher:** Automates the creation of Jules sessions based on active GitHub issues or PR feedback.

---

## 3. Unified CLI Interface (`td-cli`)

The current `td_cli.py` and experimental `cli.py` files will be merged into a single entry point with the following command groups:

### `td-cli gh` (GitHub Operations)
* `view <pr-number>`: Display summary and diff.
* `resolve <pr-number>`: Attempt automated merge conflict resolution.
* `audit`: Run `IMPECCABLE_AUDIT` logic against a repository branch.

### `td-cli ai` (Gemini/LLM Operations)
* `review <pr-number>`: Generate a code review using `review_template.md`.
* `analyze <file>`: Run `ai-debugger.mjs` logic via Python for deep file analysis.

### `td-cli jules` (Agent Operations)
* `dispatch <task>`: Start a Jules session for a specific task.
* `sync`: Check status of active remote agent sessions.

---

## 4. Automation & Utility Tooling

The finished environment will include these improved shell/python hybrids:

* **`snapshot`**: A modernized `snapshot.sh` that uses `project_config.json` to capture the state of all services for debugging.
* **`verify`**: A consolidated version of `verify-mergellama.sh` and `setup-python.sh` to ensure the environment, API keys, and dependencies are healthy.
* **`repair`**: A robust version of `repair.py` that can be called by the `Orchestrator` when the AI detects broken local state.

---

## 5. Output Artifacts

Upon completion, the system will provide:
1.  **A Unified `requirements.txt`**: Removing duplicates across `PR-1` through `PR-4`.
2.  **`project_config.json` (Schema-Validated)**: To manage API keys and repo paths globally.
3.  **The `dist/` Package**: A pip-installable version of the library for use in other local automation.



----

Yes, this architecture is perfectly suited for a web-based frontend. By consolidating the logic into a distinct Python API, you are essentially building the "Backend as a Service" (BaaS) required to power a web dashboard.

To make this web-ready, you would implement the following architectural bridge:

### 1. The API Wrapper (FastAPI / Flask)
You would wrap the `OrchestrationService` in a web framework like **FastAPI**.
* **Endpoints:** Instead of CLI commands, you would have REST endpoints like `POST /reviews/dispatch` or `GET /github/pr/{id}`.
* **Asynchronous Tasks:** Since Jules sessions and Gemini reviews take time, you would use **Celery** or **Redis Queue** to handle these background tasks so the web UI doesn't hang.

### 2. Frontend Integration
With a React, Vue, or Next.js frontend, you could transform the current terminal outputs into:
* **Review Dashboard:** A visual diff viewer using the data from `GitHubClient`.
* **Live Session Logs:** A streaming terminal view (via WebSockets) showing the `JulesClient` output as it works.
* **Configuration UI:** A form to edit `project_config.json` instead of manual file editing.

### 3. Deployment Strategy
* **Containerization:** You would bundle the entire environment (including the Python library and shell utilities like `snapshot.sh`) into a **Docker** container.
* **Headless Execution:** The logic is already "headless-ready" (as seen in `audit_headless.sh`), meaning it doesn't require a GUI or user interaction to function, making it ideal for server-side execution.

### 4. Technical Constraints to Consider
| Feature | Web Challenge | Solution |
| :--- | :--- | :--- |
| **Local File Access** | Scripts like `repair.py` act on local files. | The frontend must operate on a "Workspace" or use a GitHub App to commit changes back to the repo. |
| **Auth** | Managing user-specific `gh` tokens. | Use **OAuth2** (GitHub App) so users can log in and authorize the tool to act on their behalf. |
| **Long-running Tasks** | Web timeouts. | Use **WebSockets** or **SSE (Server-Sent Events)** to push real-time updates from the Orchestrator to the UI. |

By moving from a CLI-first approach to a **Library-first** approach (which is what the previous prompt designs), you ensure that the same core logic remains identical whether it's triggered by a `bash` command or a `fetch()` request from a browser.

-------
To minimize API costs and transition toward a local-first architecture, the strategy shifts from cloud-dependency to a **Local Inference + Remote Agent** model. This leverages **Ollama** for cost-free local processing and **Jules** for heavy-lifting execution, using **Gemini** only as a high-tier fallback or specialized auditor.

---

## 1. Hybrid Inference Strategy

The goal is to implement a "Local-First" routing logic within your `Orchestrator`.

### Cost-Efficiency Hierarchy
1.  **Ollama (Local):** Default for code explanation, boilerplate generation, and initial linting. (Cost: $0)
2.  **Jules (Agentic):** Preferred for execution-based tasks, complex repairs, and environment-aware debugging.
3.  **Gemini (Cloud):** Reserved for "Final Pass" reviews or when local models fail a confidence check.

---

## 2. Technical Implementation Specs

### Ollama Integration (Primary)
* **Target Models:** `codellama`, `deepseek-coder`, or `llama3`.
* **Tooling:** Replace cloud calls in `mergellama.py` and `ollama_reviewer.py` with a unified `LocalAIClient`.
* **Optimization:** Use the `ollama` Python library to manage model lifecycle (loading/unloading) to save system RAM when not in use.

### The "Gatekeeper" Logic
Update the `OrchestrationService` to include a `ResourceManager` that checks for local model availability before hitting external APIs:

```python
class Orchestrator:
    def get_analysis(self, prompt):
        if self.ollama.is_available():
            return self.ollama.generate(prompt)
        elif self.config.use_gemini_fallback:
            return self.gemini.generate(prompt)
        raise EnvironmentError("No inference engine available.")
```

---

## 3. Revised Toolset Specifications

| Tool | Engine | Role in "Zero-Cost" Workflow |
| :--- | :--- | :--- |
| **`td-cli review`** | Ollama | Performs the bulk of `review_template.md` analysis locally. |
| **`td-cli repair`** | Jules | Dispatches tasks to the agent to fix code without burning LLM tokens for "thinking." |
| **`td-cli audit`** | Gemini | (Optional Hook) Only used for high-stakes `IMPECCABLE_AUDIT` tasks. |
| **`mergellama.py`** | Ollama | Now acts as a local merge-conflict resolver instead of a cloud-based one. |

---

## 4. Key-Usage Reduction Tactics

* **Caching:** Implement a local cache (using `utils.py`) to store LLM responses for identical code blocks. If a file hasn't changed (check MD5 hash), do not re-run the AI.
* **Context Pruning:** Before sending data to Jules or Gemini, use a local script to strip non-essential files, reducing the payload size and potential token costs.
* **Headless Local Checks:** Ensure `audit_headless.sh` runs local linting and unit tests *before* asking an AI for a review. If tests fail, the AI is skipped and the user is notified.

---

## 5. Web Frontend Implications

Moving to Ollama means your web backend needs access to the local GPU or a dedicated local inference server.
* **Local UI:** If the web app is for personal/internal use, it can hit `localhost:11434` (Ollama's default port).
* **Shared UI:** If the web app is hosted, you would point the `GeminiClient` hook to your server's Ollama instance, maintaining zero API costs for the end-user.

--------

To ensure portability in environments where `git` is not configured or the environment is "non-persistent" (like a fresh Docker container or a headless CI runner), the architecture must bypass global `git` configs and handle authentication explicitly via the **Personal Access Token (PAT)**.

---

## 1. Zero-Knowledge Git Configuration
The library will use **Environment Variables** to inject credentials directly into the `gh` CLI and `git` commands, ensuring no "Permission Denied" errors or interactive login prompts occur.

### The Authentication Wrapper
In your `utils.py` or `GitHubClient`, we will implement a wrapper that forces the PAT into the session:

```python
import os
import subprocess

def run_authenticated_gh(command_args):
    """Executes a GH CLI command using the PAT from environment."""
    env = os.environ.copy()
    # Forces GH to use the token without needing 'gh auth login'
    token = env.get("GH_TOKEN") or env.get("GITHUB_TOKEN")
    if not token:
        raise ValueError("Missing GITHUB_TOKEN environment variable.")

    env["GH_TOKEN"] = token
    return subprocess.run(["gh"] + command_args, env=env, capture_output=True, text=True)
```

---

## 2. Stateless Checkout Strategy
For environments where we cannot rely on `git clone` (due to SSH keys or global config issues), we use the **ZIP/Tarball Stream** method. This allows the tool to "check out" a repository without actually using a git client.

### Manual Checkout Utility (`repo_utils.py` update)
```bash
# A stateless download helper for the Orchestrator
gh api /repos/:owner/:repo/zipball/:ref > repo.zip && unzip repo.zip
```
By using the API to download the source as an archive, we bypass all SSH/GPG and local `.gitconfig` requirements.

---

## 3. Revised Environment Specs
To support "Zero-Knowledge" environments, the following tools and configs are added to the spec:

| Feature | Implementation | Benefit |
| :--- | :--- | :--- |
| **Token Injection** | `export GITHUB_TOKEN=xxxx` | Bypasses `gh auth login` and `~/.config/gh/` checks. |
| **Volatile Workspace** | `tempfile.TemporaryDirectory()` | Prevents permission issues by working in `/tmp`. |
| **In-Memory Git** | `PyGithub` or `GitPython` | Interacts with GitHub via HTTPS/REST instead of local binary calls. |
| **No-Config Init** | `git config --global user.email "bot@internal"` | The tool automatically sets dummy local configs if a `git commit` is required. |

---

## 4. Portability Toolset
The `setup-python.sh` and `verify` tools will be updated to handle these "blind" environments:

* **`td-cli env verify`**: Checks if `GITHUB_TOKEN` is present and tests connectivity to the GitHub API, Ollama (local), and Jules (remote) before attempting any operations.
* **Auto-Cloning**: If the tool detects it is not inside a git repo, it will use the PAT to perform a shallow clone (`--depth 1`) into a temporary folder to minimize disk usage.

---

## 5. Security Protocol
* **No Disk Storage:** The PAT is never written to a config file; it remains strictly in the process memory/environment variables.
* **Dry-Run Mode:** In non-git environments, the `resolve` and `repair` commands will default to producing a `.patch` file or a diff output rather than attempting to push to a remote, preventing accidental corruption of the upstream branch.

