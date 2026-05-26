# PR Context: #1594 — Support Antigravity agent workflows and gitignore items
**Author:** @arii

## Description
This PR integrates the Antigravity agent workflows into the repository guidelines and developer tools, ensuring that Antigravity-specific runtime files are gitignored.

## CI Status
- ✅ **Build & E2E**: completed (success)
- ✅ **Build & E2E**: completed (success)
- ✅ **conflict-check**: completed (success)
- ✅ **resolve-conflicts**: completed (success)
- ✅ **Oxlint Scan**: completed (success)
- ✅ **Semgrep Static Analysis**: completed (success)
- ✅ **Gitleaks Secret Detection**: completed (success)
- ✅ **Anti-Pattern Audit**: completed (success)
- ✅ **Lint & Type Check**: completed (success)
- ✅ **build_and_deploy**: completed (success)
- ✅ **Lint & Type Check**: completed (success)
- ✅ **Anti-Pattern Audit**: completed (success)

## Files Changed
- 🟡 `.agent/workflows/dev-tools-cli-guide.md`
- 🟡 `.gitignore`
- 🟡 `dev-tools/CodeReviewer.mf`
- 🟡 `dev-tools/README.md`
- 🟡 `dev-tools/dev_tools_sdk/cli.py`
- 🟡 `dev-tools/dev_tools_sdk/config.py`
- 🟡 `dev-tools/dev_tools_sdk/utils/auth.py`
- 🟡 `dev-tools/error_rag.py`
- 🟡 `dev-tools/snapshot.sh`
- 🟡 `dev-tools/td_cli.py`
- 🟡 `dev-tools/tdw_services/cli.py`
- 🟡 `dev-tools/tdw_services/orchestrator.py`
- 🟡 `dev-tools/tdw_services/services/gemini.py`
- 🟡 `dev-tools/tdw_services/services/github.py`
- 🟡 `dev-tools/tdw_services/services/jules.py`
- 🟡 `dev-tools/utils.py`
- 🟡 `tests/dev-tools/test_dev_tools_sdk.py`
- 🟡 `tests/dev-tools/test_fix_ci.py`
- 🟡 `tests/dev-tools/test_modern_cli.py`
- 🟡 `tests/dev-tools/test_td_cli.py`

## Diffs

### `.agent/workflows/dev-tools-cli-guide.md` (modified)
```diff
@@ -47,13 +47,13 @@ Once activated, you can run the `td-cli` command. You can also pass `--json` to
  47 | - `td-cli ai review <pr_number>`: Produce an AI code review from a PR diff using templates.
  48 | - `td-cli ai analyze <file>`: Focus AI analysis and recommendations on a specific file.
  49 | 
     |-### Agent Operations (`td-cli jules`)
  50 |+### Agent Operations (`td-cli antigravity` / `td-cli jules`)
  51 | 
     |-- `td-cli jules dispatch <branch> <task>`: Create an AI agent session and attach context for a specific task.
     |-- `td-cli jules sync`: Poll active agent sessions.
     |-- `td-cli jules fix-ci --pr-number <num>`: Automatically initialize an AI repair session to fix CI failures.
     |-- `td-cli jules repair --logs <file> [--worktree]`: Run an autonomous local repair agent based on CI logs.
     |-- `td-cli jules repair-context --log <log> --file <file>`: Generate repair prompt context from logs.
  52 |+- `td-cli antigravity dispatch <branch> <task>`: Create an AI agent session and attach context for a specific task. (Note: `jules` can be used as an alias)
  53 |+- `td-cli antigravity sync`: Poll active agent sessions.
  54 |+- `td-cli antigravity fix-ci --pr-number <num>`: Automatically initialize an AI repair session to fix CI failures.
  55 |+- `td-cli antigravity repair --logs <file> [--worktree]`: Run an autonomous local repair agent based on CI logs.
  56 |+- `td-cli antigravity repair-context --log <log> --file <file>`: Generate repair prompt context from logs.
  57 | 
  58 | ## Legacy Compatibility
  59 | 
```

### `.gitignore` (modified)
```diff
@@ -83,3 +83,10 @@ pr_overlaps.txt
  83 | workflow_overlaps.txt
  84 | dev-tools/logs/reviews/*.md
  85 | product-mockups/
  86 |+
  87 |+# Antigravity
  88 |+.antigravity/
  89 |+.antigravitycli/
  90 |+
  91 |+# Runtime audit reports
  92 |+.agent/workflows/ai-slop-audit-*.md
```

### `dev-tools/CodeReviewer.mf` (modified)
```diff
@@ -1,4 +1,4 @@
     |-FROM qwen2.5-coder:7b
   1 |+FROM llama3.2
   2 | PARAMETER temperature 0.2
   3 | SYSTEM """
   4 | You are an expert Senior Software Engineer. Review the provided code for:
```

### `dev-tools/README.md` (modified)
```diff
@@ -32,23 +32,23 @@ This script installs and configures:
  32 | 
  33 | | Variable | Required? | Purpose |
  34 | |---|---|---|
     |-| `CODEX_GH_TOKEN` | **Recommended (preferred)** | Primary secret for Codex/Jules agent runs; setup maps it to `GH_TOKEN`/`GITHUB_TOKEN` for `gh` + dev-tools commands. |
  35 |+| `CODEX_GH_TOKEN` | **Recommended (preferred)** | Primary secret for Codex/Jules/Antigravity agent runs; setup maps it to `GH_TOKEN`/`GITHUB_TOKEN` for `gh` + dev-tools commands. |
  36 | | `GITHUB_TOKEN` or `GH_TOKEN` | Required if `CODEX_GH_TOKEN` is not set | Auth for `gh` and `td_cli.py gh ...` commands (PR audits, comments, variables, status checks). |
  37 | | `GITHUB_REPOSITORY` (`owner/repo`) | Recommended | Ensures deterministic `origin` remote auto-configuration when missing (or falls back to an existing non-origin remote URL). |
     |-| `JULES_API_KEY` | Optional | Enables `td_cli.py jules ...` cloud workflows. |
  38 |+| `ANTIGRAVITY_API_KEY` / `JULES_API_KEY` | Optional | Enables `td_cli.py antigravity ...` / `td_cli.py jules ...` cloud workflows. |
  39 | | `GEMINI_API_KEY` | Optional | Enables Gemini-backed review/audit workflows. |
  40 | | `OLLAMA_URL` | Optional | Override local Ollama endpoint (default shown by `snapshot.sh`). |
  41 | | `OLLAMA_MODEL` | Optional | Override local Ollama model selection. |
  42 | 
  43 | **Secret handling guidance**
     |-- GitHub Actions / agent runners: store `CODEX_GH_TOKEN` (preferred), plus `JULES_API_KEY` and `GEMINI_API_KEY` in repository or org Secrets.
  44 |+- GitHub Actions / agent runners: store `CODEX_GH_TOKEN` (preferred), plus `ANTIGRAVITY_API_KEY` / `JULES_API_KEY` and `GEMINI_API_KEY` in repository or org Secrets.
  45 | - Dev containers/local shells: export secrets before running setup/CLI, for example:
  46 | 
  47 | ```bash
  48 | export CODEX_GH_TOKEN="<token>"
  49 | export GITHUB_REPOSITORY="owner/repo"
  50 | # optional
     |-export JULES_API_KEY="<key>"
  51 |+export ANTIGRAVITY_API_KEY="<key>"
  52 | export GEMINI_API_KEY="<key>"
  53 | ```
  54 | 
@@ -65,7 +65,7 @@ export GEMINI_API_KEY="<key>"
  65 | - `NODE_MAJOR` — override Node major used for apt installation (default `22`).
  66 | 
  67 | 
     |-### Non-Traditional Workflows (Deploy, Jules, Ollama)
  68 |+### Non-Traditional Workflows (Deploy, Antigravity, Jules, Ollama)
  69 | 
  70 | After `./dev-tools/setup-agent.sh`, use the following workflow-specific setup:
  71 | 
@@ -77,13 +77,13 @@ After `./dev-tools/setup-agent.sh`, use the following workflow-specific setup:
  77 | - Pre-submit quality gate before push/merge:
  78 |   - `python3 dev-tools/td_cli.py gh pre-submit`
  79 | 
     |-#### 2) Jules Workflows
     |-- Required secret: `JULES_API_KEY`.
  80 |+#### 2) Antigravity / Jules Workflows
  81 |+- Required secret: `ANTIGRAVITY_API_KEY` or `JULES_API_KEY`.
  82 | - Optional context env vars:
     |-  - `JULES_SOURCE_ID` (if your environment already knows the source mapping)
  83 |+  - `ANTIGRAVITY_SOURCE_ID` or `JULES_SOURCE_ID` (if your environment already knows the source mapping)
  84 | - Typical commands:
     |-  - `python3 dev-tools/td_cli.py jules repair`
     |-  - `python3 dev-tools/td_cli.py jules repair --worktree`
  85 |+  - `python3 dev-tools/td_cli.py antigravity repair`
  86 |+  - `python3 dev-tools/td_cli.py antigravity repair --worktree`
  87 | 
  88 | #### 3) Ollama Local Review Workflows
  89 | - Optional local runtime vars:
```

### `dev-tools/dev_tools_sdk/cli.py` (modified)
```diff
@@ -34,6 +34,12 @@ def build_parser() -> argparse.ArgumentParser:
  34 |     jules_dispatch.add_argument("pr", type=int)
  35 |     jules_sub.add_parser("sync", help="Sync active Jules sessions")
  36 | 
  37 |+    antigravity = root.add_parser("antigravity", help="Antigravity agent operations")
  38 |+    antigravity_sub = antigravity.add_subparsers(dest="command", required=True)
  39 |+    antigravity_dispatch = antigravity_sub.add_parser("dispatch", help="Dispatch review task")
  40 |+    antigravity_dispatch.add_argument("pr", type=int)
  41 |+    antigravity_sub.add_parser("sync", help="Sync active Antigravity sessions")
  42 |+
  43 |     env = root.add_parser("env", help="Environment checks")
  44 |     env_sub = env.add_subparsers(dest="command", required=True)
  45 |     env_sub.add_parser("verify", help="Verify runtime integrations")
@@ -66,11 +72,11 @@ def main(argv: list[str] | None = None) -> int:
  72 |         print(orchestrator.analyze_file(args.path))
  73 |         return 0
  74 | 
     |-    if args.group == "jules" and args.command == "dispatch":
  75 |+    if args.group in ("jules", "antigravity") and args.command == "dispatch":
  76 |         status = orchestrator.dispatch_jules_review(args.pr)
  77 |         print(f"status={status}")
  78 |         return 0
     |-    if args.group == "jules" and args.command == "sync":
  79 |+    if args.group in ("jules", "antigravity") and args.command == "sync":
  80 |         print(json.dumps(orchestrator.sync_jules(), indent=2))
  81 |         return 0
  82 | 
```

### `dev-tools/dev_tools_sdk/config.py` (modified)
```diff
@@ -1,6 +1,7 @@
   1 | from __future__ import annotations
   2 | 
   3 | import json
   4 |+import os
   5 | from dataclasses import dataclass
   6 | from pathlib import Path
   7 | from typing import Any
@@ -12,7 +13,7 @@ class ProjectConfig:
  13 |     github_token_env: str = "GITHUB_TOKEN"
  14 |     gh_token_env: str = "GH_TOKEN"
  15 |     use_gemini_fallback: bool = True
     |-    ollama_model: str = "llama3"
  16 |+    ollama_model: str = "llama3.2"
  17 |     ollama_base_url: str = "http://localhost:11434"
  18 |     jules_api_url: str | None = None
  19 | 
@@ -31,16 +32,24 @@ def _coerce_bool(value: Any, default: bool) -> bool:
  32 | 
  33 | def load_project_config(path: str | Path = "dev-tools/project_config.json") -> ProjectConfig:
  34 |     p = Path(path)
  35 |+    
  36 |+    # Check env var first for use_gemini_fallback
  37 |+    env_fallback = os.environ.get("USE_GEMINI_FALLBACK")
  38 |+    fallback_val = _coerce_bool(env_fallback, True) if env_fallback is not None else None
  39 |+
  40 |     if not p.exists():
     |-        return ProjectConfig()
  41 |+        return ProjectConfig(
  42 |+            use_gemini_fallback=fallback_val if fallback_val is not None else True
  43 |+        )
  44 | 
  45 |     raw = json.loads(p.read_text(encoding="utf-8"))
  46 |     return ProjectConfig(
  47 |         github_repo=raw.get("github_repo") or raw.get("repo_name"),
  48 |         github_token_env=raw.get("github_token_env", "GITHUB_TOKEN"),
  49 |         gh_token_env=raw.get("gh_token_env", "GH_TOKEN"),
     |-        use_gemini_fallback=_coerce_bool(raw.get("use_gemini_fallback"), True),
     |-        ollama_model=raw.get("ollama_model", "llama3"),
  50 |+        use_gemini_fallback=fallback_val if fallback_val is not None else _coerce_bool(raw.get("use_gemini_fallback"), True),
  51 |+        ollama_model=raw.get("ollama_model", "llama3.2"),
  52 |         ollama_base_url=raw.get("ollama_base_url", "http://localhost:11434"),
  53 |         jules_api_url=raw.get("jules_api_url"),
  54 |     )
  55 |+
```

### `dev-tools/dev_tools_sdk/utils/auth.py` (modified)
```diff
@@ -14,6 +14,12 @@ def get_github_token(env_vars: Sequence[str] = ("GH_TOKEN", "GITHUB_TOKEN")) ->
  14 |         value = os.getenv(var)
  15 |         if value:
  16 |             return value
  17 |+    try:
  18 |+        proc = subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, check=False)
  19 |+        if proc.returncode == 0 and proc.stdout.strip():
  20 |+            return proc.stdout.strip()
  21 |+    except Exception:
  22 |+        pass
  23 |     raise AuthError("Missing GH_TOKEN/GITHUB_TOKEN.")
  24 | 
  25 | 
```

### `dev-tools/error_rag.py` (modified)
```diff
@@ -134,7 +134,12 @@ def extract_context(filepath, line_number, window=15):
 134 | class RAGPipeline:
 135 |     """Coordinates extraction, lookup, and prompt construction."""
 136 | 
     |-    def __init__(self, knowledge_base_path=".jules/knowledge/errors.json"):
 137 |+    def __init__(self, knowledge_base_path=None):
 138 |+        if knowledge_base_path is None:
 139 |+            if os.path.exists(".antigravity/knowledge/errors.json"):
 140 |+                knowledge_base_path = ".antigravity/knowledge/errors.json"
 141 |+            else:
 142 |+                knowledge_base_path = ".jules/knowledge/errors.json"
 143 |         self.knowledge_base_path = knowledge_base_path
 144 |         self.knowledge_base = self._load_kb()
 145 | 
```

### `dev-tools/snapshot.sh` (modified)
```diff
@@ -51,10 +51,10 @@ else
  51 |     echo "GitHub token: Missing"
  52 | fi
  53 | 
     |-if [ -n "$JULES_API_KEY" ]; then
     |-    echo "Jules API key: Present"
  54 |+if [ -n "$ANTIGRAVITY_API_KEY" ] || [ -n "$JULES_API_KEY" ]; then
  55 |+    echo "Antigravity/Jules API key: Present"
  56 | else
     |-    echo "Jules API key: Missing"
  57 |+    echo "Antigravity/Jules API key: Missing"
  58 | fi
  59 | 
  60 | if [ -n "$GEMINI_API_KEY" ]; then
@@ -64,6 +64,6 @@ else
  64 | fi
  65 | 
  66 | echo "Ollama URL: ${OLLAMA_URL:-http://localhost:11434/api/generate}"
     |-echo "Ollama Model: ${OLLAMA_MODEL:-qwen2.5-coder:7b}"
  67 |+echo "Ollama Model: ${OLLAMA_MODEL:-llama3.2}"
  68 | 
  69 | echo "=== Snapshot Complete ==="
```

### `dev-tools/td_cli.py` (modified)
```diff
@@ -35,8 +35,8 @@ def handle_fix_ci(args):
  35 |         if not get_github_token():
  36 |              raise CLIError("Missing GITHUB_TOKEN", code=401)
  37 | 
     |-        # Support legacy test expectation for JULES_API_KEY
     |-        if not getattr(args, 'api_key', None) and not os.environ.get("JULES_API_KEY"):
  38 |+        # Support legacy test expectation for JULES_API_KEY / ANTIGRAVITY_API_KEY
  39 |+        if not getattr(args, 'api_key', None) and not os.environ.get("ANTIGRAVITY_API_KEY") and not os.environ.get("JULES_API_KEY"):
  40 |             raise CLIError("Missing JULES_API_KEY", code=401)
  41 | 
  42 |         # Support legacy test expectation for repo name
```

### `dev-tools/tdw_services/cli.py` (modified)
```diff
@@ -282,7 +282,7 @@ def review(ctx, pr_number):
 282 | @click.pass_context
 283 | def analyze(ctx, file):
 284 |     orch = ctx.obj['ORCHESTRATOR']
     |-    res = orch.resolve_conflict(file) # Placeholder for analyze
 285 |+    res = orch.analyze_file(file)
 286 |     out(ctx, f"✅ Analyzed {file}", data={"result": res})
 287 | 
 288 | @ai.command()
@@ -329,7 +329,8 @@ def sync(ctx):
 329 | def fix_ci(ctx, pr_number, branch, api_key, dry_run):
 330 |     orch = ctx.obj['ORCHESTRATOR']
 331 |     res = orch.fix_ci(pr_number=pr_number, branch=branch, api_key=api_key, dry_run=dry_run)
     |-    out(ctx, f"🚀 Initialized Jules session for branch `{res['branch']}`", data=res)
 332 |+    agent_name = res.get('agent_name', 'Jules')
 333 |+    out(ctx, f"🚀 Initialized {agent_name} session for branch `{res['branch']}`", data=res)
 334 | 
 335 | @jules.command()
 336 | @click.option('--log')
@@ -354,5 +355,19 @@ def repair(ctx, logs, stdin, worktree):
 355 |     else:
 356 |         err(ctx, res['message'], data=res)
 357 | 
 358 |+# ==========================================
 359 |+# ANTIGRAVITY COMMAND GROUP
 360 |+# ==========================================
 361 |+@cli.group()
 362 |+def antigravity():
 363 |+    """Antigravity Agent Operations"""
 364 |+    pass
 365 |+
 366 |+antigravity.add_command(dispatch)
 367 |+antigravity.add_command(sync)
 368 |+antigravity.add_command(fix_ci)
 369 |+antigravity.add_command(repair_context)
 370 |+antigravity.add_command(repair)
 371 |+
 372 | if __name__ == "__main__":
 373 |     cli(obj={})
```

### `dev-tools/tdw_services/orchestrator.py` (modified)
```diff
@@ -99,6 +99,17 @@ def resolve_conflict(self, file_path: str) -> bool:
  99 |         """
 100 |         return self.ai.resolve_file_conflicts(file_path)
 101 | 
 102 |+    def analyze_file(self, file_path: str) -> str:
 103 |+        if not os.path.exists(file_path):
 104 |+            raise CLIError(f"File not found: {file_path}")
 105 |+        try:
 106 |+            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
 107 |+                content = f.read()
 108 |+            prompt = f"Analyze this file for bugs, style issues, and potential improvements:\n\n{content[:20000]}"
 109 |+            return self.ai.generate(prompt)
 110 |+        except Exception as e:
 111 |+            raise CLIError(f"Failed to analyze file: {e}")
 112 |+
 113 |     def find_conflict_files(self) -> List[str]:
 114 |         """
 115 |         Robustly finds files with git conflict markers, ignoring build artifacts and dependencies.
@@ -562,16 +573,17 @@ def fix_ci(self, pr_number=None, branch=None, api_key=None, dry_run=True):
 573 |         if failing_logs:
 574 |             prompt += "\n\nDetailed Failing Logs (Snippets):\n" + "\n---\n".join(failing_logs)
 575 | 
     |-        source_id = self.get_env_or_gha("JULES_SOURCE_ID") or self.jules.discover_source_id(repo_name)
     |-        if not source_id: raise CLIError("JULES_SOURCE_ID missing and auto-discovery failed.")
 576 |+        agent_name = "Antigravity" if os.environ.get("ANTIGRAVITY_API_KEY") else "Jules"
 577 |+        source_id = self.get_env_or_gha("ANTIGRAVITY_SOURCE_ID") or self.get_env_or_gha("JULES_SOURCE_ID") or self.jules.discover_source_id(repo_name)
 578 |+        if not source_id: raise CLIError("ANTIGRAVITY_SOURCE_ID or JULES_SOURCE_ID missing and auto-discovery failed.")
 579 |         session_name = "dry-run-session"
 580 |         if not dry_run:
 581 |             res = self.jules.create_session_from_source(source_id, branch, prompt)
 582 |             if res: session_name = res.get("name")
     |-            else: raise CLIError("Jules API session creation failed")
     |-        feedback = f"🤖 **Jules is on it!**\n\nInitialized autonomous repair session (`{session_name}`) for branch `{branch}`."
 583 |+            else: raise CLIError(f"{agent_name} API session creation failed")
 584 |+        feedback = f"🤖 **{agent_name} is on it!**\n\nInitialized autonomous repair session (`{session_name}`) for branch `{branch}`."
 585 |         if pr and not dry_run: pr.create_issue_comment(feedback)
     |-        return {"session": session_name, "branch": branch, "feedback": feedback}
 586 |+        return {"session": session_name, "branch": branch, "feedback": feedback, "agent_name": agent_name}
 587 | 
 588 |     def manage_reviews(self, check_responses=False, cleanup_comments=False, dry_run=True):
 589 |         g = get_github_client(); repo = g.get_repo(get_repo_name()); login = g.get_user().login; prs_data = []
```

### `dev-tools/tdw_services/services/gemini.py` (modified)
```diff
@@ -10,12 +10,29 @@ def __init__(self, ollama_url: str = None, ollama_model: str = None, gemini_api_
  10 |         # Note: ollama_url is now managed centrally in utils.py via get_ollama_url()
  11 |         self.ollama_model = ollama_model or get_ollama_model()
  12 |         self.gemini_api_key = gemini_api_key or os.environ.get("GEMINI_API_KEY")
  13 |+        
  14 |+        # Check environment or project config JSON for fallback toggle (env var takes precedence)
  15 |+        env_fallback = os.environ.get("USE_GEMINI_FALLBACK")
  16 |+        if env_fallback is not None:
  17 |+            self.use_gemini_fallback = env_fallback.lower() in ("true", "1", "yes")
  18 |+        else:
  19 |+            self.use_gemini_fallback = True
  20 |+            try:
  21 |+                config_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "project_config.json")
  22 |+                if os.path.exists(config_path):
  23 |+                    with open(config_path, 'r') as f:
  24 |+                        cfg = json.load(f)
  25 |+                        val = cfg.get("use_gemini_fallback")
  26 |+                        if val is not None:
  27 |+                            self.use_gemini_fallback = str(val).lower() in ("true", "1", "yes")
  28 |+            except Exception:
  29 |+                pass
  30 | 
  31 |     def is_ollama_available(self) -> bool:
  32 |         return is_ollama_available()
  33 | 
     |-    def call_ollama(self, prompt: str, model: str = None, max_retries: int = 3) -> Optional[str]:
     |-        return call_ollama(prompt, model=model or self.ollama_model, max_retries=max_retries)
  34 |+    def call_ollama(self, prompt: str, model: str = None, max_retries: int = 3, schema: Optional[Dict] = None) -> Optional[str]:
  35 |+        return call_ollama(prompt, model=model or self.ollama_model, max_retries=max_retries, schema=schema)
  36 | 
  37 |     def call_gemini(self, prompt: str, schema: Optional[Dict] = None) -> Optional[str]:
  38 |         if not self.gemini_api_key:
@@ -51,16 +68,17 @@ def generate(self, prompt: str, schema: Optional[Dict] = None, model: str = None
  68 |             # For JSON schema, we just append instruction for Ollama
  69 |             if schema:
  70 |                 prompt += f"\n\nOutput MUST be valid JSON matching this schema: {json.dumps(schema)}"
     |-            res = self.call_ollama(prompt, model=model)
  71 |+            res = self.call_ollama(prompt, model=model, schema=schema)
  72 |             if res:
  73 |                 return res
  74 | 
     |-        # Fallback to Gemini
     |-        res = self.call_gemini(prompt, schema)
     |-        if res:
     |-            return res
     |-
     |-        raise EnvironmentError("No inference engine available.")
  75 |+        # Fallback to Gemini only if enabled
  76 |+        if self.use_gemini_fallback:
  77 |+            res = self.call_gemini(prompt, schema)
  78 |+            if res:
  79 |+                return res
  80 |+ 
  81 |+        raise EnvironmentError("No inference engine available (Ollama unavailable/failed, Gemini fallback disabled).")
  82 | 
  83 |     def clean_llm_output(self, text: str) -> str:
  84 |         return clean_llm_output(text)
```

### `dev-tools/tdw_services/services/github.py` (modified)
```diff
@@ -7,7 +7,8 @@
   7 | 
   8 | class GitHubClient:
   9 |     def __init__(self, token: Optional[str] = None, repo: Optional[str] = None):
     |-        self.token = token or os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN")
  10 |+        from utils import get_github_token
  11 |+        self.token = token or os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN") or get_github_token()
  12 |         if not self.token:
  13 |             raise ValueError("Missing GITHUB_TOKEN environment variable.")
  14 |         self.repo = repo or os.environ.get("GITHUB_REPOSITORY") or os.environ.get("GH_REPO")
```

### `dev-tools/tdw_services/services/jules.py` (modified)
```diff
@@ -4,9 +4,9 @@
   4 | 
   5 | class JulesClient:
   6 |     def __init__(self, api_key: Optional[str] = None):
     |-        self.api_key = api_key or os.environ.get("JULES_API_KEY")
   7 |+        self.api_key = api_key or os.environ.get("ANTIGRAVITY_API_KEY") or os.environ.get("JULES_API_KEY")
   8 |         if not self.api_key:
     |-            raise ValueError("JULES_API_KEY is not set or empty")
   9 |+            raise ValueError("ANTIGRAVITY_API_KEY or JULES_API_KEY is not set or empty")
  10 | 
  11 |         self.base_url = "https://jules.googleapis.com/v1alpha"
  12 |         self.legacy_url = "https://api.jules.ai/v1/sessions"
```

### `dev-tools/utils.py` (modified)
```diff
@@ -27,7 +27,7 @@ def get_ollama_url() -> str:
  27 | 
  28 | def get_ollama_model() -> str:
  29 |     """Dynamic getter for Ollama Model."""
     |-    return os.environ.get("OLLAMA_MODEL", "qwen2.5-coder:7b")
  30 |+    return os.environ.get("OLLAMA_MODEL", "llama3.2")
  31 | 
  32 | def clean_llm_output(text: str) -> str:
  33 |     """Removes markdown code blocks if present."""
@@ -52,7 +52,21 @@ def is_ollama_available() -> bool:
  52 |     except Exception:
  53 |         return False
  54 | 
     |-def call_ollama(prompt: str, model: str = None, url: Optional[str] = None, max_retries: int = 3) -> Optional[str]:
  55 |+def to_standard_schema(schema):
  56 |+    """Recursively converts Gemini-style uppercase types to standard lowercase JSON schema types."""
  57 |+    if isinstance(schema, dict):
  58 |+        new_schema = {}
  59 |+        for k, v in schema.items():
  60 |+            if k == "type" and isinstance(v, str):
  61 |+                new_schema[k] = v.lower()
  62 |+            else:
  63 |+                new_schema[k] = to_standard_schema(v)
  64 |+        return new_schema
  65 |+    elif isinstance(schema, list):
  66 |+        return [to_standard_schema(item) for item in schema]
  67 |+    return schema
  68 |+
  69 |+def call_ollama(prompt: str, model: str = None, url: Optional[str] = None, max_retries: int = 3, schema = None) -> Optional[str]:
  70 |     """Unified helper to call local Ollama API with retries using urllib."""
  71 |     base_url = url or get_ollama_url()
  72 |     if not base_url.endswith("/"):
@@ -69,6 +83,9 @@ def call_ollama(prompt: str, model: str = None, url: Optional[str] = None, max_r
  83 |         "stream": False
  84 |     }
  85 | 
  86 |+    if schema:
  87 |+        data["format"] = to_standard_schema(schema)
  88 |+
  89 |     req = urllib.request.Request(
  90 |         target_url,
  91 |         data=json.dumps(data).encode("utf-8"),
@@ -78,7 +95,7 @@ def call_ollama(prompt: str, model: str = None, url: Optional[str] = None, max_r
  95 |     for attempt in range(1, max_retries + 1):
  96 |         try:
  97 |             try:
     |-                with urllib.request.urlopen(req, timeout=120) as response:
  98 |+                with urllib.request.urlopen(req, timeout=900) as response:
  99 |                     res_data = json.loads(response.read().decode("utf-8"))
 100 |                     return res_data.get("response")
 101 |             except (urllib.error.HTTPError, urllib.error.URLError) as e:
```

### `tests/dev-tools/test_dev_tools_sdk.py` (modified)
```diff
@@ -31,4 +31,5 @@ def test_cli_parser_supports_new_commands():
  31 |     assert parser.parse_args(["gh", "audit", "5"]).command == "audit"
  32 |     assert parser.parse_args(["ai", "analyze", "README.md"]).command == "analyze"
  33 |     assert parser.parse_args(["jules", "sync"]).command == "sync"
  34 |+    assert parser.parse_args(["antigravity", "sync"]).command == "sync"
  35 |     assert parser.parse_args(["repair"]).group == "repair"
```

### `tests/dev-tools/test_fix_ci.py` (modified)
```diff
@@ -57,5 +57,26 @@ def test_handle_fix_ci_missing_repo_name(self, mock_env_get, mock_repo, mock_tok
  57 |         self.assertEqual(cm.exception.code, 400)
  58 |         self.assertIn("Could not determine repository name", cm.exception.message)
  59 | 
  60 |+    @patch('td_cli.get_github_token')
  61 |+    @patch('td_cli.get_repo_name')
  62 |+    @patch('td_cli._orch.fix_ci')
  63 |+    @patch('os.environ.get')
  64 |+    def test_handle_fix_ci_with_antigravity_api_key(self, mock_env_get, mock_fix_ci, mock_repo, mock_token):
  65 |+        """Test that handle_fix_ci passes and calls fix_ci when ANTIGRAVITY_API_KEY is present"""
  66 |+        mock_token.return_value = "fake-token"
  67 |+        mock_repo.return_value = "owner/repo"
  68 |+        mock_env_get.side_effect = lambda k, default=None: "fake-antigravity-key" if k == "ANTIGRAVITY_API_KEY" else default
  69 |+        mock_fix_ci.return_value = {"branch": "main", "agent_name": "Antigravity"}
  70 |+
  71 |+        args = MagicMock()
  72 |+        args.api_key = None
  73 |+        args.pr_number = 123
  74 |+        args.branch = "main"
  75 |+        args.dry_run = True
  76 |+
  77 |+        res = td_cli.handle_fix_ci(args)
  78 |+        self.assertEqual(res["agent_name"], "Antigravity")
  79 |+        mock_fix_ci.assert_called_once()
  80 |+
  81 | if __name__ == '__main__':
  82 |     unittest.main()
```

### `tests/dev-tools/test_modern_cli.py` (modified)
```diff
@@ -33,5 +33,12 @@ def test_audit_pr_calls_orchestrator(self, mock_audit):
  33 |         self.assertTrue(kwargs['fetch'])
  34 |         self.assertFalse(kwargs['audit'])
  35 | 
  36 |+    @patch('tdw_services.orchestrator.Orchestrator.analyze_file')
  37 |+    def test_analyze_calls_orchestrator(self, mock_analyze):
  38 |+        mock_analyze.return_value = "solid code"
  39 |+        result = self.runner.invoke(cli, ['ai', 'analyze', 'README.md'])
  40 |+        self.assertEqual(result.exit_code, 0)
  41 |+        mock_analyze.assert_called_once_with('README.md')
  42 |+
  43 | if __name__ == '__main__':
  44 |     unittest.main()
```

### `tests/dev-tools/test_td_cli.py` (modified)
```diff
@@ -120,5 +120,35 @@ def test_handle_audit_pr_invalid_inputs(self, mock_repo, mock_client):
 120 |                     td_cli.handle_audit_pr(args)
 121 |                 self.assertIn(expected_msg, cm.exception.message)
 122 | 
 123 |+class TestOllamaSchemaConversion(unittest.TestCase):
 124 |+    def test_to_standard_schema(self):
 125 |+        from utils import to_standard_schema
 126 |+        gemini_schema = {
 127 |+            "type": "OBJECT",
 128 |+            "properties": {
 129 |+                "name": {"type": "STRING"},
 130 |+                "age": {"type": "INTEGER"},
 131 |+                "tags": {
 132 |+                    "type": "ARRAY",
 133 |+                    "items": {"type": "STRING"}
 134 |+                }
 135 |+            },
 136 |+            "required": ["name", "age"]
 137 |+        }
 138 |+        expected_schema = {
 139 |+            "type": "object",
 140 |+            "properties": {
 141 |+                "name": {"type": "string"},
 142 |+                "age": {"type": "integer"},
 143 |+                "tags": {
 144 |+                    "type": "array",
 145 |+                    "items": {"type": "string"}
 146 |+                }
 147 |+            },
 148 |+            "required": ["name", "age"]
 149 |+        }
 150 |+        self.assertEqual(to_standard_schema(gemini_schema), expected_schema)
 151 |+
 152 | if __name__ == '__main__':
 153 |     unittest.main()
 154 |+
```