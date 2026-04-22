# PR Review Plan: #164 — Add vdev multi-branch environment orchestrator

<!-- PR_NUMBER: 164 -->

**Repo:** arii/tech-dancer — https://github.com/arii/tech-dancer/pull/164
**Stats:** +150/-0 across 2 file(s)

---

<!-- AGENT INSTRUCTIONS — READ BEFORE DOING ANYTHING ELSE

RULES:
1. Work ONLY from the diff content in this document. Do NOT fetch external data.
2. Do NOT alter the document structure, headings, or fenced code blocks.
3. Keep all ```json blocks intact and properly fenced — the parser depends on them.
4. Do NOT mark Step 3 verification items complete until Step 2 is fully done.

STEPS (in order):
  Step 1: Read the Description and Stats. If additions > 100 lines, you MUST find 10+ lines to cut.
  Step 2: For every file block in "Per-File Audit":
    - Read the diff.
    - Mark each checklist item [x] if clean, or write the violation inline.
    - Replace the "body" value in the Proposed inline comment JSON blocks with specific feedback.
    - Update "line" to the actual diff line number where the issue occurs.
    - You MUST leave a comment for every file, even if just confirming it is clean.
  Step 3: Verify all items below are complete, then mark each [x].
    [ ] Every audit checklist item is marked [x] or has a violation noted.
    [ ] Every Proposed inline comment has a real line number (not 1) and a real body (not a placeholder).
    [ ] The Submission body is filled in with ANTI-AI-SLOP, FINDINGS, and FINAL RECOMMENDATION.
  Step 4: Submit using the command in the Submission section at the bottom.
-->

## Description

Added `dev-tools/vdev.py` script to help orchestrate multi-branch development locally and provided corresponding instructions for AI agents in `AGENTS.md`.

---
*PR created automatically by Jules for task [8253435170338810059](https://jules.google.com/task/8253435170338810059) started by @arii*

---

## Review Standards

You are a Principal Software Engineer performing a deep technical audit.
Evaluate EVERY changed file against the following criteria:

1. Dead abstractions — new class/context/hook that a simpler primitive already handles?
2. Unnecessary indirection — adds a layer where a direct call would do?
3. Responsibility creep — component taking on logic that belongs in a hook or parent?
4. Import bloat — `import React` added unnecessarily? (Not needed in React 17+)
5. Token compliance — raw Tailwind classes or magic pixel values bypassing `design-tokens.ts`?
6. No arbitrary Tailwind — values like `text-[11px]`, `max-w-[1400px]` are explicitly banned.
7. Audit ratio — if additions > 100 lines, find at least 10 lines to cut.

Mandatory response sections (fill these in the Submission body below):
- ANTI-AI-SLOP: verbose/over-engineered patterns found, or confirmed absent
- FINDINGS: per-file critical feedback with specific line numbers
- FINAL RECOMMENDATION: Approved | Approved with Minor Changes | Not Approved

---

## Files Changed

- `[M]` [AGENTS.md](https://github.com/arii/tech-dancer/pull/164/files) `+6/-0`
- `[A]` [dev-tools/vdev.py](https://github.com/arii/tech-dancer/pull/164/files) `+144/-0`

---

## Per-File Audit

Note: Do NOT skip any file. Leave a comment for every file, even if clean.


<!-- BEGIN_FILE_AUDIT: AGENTS.md -->
---

### File: `AGENTS.md` +6/-0 (modified)

Diff:
```diff
@@ -80,3 +80,9 @@ These are **Rules for writing clean .tsx files** to ensure every `.tsx` file adh
 - Application routes MUST be code-split using `React.lazy()` or equivalent dynamic imports to keep bundles small.
 - Use `<Suspense>` with a standardized fallback (e.g., `<PageSkeleton />`) at route boundaries.
 - Ensure the application maintains single-page application (SPA) characteristics with environment-agnostic routing (e.g., handling base URLs cleanly for GitHub Pages).
+
+### 🤖 Isolated Development Environments (`vdev`)
+When asked to work on a new feature, bugfix, or isolated task while preserving the current workspace state, use the `vdev` CLI tool:
+* **Isolate:** Run `vdev setup <branch-name>` to create an isolated Docker/Worktree environment automatically.
+* **Execute:** Run tests, builds, or scripts inside that isolated environment using `vdev exec "<command>" --branch <branch-name>`.
+* **Cleanup:** Once the PR is submitted or the environment is no longer needed, clean it up using `vdev cleanup <branch-name>`.
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "AGENTS.md",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "AGENTS.md",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: AGENTS.md -->


<!-- BEGIN_FILE_AUDIT: dev-tools/vdev.py -->
---

### File: `dev-tools/vdev.py` +144/-0 (added)

Diff:
```diff
@@ -0,0 +1,144 @@
+import subprocess
+import os
+import shlex
+import typer
+from typing import Optional
+
+# Orchestrator for scaling multi-branch development.
+# Enables AI Agents and humans to work on GitHub issues in isolated Docker/Worktree environments.
+app = typer.Typer(help="Multi-Branch Environment Orchestrator (Vite/Docker)")
+
+def get_context():
+    """Identifies repo root and current branch for intelligent defaults."""
+    try:
+        root = subprocess.check_output(["git", "rev-parse", "--show-toplevel"], text=True).strip()
+        branch = subprocess.check_output(["git", "branch", "--show-current"], text=True).strip()
+        repo_name = os.path.basename(root)
+        return root, repo_name, branch
+    except subprocess.CalledProcessError:
+        typer.secho("[Oops!] Command must be run inside a git repository.", fg=typer.colors.RED)
+        raise typer.Exit(1)
+
+def sanitize_name(name: str) -> str:
+    """Sanitizes branch names (e.g., 'feat/ui') for Docker and file paths."""
+    return name.replace("/", "-").replace("_", "-")
+
+def resolve_target(target: Optional[str]):
+    """Defaults to active branch if no target provided."""
+    _, _, current_branch = get_context()
+    return target if target and target != "--curr" else current_branch
+
+def run_log(cmd, verbose: bool = True, check: bool = True):
+    if isinstance(cmd, str):
+        cmd = shlex.split(cmd)
+
+    cmd_str = shlex.join(cmd)
+    if verbose:
+        typer.secho(f"[vdev] Running: {cmd_str}", fg=typer.colors.CYAN)
+
+    try:
+        return subprocess.run(cmd, check=check)
+    except subprocess.CalledProcessError as e:
+        typer.secho(f"[Error] Command failed with exit code {e.returncode}: {cmd_str}", fg=typer.colors.RED)
+        if check:
+            raise typer.Exit(1)
+        return e
+
+@app.command()
+def setup(
+    target: Optional[str] = typer.Argument(None, help="The branch or PR to isolate."),
+    force_rebuild: bool = typer.Option(False, "--force", help="Force rebuild the Docker image without cache.")
+):
+    """
+    Initializes an isolated environment:
+    1. Creates Worktree -> 2. Builds Image -> 3. Starts Container -> 4. Installs App
+    """
+    branch = resolve_target(target)
+    root, repo_name, _ = get_context()
+
+    safe_branch = sanitize_name(branch)
+    container_name = f"vdev-{repo_name}-{safe_branch}"
+    image_tag = f"{repo_name}-img:{safe_branch}"
+
+    # Safely place the worktree next to the current repo to avoid nested git issues
+    worktree_path = os.path.abspath(os.path.join(root, "..", f"{repo_name}-{safe_branch}"))
+
+    typer.secho(f"🚀 Scaling isolated environment for branch '{branch}'...", fg=typer.colors.GREEN, bold=True)
+
+    # 1. Isolate Filesystem
+    if not os.path.exists(worktree_path):
+        typer.echo(f"📁 Creating isolated git worktree at {worktree_path}")
+        run_log(["git", "worktree", "add", worktree_path, branch])
+    else:
+        typer.echo(f"📁 Worktree already exists at {worktree_path}")
+
+    # 2. Build Runtime Container
+    typer.echo("🐳 Building Docker image...")
+    build_cmd = ["docker", "build"]
+    if force_rebuild:
+        build_cmd.append("--no-cache")
+    build_cmd.extend(["-t", image_tag, worktree_path])
+    run_log(build_cmd)
+
+    # 3. Start Container
+    typer.echo("🟢 Starting isolated container...")
+    run_log(["docker", "run", "-d", "--name", container_name, image_tag])
+
+    # 4. Agent Readiness: Install dependencies
+    typer.echo("📦 Installing dependencies (this might take a second)...")
+    run_log(["docker", "exec", container_name, "npm", "install"])
+    run_log(["docker", "exec", container_name, "npm", "run", "build"])
+
+    typer.secho(f"✅ All set! Branch '{branch}' is ready for isolated development.", fg=typer.colors.GREEN, bold=True)
+
+@app.command()
+def status():
+    """Lists all active vdev branch environments on this machine."""
+    _, repo_name, _ = get_context()
+    typer.secho(f"🔍 Active isolated environments for '{repo_name}':", bold=True, fg=typer.colors.BLUE)
+    run_log(["docker", "ps", "--filter", f"name=vdev-{repo_name}", "--format", "table {{.Names}}\t{{.Status}}\t{{.Image}}"])
+
+@app.command()
+def exec(
+    cmd: str = typer.Argument(..., help="Command to run"),
+    target: Optional[str] = typer.Option(None, "--branch", "-b", help="Target branch container")
+):
+    """Run a command inside the branch container."""
+    branch = resolve_target(target)
+    _, repo_name, _ = get_context()
+    safe_branch = sanitize_name(branch)
+
+    exec_cmd = ["docker", "exec", f"vdev-{repo_name}-{safe_branch}"] + shlex.split(cmd)
+    run_log(exec_cmd)
+
+@app.command()
+def shell(target: Optional[str] = typer.Argument(None, help="Target branch container")):
+    """Interactive shell for debugging a specific branch."""
+    branch = resolve_target(target)
+    _, repo_name, _ = get_context()
+    safe_branch = sanitize_name(branch)
+
+    typer.secho(f"💻 Dropping you into the shell for '{branch}'...", fg=typer.colors.YELLOW)
+    subprocess.run(["docker", "exec", "-it", f"vdev-{repo_name}-{safe_branch}", "/bin/sh"])
+
+@app.command()
+def cleanup(target: Optional[str] = typer.Argument(None, help="Target branch to clean up")):
+    """Decommissions the container and removes the worktree."""
+    branch = resolve_target(target)
+    root, repo_name, _ = get_context()
+    safe_branch = sanitize_name(branch)
+    worktree_path = os.path.abspath(os.path.join(root, "..", f"{repo_name}-{safe_branch}"))
+
+    typer.secho(f"🧹 Tearing down isolated environment for '{branch}'...", fg=typer.colors.YELLOW)
+
+    typer.echo("🛑 Stopping and removing Docker container...")
+    run_log(["docker", "stop", f"vdev-{repo_name}-{safe_branch}"], check=False)
+    run_log(["docker", "rm", f"vdev-{repo_name}-{safe_branch}"], check=False)
+
+    typer.echo("✂️ Removing git worktree...")
+    run_log(["git", "worktree", "remove", worktree_path], check=False)
+
+    typer.secho("✅ Cleanup complete!", fg=typer.colors.GREEN)
+
+if __name__ == "__main__":
+    app()
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "dev-tools/vdev.py",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "dev-tools/vdev.py",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: dev-tools/vdev.py -->


---

## Submission

After completing every file block above, fill in the body below and run the command.

<!-- BEGIN_SUBMISSION_JSON -->
```json
{
  "body": "## ANTI-AI-SLOP\n<findings or confirmed absent>\n\n## FINDINGS\n<per-file summary with line references>\n\n## FINAL RECOMMENDATION\n<!-- Approved | Approved with Minor Changes | Not Approved -->",
  "comments": [
    { "path": "src/example.tsx", "line": 10, "body": "Inline feedback here" }
  ]
}
```
<!-- END_SUBMISSION_JSON -->

Command:
```bash
python3 dev-tools/submit_pr_review_data.py plan-pr-review-164.md
```
