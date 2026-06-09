#!/usr/bin/env python3
"""
Common configuration and utilities for hrm-workspace scripts.
Provides consistent paths, logging, and shared functionality.
"""

import os
import logging
from pathlib import Path

# --- Workspace Configuration ---
WORKSPACE_ROOT = Path(__file__).parent.absolute()
HRM_REPO_DIR = WORKSPACE_ROOT / "hrm"
WORKTREES_BASE = WORKSPACE_ROOT / "worktrees"
CONFIG_DIR = WORKSPACE_ROOT / "config"
SCRIPTS_DIR = WORKSPACE_ROOT / "scripts"

# For backward compatibility with existing scripts
GIT_REPO_PATH = str(HRM_REPO_DIR)

# --- API Configuration ---
JULES_API_BASE_URL = "https://jules.googleapis.com/v1alpha"
JULES_DEFAULT_SOURCE = "sources/github/arii/hrm"

# --- Logging Configuration ---
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

# --- Environment Detection ---
def is_workspace_environment():
    """Check if we're running in the hrm-workspace environment."""
    return (WORKSPACE_ROOT / "hrm").exists() and (WORKSPACE_ROOT / "hrm").is_dir()

def setup_logging(logger_name: str, level: int = logging.INFO):
    """Setup consistent logging across all scripts."""
    logging.basicConfig(
        level=level,
        format=LOG_FORMAT,
        datefmt=DATE_FORMAT,
        force=True  # Override any existing config
    )
    return logging.getLogger(logger_name)

# --- Path Utilities ---
def ensure_workspace():
    """Ensure we're in a valid workspace environment."""
    if not is_workspace_environment():
        raise RuntimeError(
            f"Not in a valid hrm-workspace environment. "
            f"Expected hrm directory at: {HRM_REPO_DIR}"
        )

def get_data_dir() -> Path:
    """Get directory for temporary data files (CSV exports, etc.)."""
    data_dir = WORKSPACE_ROOT / "data"
    data_dir.mkdir(exist_ok=True)
    return data_dir

# --- Script Environment Setup ---
def setup_python_path():
    """Add workspace directories to Python path for imports."""
    import sys
    paths_to_add = [
        str(WORKSPACE_ROOT),
        str(WORKSPACE_ROOT / "github-ops"),
        str(WORKSPACE_ROOT / "session-ops"),
        str(SCRIPTS_DIR),
    ]
    
    for path in paths_to_add:
        if path not in sys.path:
            sys.path.insert(0, path)