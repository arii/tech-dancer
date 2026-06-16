# Dev-Tools SDK Parity Matrix (Phase 1)

This matrix maps existing scripts and draft service implementations to the planned unified SDK targets.

## Core Runtime → Target Service

| Existing Source                         | Current Responsibility                | Target Module                                                    | Planned Methods                                               |
| --------------------------------------- | ------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------- |
| `dev-tools/repo_utils.py`               | repo scans, TSX checks, metrics       | `dev_tools_sdk/services/github.py` + `dev_tools_sdk/utils/fs.py` | `list_changed_files`, `collect_repo_metrics`, `find_patterns` |
| `dev-tools/utils.py`                    | auth, command helpers, GH variables   | `dev_tools_sdk/utils/auth.py` + `dev_tools_sdk/utils/git_ops.py` | `get_token`, `run_command`, `run_authenticated_gh`            |
| `dev-tools/repair.py`                   | local triage and repair orchestration | `dev_tools_sdk/orchestrator.py`                                  | `repair_local_state`                                          |
| `dev-tools/scope_check.py`              | scope/config checks                   | `dev_tools_sdk/config.py` + `dev_tools_sdk/orchestrator.py`      | `load_config`, `verify_scope`                                 |
| `dev-tools/mergellama.py`               | merge-aware AI analysis               | `dev_tools_sdk/services/gemini.py` / `ollama.py` / `review.py`   | `analyze_conflict`, `generate_review`                         |
| `dev-tools/td_cli.py`                   | command routing + handlers            | `dev_tools_sdk/cli.py` (primary), `dev-tools/td_cli.py` (shim)   | Typer command groups                                          |
| `dev-tools/clients/jules_api_client.py` | Jules API client                      | `dev_tools_sdk/services/jules.py`                                | `dispatch_session`, `sync_sessions`                           |

## Draft PR Services → Target Service

| Draft Source                                                                  | Candidate Target     | Notes                                                                     |
| ----------------------------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------- |
| `dev-tools/draft_api_services/PR-2/python_lib%2Fgithub_client%2Fclient.py`    | `services/github.py` | Pull request and issue operations to fold into GitHubService API surface. |
| `dev-tools/draft_api_services/PR-1/python%2Fgemini_service%2Fcore.py`         | `services/gemini.py` | Gemini request/response handling; unify models and error handling.        |
| `dev-tools/draft_api_services/PR-3/python%2Fgemini_service.py`                | `services/gemini.py` | Merge with PR-1 and PR-4 variants; normalize interface.                   |
| `dev-tools/draft_api_services/PR-4/python%2Fgemini_service.py`                | `services/gemini.py` | Prefer this as baseline if it has latest orchestration hooks.             |
| `dev-tools/draft_api_services/PR-3/python%2Fjules_service.py`                 | `services/jules.py`  | Session dispatch concepts to combine with runtime client.                 |
| `dev-tools/draft_api_services/9713/scripts%2Forchestration%2Forchestrator.py` | `orchestrator.py`    | Starting reference for cross-service coordination.                        |
| `dev-tools/draft_api_services/PR-4/python%2Forchestration_service.py`         | `orchestrator.py`    | Compare against 9713 for method parity and improved flow.                 |
| `dev-tools/draft_api_services/PR-3/python%2Fmain.py`                          | `cli.py`             | Extract command framing; map to final `gh/ai/jules/env` groups.           |

## Scripts Planned for Migration/Wrapping

| Script                           | Phase Action                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| `dev-tools/audit_headless.sh`    | Migrate logic into `Orchestrator.support_review`; keep wrapper temporarily.         |
| `dev-tools/analyze_workflows.sh` | Convert to Python diagnostic command in `td-cli env verify` or `td-cli ai analyze`. |
| `dev-tools/analyze_overlaps.sh`  | Convert into repository utility function and CLI subcommand.                        |
| `dev-tools/snapshot.sh`          | Keep script, read config through SDK when possible.                                 |
| `dev-tools/verify-mergellama.sh` | Fold into consolidated `td-cli env verify`.                                         |

## Open Decisions

1. Whether to keep `argparse` compatibility path in `dev-tools/td_cli.py` during transition.
2. Whether `ReviewService` should own prompt templates directly or delegate to `services/gemini.py` and `services/ollama.py`.
3. Which draft branch (`9713` vs `PR-4`) is the canonical baseline for orchestration behavior.

## Phase-1 Exit Check

- [x] Primary source inventory captured.
- [x] Draft service-to-target mapping created.
- [ ] Method-level parity checklist completed (next step).
- [ ] Deprecated script deprecation timeline drafted (next step).
