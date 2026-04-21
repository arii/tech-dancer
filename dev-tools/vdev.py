import subprocess
import os
import shlex
import typer
from typing import Optional

# Orchestrator for scaling multi-branch development.
# Enables AI Agents and humans to work on GitHub issues in isolated Docker/Worktree environments.
app = typer.Typer(help="Multi-Branch Environment Orchestrator (Vite/Docker)")

def get_context():
    """Identifies repo root and current branch for intelligent defaults."""
    try:
        root = subprocess.check_output(["git", "rev-parse", "--show-toplevel"], text=True).strip()
        branch = subprocess.check_output(["git", "branch", "--show-current"], text=True).strip()
        repo_name = os.path.basename(root)
        return root, repo_name, branch
    except subprocess.CalledProcessError:
        typer.secho("[Oops!] Command must be run inside a git repository.", fg=typer.colors.RED)
        raise typer.Exit(1)

def sanitize_name(name: str) -> str:
    """Sanitizes branch names (e.g., 'feat/ui') for Docker and file paths."""
    return name.replace("/", "-").replace("_", "-")

def resolve_target(target: Optional[str]):
    """Defaults to active branch if no target provided."""
    _, _, current_branch = get_context()
    return target if target and target != "--curr" else current_branch

def run_log(cmd, verbose: bool = True, check: bool = True):
    if isinstance(cmd, str):
        cmd = shlex.split(cmd)

    cmd_str = shlex.join(cmd)
    if verbose:
        typer.secho(f"[vdev] Running: {cmd_str}", fg=typer.colors.CYAN)

    try:
        return subprocess.run(cmd, check=check)
    except subprocess.CalledProcessError as e:
        typer.secho(f"[Error] Command failed with exit code {e.returncode}: {cmd_str}", fg=typer.colors.RED)
        if check:
            raise typer.Exit(1)
        return e
    except FileNotFoundError:
        typer.secho(f"[Error] Command not found: {cmd[0]}. Please ensure it is installed.", fg=typer.colors.RED)
        if check:
            raise typer.Exit(1)
        return None

@app.command()
def setup(
    target: Optional[str] = typer.Argument(None, help="The branch or PR to isolate."),
    force_rebuild: bool = typer.Option(False, "--force", help="Force rebuild the Docker image without cache.")
):
    """
    Initializes an isolated environment:
    1. Creates Worktree -> 2. Builds Image -> 3. Starts Container -> 4. Installs App
    """
    branch = resolve_target(target)
    root, repo_name, _ = get_context()

    safe_branch = sanitize_name(branch)
    container_name = f"vdev-{repo_name}-{safe_branch}"
    image_tag = f"{repo_name}-img:{safe_branch}"

    # Safely place the worktree next to the current repo to avoid nested git issues
    worktree_path = os.path.abspath(os.path.join(root, "..", f"{repo_name}-{safe_branch}"))

    typer.secho(f"🚀 Scaling isolated environment for branch '{branch}'...", fg=typer.colors.GREEN, bold=True)

    # 1. Isolate Filesystem
    if not os.path.exists(worktree_path):
        typer.echo(f"📁 Creating isolated git worktree at {worktree_path}")
        run_log(["git", "worktree", "add", worktree_path, branch])
    else:
        typer.echo(f"📁 Worktree already exists at {worktree_path}")

    # 2. Build Runtime Container
    typer.echo("🐳 Building Docker image...")
    build_cmd = ["docker", "build"]
    if force_rebuild:
        build_cmd.append("--no-cache")
    build_cmd.extend(["-t", image_tag, worktree_path])
    run_log(build_cmd)

    # 3. Start Container
    typer.echo("🟢 Starting isolated container...")
    run_log(["docker", "run", "-d", "--name", container_name, image_tag])

    # 4. Agent Readiness: Install dependencies
    typer.echo("📦 Installing dependencies (this might take a second)...")
    run_log(["docker", "exec", container_name, "npm", "install"])
    run_log(["docker", "exec", container_name, "npm", "run", "build"])

    typer.secho(f"✅ All set! Branch '{branch}' is ready for isolated development.", fg=typer.colors.GREEN, bold=True)

@app.command()
def status():
    """Lists all active vdev branch environments on this machine."""
    _, repo_name, _ = get_context()
    typer.secho(f"🔍 Active isolated environments for '{repo_name}':", bold=True, fg=typer.colors.BLUE)
    run_log(["docker", "ps", "--filter", f"name=vdev-{repo_name}", "--format", "table {{.Names}}\t{{.Status}}\t{{.Image}}"])

@app.command()
def exec(
    cmd: str = typer.Argument(..., help="Command to run"),
    target: Optional[str] = typer.Option(None, "--branch", "-b", help="Target branch container")
):
    """Run a command inside the branch container."""
    branch = resolve_target(target)
    _, repo_name, _ = get_context()
    safe_branch = sanitize_name(branch)

    exec_cmd = ["docker", "exec", f"vdev-{repo_name}-{safe_branch}"] + shlex.split(cmd)
    run_log(exec_cmd)

@app.command()
def shell(target: Optional[str] = typer.Argument(None, help="Target branch container")):
    """Interactive shell for debugging a specific branch."""
    branch = resolve_target(target)
    _, repo_name, _ = get_context()
    safe_branch = sanitize_name(branch)

    typer.secho(f"💻 Dropping you into the shell for '{branch}'...", fg=typer.colors.YELLOW)
    subprocess.run(["docker", "exec", "-it", f"vdev-{repo_name}-{safe_branch}", "/bin/sh"])

@app.command()
def cleanup(target: Optional[str] = typer.Argument(None, help="Target branch to clean up")):
    """Decommissions the container and removes the worktree."""
    branch = resolve_target(target)
    root, repo_name, _ = get_context()
    safe_branch = sanitize_name(branch)
    worktree_path = os.path.abspath(os.path.join(root, "..", f"{repo_name}-{safe_branch}"))

    typer.secho(f"🧹 Tearing down isolated environment for '{branch}'...", fg=typer.colors.YELLOW)

    typer.echo("🛑 Stopping and removing Docker container...")
    run_log(["docker", "stop", f"vdev-{repo_name}-{safe_branch}"], check=False)
    run_log(["docker", "rm", f"vdev-{repo_name}-{safe_branch}"], check=False)

    typer.echo("✂️ Removing git worktree...")
    run_log(["git", "worktree", "remove", worktree_path], check=False)

    typer.secho("✅ Cleanup complete!", fg=typer.colors.GREEN)

if __name__ == "__main__":
    app()
