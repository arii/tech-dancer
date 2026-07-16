# pylint: disable=invalid-name,missing-docstring
import os
import subprocess
import sys
from pathlib import Path


def sync_deps():
    if os.environ.get("SKIP_BOOMTICK_PKG") == "true" or os.environ.get("VERCEL") == "1":
        print("⏭️ Skipping Python dependency sync (SKIP_BOOMTICK_PKG is true or on Vercel).")
        return

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
        # 1. Sync requirements
        # Using --no-cache-dir to avoid disk space issues in some environments
        # and --upgrade to ensure latest specified versions
        subprocess.run(
            [
                str(venv_python),
                "-m",
                "pip",
                "install",
                "--upgrade",
                "--no-cache-dir",
                "--break-system-packages",
                "-r",
                str(req_file),
            ],
            check=True,
            capture_output=True,
            text=True,
            timeout=600,
        )

        # 2. Ensure the CLI package itself is installed in editable mode
        # This ensures the 'td' entry point is correctly registered/updated
        subprocess.run(
            [
                str(venv_python),
                "-m",
                "pip",
                "install",
                "-e",
                str(cli_dir),
                "--break-system-packages",
            ],
            check=True,
            capture_output=True,
            text=True,
            timeout=300,
        )

        print("✅ Python dependencies and 'td' CLI synced successfully.")
    except subprocess.TimeoutExpired:
        print("❌ Timeout syncing Python dependencies.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to sync Python dependencies: {e.stderr}")
    except Exception as e:
        print(f"❌ An error occurred: {e}")


if __name__ == "__main__":
    sync_deps()
