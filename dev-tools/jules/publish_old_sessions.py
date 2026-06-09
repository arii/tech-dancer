#!/usr/bin/env python3
"""
Publish old Jules sessions that may have stalled.
Uses unified configuration and data management.
"""

import csv
import subprocess
import os
import time
import argparse
from datetime import datetime, timedelta

# Import unified configuration
from common_config import (
    setup_logging, setup_python_path, get_data_dir, WORKSPACE_ROOT
)

# Setup
setup_python_path()
logger = setup_logging("publish_old_sessions")

# Configuration
CONSOLIDATED_WORKSTREAMS_CSV = "consolidated_workstreams.csv"
JULES_OPS_SCRIPT = "jules_ops.py"

def run_jules_ops_export():
    """Run jules_ops.py export to regenerate CSV files."""
    logger.info("Regenerating CSV data from Jules and GitHub...")
    
    jules_ops_path = WORKSPACE_ROOT / JULES_OPS_SCRIPT
    command = [
        "python3",
        str(jules_ops_path),
        "export",
        "--format",
        "csv"
    ]
    
    try:
        result = subprocess.run(
            command,
            cwd=str(WORKSPACE_ROOT),
            capture_output=True,
            text=True,
            check=False
        )
        
        if result.returncode == 0:
            logger.info("✅ CSV data regenerated successfully.")
        else:
            logger.error(f"❌ Failed to regenerate CSV data. Exit code: {result.returncode}")
            
        if result.stdout:
            logger.info(result.stdout)
        if result.stderr:
            logger.error(result.stderr)
    except FileNotFoundError:
        logger.error(f"Error: '{jules_ops_path}' not found.")
    except Exception as e:
        logger.error(f"An unexpected error occurred during CSV regeneration: {e}")


def get_unpublished_sessions():
    """
    Read the consolidated_workstreams.csv and return a list of completed sessions
    that do not have an associated PR.
    """
    data_dir = get_data_dir()
    csv_path = data_dir / CONSOLIDATED_WORKSTREAMS_CSV
    
    sessions_to_publish = []
    try:
        with open(csv_path, mode="r", newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Skip if session is not completed or already has PR
                if (
                    row["session_state"] == "COMPLETED"
                    and not row["pr_id"].strip()
                    and row["session_id"].strip() != "-"
                ):
                    sessions_to_publish.append(
                        {
                            "session_id": row["session_id"],
                            "session_title": row["session_title"],
                        }
                    )
    except FileNotFoundError:
        logger.error(f"Error: {csv_path} not found.")
    except Exception as e:
        logger.error(f"Error reading CSV: {e}")
    return sessions_to_publish


def publish_session_with_timeout(session_id, timeout_seconds=60):
    """
    Attempt to publish a single Jules session with a specified timeout.
    """
    logger.info(f"Publishing session: {session_id} (timeout: {timeout_seconds}s)...")
    
    jules_ops_path = WORKSPACE_ROOT / JULES_OPS_SCRIPT
    command = [
        "timeout",
        str(timeout_seconds),
        "python3",
        str(jules_ops_path),
        "publish",
        session_id,
    ]

    try:
        result = subprocess.run(
            command,
            cwd=str(WORKSPACE_ROOT),
            capture_output=True,
            text=True,
            check=False,
        )
        
        logger.info(f"--- Output for session {session_id} ---")
        if result.stdout:
            logger.info(result.stdout)
        if result.stderr:
            logger.error(result.stderr)
        logger.info(f"--- End Output for session {session_id} ---")

        if result.returncode == 0:
            logger.info(f"✅ Publish request for session {session_id} completed.")
            return True
        elif result.returncode == 124:  # Timeout exit code
            logger.warning(f"❌ Publish request for session {session_id} timed out after {timeout_seconds} seconds.")
            return False
        else:
            logger.error(f"❌ Publish request for session {session_id} failed with exit code {result.returncode}.")
            return False

    except FileNotFoundError:
        logger.error(f"Error: '{jules_ops_path}' or 'timeout' command not found.")
    except Exception as e:
        logger.error(f"An unexpected error occurred: {e}")
    return False


def main():
    parser = argparse.ArgumentParser(
        description="Collect and publish old Jules sessions without associated PRs."
    )
    parser.add_argument(
        "--update",
        action="store_true",
        help="Regenerate consolidated_workstreams.csv before processing sessions.",
    )
    args = parser.parse_args()

    args = parser.parse_args()

    if args.update:
        run_jules_ops_export()
        # Give a moment for files to be written
        time.sleep(2)

    logger.info("Collecting unpublished Jules sessions...")

    sessions = get_unpublished_sessions()

    if not sessions:
        logger.info("No completed, unpublished sessions found.")
        return

    logger.info(f"Found {len(sessions)} completed, unpublished sessions.")

    for session in sessions:
        session_id = session["session_id"]
        session_title = session["session_title"]
        logger.info(f"Processing session ID: {session_id}, Title: {session_title}")
        publish_session_with_timeout(session_id)
        time.sleep(1)  # Small delay to prevent overwhelming the API


if __name__ == "__main__":
    main()
