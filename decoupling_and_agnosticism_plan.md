# Planning Sheet: `boomtick-pkg` Decoupling and Multi-Repo Agnosticism

This comprehensive planning document outlines the design specifications, baseline assumptions, identified code dependencies, and a phase-by-phase task breakdown to make `boomtick-pkg` fully repository-agnostic and ready for PyPI publication.

---

## 1. Executive Summary & Objective

The goal is to transition `boomtick-pkg` (encompassing the `td-cli` Python tool and the TypeScript MCP server) from a package tailored to `boomtick.blog` (`tech-dancer`) into a highly portable, self-contained utility. 
This plan enforces baseline repository specifications, removes silent default configurations in favor of loud "fail-fast" runtime exceptions, and simplifies root-level setup so third-party developers can adopt this tool suite instantly.

---

## 2. Enforced Baseline Assumptions

To ensure `boomtick-pkg` can be quickly adopted and provide immediate value, it enforces a standard set of workspace assumptions. Target repositories are expected to conform to the following:

- **Build System:** The repository uses **Vite** as its bundler and development build server.
- **E2E Testing:** Browser testing is managed by **Playwright**, with commands exposed via typical npm/pnpm run scripts (e.g. `pnpm test:e2e`).
- **Component Layout Primitives:** The UI framework follows a primitive layout pattern standardizing structure around `<Stack>`, `<Box>`, and `<Grid>` components rather than raw CSS/Tailwind classes, enabling anti-pattern audits.
- **Package Management:** The repository relies on **pnpm** (with engine validation pinned or configured).
- **Project Structure:** A standard React/TypeScript workspace configuration with code structured within `src/components/`, `src/layouts/`, and `src/pages/`.

---

## 3. Configuration Schema & Setup

### Proposed `project_config.json` (Repository Root)
A single, required file placed at the root of the host repository.

```json
{
  "github_repo": "owner/repository",
  "vite_base_path": "/",
  "base_branch": "origin/main",
  "core_dirs": [
    "src/layouts/",
    "src/components/"
  ]
}
```

### Simplified Onboarding Steps
1. Copy the `boomtick-pkg/` folder to the target repository's root.
2. Create `project_config.json` at the root with host-specific values.
3. Run the setup wrapper:
   ```bash
   cd boomtick-pkg && ./install.sh
   ```

---

## 4. Agnosticism Gaps & Proposed Remediations

| Area | Location | Current Issue | Proposed Remediation |
| :--- | :--- | :--- | :--- |
| **Config Defaults** | `dev_tools/config.py` | Hardcoded fallback repo `"arii/tech-dancer"` and base path `"/tech-dancer/"`. | Remove all hardcoded strings. Throw `ValueError` during initialization if required keys are missing or undetectable. |
| **MCP Configuration** | `mcp/src/config.ts` | Silent fallback values for base path. | Decouple and raise loud `Error` exceptions if keys are missing from environment or `project_config.json`. |
| **MCP Env Template** | `mcp/.env.example` | Contains hardcoded `GITHUB_OWNER=arii`, `GITHUB_REPO=tech-dancer`, and `VITE_BASE_PATH=/tech-dancer/`. | Replace hardcoded values with generic placeholders (`your-org`, `your-repo`, `/`). |
| **Content & Routing** | `mcp/src/tools/repo.get_route_map.ts` | Hardcoded search for `src/config/routes.ts` and `content/` folders. | Parameterize routing path and content scope directories in `project_config.json`. |
| **Linter Rules** | `scripts/detect-antipatterns.mjs` | Lint rules are highly opinionated towards `tech-dancer`'s unique design token vocabulary. | Extract design token arrays (`allowedColors`, `allowedTextUtils`) to a local config file or make them overridable. |
| **CLI Orchestration** | `dev_tools/orchestrator.py` | Directly invokes scripts outside the package scope (e.g. `scripts/ux-discover-routes.ts`). | Package UX/routing utility scripts directly inside `boomtick-pkg/scripts/` so the package is self-contained. |
| **Dependency Sync** | `scripts/sync-python-deps.py` | Host-level script reaches inside the package folder to find requirements. | Move requirements installation and syncing strictly into the internal setup pipeline of the package. |
| **Agent Docs Setup** | `install.sh` / `setup-agent.sh` | Agent docs (`.agents/`, `AGENTS.md`) are currently duplicated or manually copied to the host root. | Automatically initialize/sync base agent docs and guidelines from the package to the host repository root during setup. |

---

## 5. Phase-by-Phase Task Breakdown (GitHub Issue Spec)

The following tasks are structured to be parsed directly into design specification issues:

### Phase 1: Config Parsing & Loud Fail-Fast
- [ ] **Issue 1.1:** Update `ProjectConfig` dataclass in `config.py` to set defaults for `github_repo` and `vite_base_path` to `None`.
- [ ] **Issue 1.2:** Update `load_project_config` in `config.py` to throw a `ValueError` with clear setup instructions when mandatory parameters are missing or cannot be detected.
- [ ] **Issue 1.3:** Align TS MCP server `mcp/src/config.ts` to raise an error if `VITE_BASE_PATH` or `GITHUB_REPO` are undefined.
- [ ] **Issue 1.4:** Update Python CLI configuration unit tests (`tests/test_config.py`) to assert exception raising.

### Phase 2: Decoupling Routing & Content
- [ ] **Issue 2.1:** Introduce optional configuration attributes `router_entry_path` and custom `content_scopes` in `project_config.json`.
- [ ] **Issue 2.2:** Update `repo.get_route_map` and impact analysis libraries to read and consume these new configuration paths.

### Phase 3: Modularizing Linting & Antipattern Auditing
- [ ] **Issue 3.1:** Extract design-token rules from `detect-antipatterns.mjs` into a configurable layout config JSON.
- [ ] **Issue 3.2:** Migrate all UX routing and crawler scripts currently in `scripts/` (e.g. `ux-discover-routes.ts`) into `boomtick-pkg/scripts/`.

### Phase 4: Packaging and PyPI Prep
- [ ] **Issue 4.1:** Clean up `requirements.txt` and package metadata in `pyproject.toml` or `setup.py` inside `boomtick-pkg/cli/`.
- [ ] **Issue 4.2:** Publish updated integration instructions and PyPI documentation (detailing Vite, Playwright, and Component specifications) to `README.md`.
- [ ] **Issue 4.3:** Update setup/install scripts to automatically provision `.agents/` configurations and `AGENTS.md` to the host repository root.
