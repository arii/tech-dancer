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
    print("🔄 Syncing Python dependencies by installing boomtick from PyPI...")

    # Try to use the virtualenv if it exists
    venv_python = repo_root / ".venv" / "bin" / "python"
    if not venv_python.exists():
        venv_python = Path(sys.executable)

    try:
        # Install boomtick package from PyPI
        subprocess.run(
            [
                str(venv_python),
                "-m",
                "pip",
                "install",
                "--upgrade",
                "--no-cache-dir",
                "--break-system-packages",
                "boomtick",
            ],
            check=True,
            capture_output=True,
            text=True,
            timeout=600,
        )

        # Install requirements-dev.txt if it exists
        req_dev = repo_root / "requirements-dev.txt"
        if req_dev.exists():
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
                    str(req_dev),
                ],
                check=True,
                capture_output=True,
                text=True,
                timeout=300,
            )

        print("✅ Python dependencies synced and 'boomtick' installed successfully.")
    except subprocess.TimeoutExpired:
        print("❌ Timeout syncing Python dependencies.")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to sync Python dependencies: {e.stderr}")
    except Exception as e:
        print(f"❌ An error occurred: {e}")


if __name__ == "__main__":
    sync_deps()
