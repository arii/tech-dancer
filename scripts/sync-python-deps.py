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
    req_file = repo_root / "requirements-dev.txt"

    if not req_file.exists():
        print(f"⚠️  {req_file} not found. Skipping Python dependency sync.")
        return

    print(f"🔄 Syncing Python dependencies from {req_file}...")

    # Try to use the virtualenv if it exists
    venv_python = repo_root / ".venv" / "bin" / "python"
    if not venv_python.exists():
        venv_python = Path(sys.executable)

    try:
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
        print("✅ Python dependencies synced successfully.")
    except subprocess.TimeoutExpired:
        print("❌ Timeout syncing Python dependencies.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to sync Python dependencies: {e.stderr}")
    except Exception as e:  # pylint: disable=broad-exception-caught
        print(f"❌ An error occurred: {e}")


if __name__ == "__main__":
    sync_deps()
