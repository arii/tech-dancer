import os
import subprocess
import sys
from pathlib import Path

def sync_deps():
    repo_root = Path(__file__).parent.parent
    cli_dir = repo_root / "boomtick-pkg" / "cli"
    req_file = cli_dir / "requirements.txt"

    if not req_file.exists():
        print(f"⚠️  {req_file} not found. Skipping Python dependency sync.")
        return

    print(f"🔄 Syncing Python dependencies from {req_file}...")

    # Try to use the virtualenv if it exists
    venv_python = repo_root / ".venv" / "bin" / "python"
    if not venv_python.exists():
        venv_python = Path(sys.executable)

    try:
        # Using --no-cache-dir to avoid disk space issues in some environments
        # and --upgrade to ensure latest specified versions
        # --break-system-packages is needed for some CI environments where the system python is managed
        cmd = [str(venv_python), "-m", "pip", "install", "--upgrade", "--no-cache-dir", "-r", str(req_file)]

        # Check if we are in a CI environment that might need --break-system-packages
        if os.environ.get('CI') == 'true' or os.environ.get('GITHUB_ACTIONS') == 'true':
            cmd.append("--break-system-packages")

        subprocess.run(
            cmd,
            check=True,
            capture_output=True,
            text=True,
            timeout=600 # Increased to 10 minutes for slow environments
        )
        print("✅ Python dependencies synced successfully.")
    except subprocess.TimeoutExpired:
        print("❌ Timeout syncing Python dependencies.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to sync Python dependencies: {e.stderr}")
    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    sync_deps()
