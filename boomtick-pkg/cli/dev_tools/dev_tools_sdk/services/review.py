from __future__ import annotations

import sys
import os

# Ensure dev_tools is in path to import utils
# Using absolute path for robustness
_current_dir = os.path.dirname(os.path.abspath(__file__))
_dev_tools_dir = os.path.abspath(os.path.join(_current_dir, "..", ".."))
if _dev_tools_dir not in sys.path:
    sys.path.insert(0, _dev_tools_dir)

try:
    from utils import get_stack_versions
except ImportError:
    # Fallback for different execution contexts
    def get_stack_versions(fetch_latest=False):
        return {}

class ReviewService:
    def build_prompt(self, context: str) -> str:
        try:
            stack_versions = get_stack_versions(fetch_latest=True)
        except Exception:
            stack_versions = {}

        versions_block = "\n".join([f"- {k}: {v}" for k, v in stack_versions.items()]) if stack_versions else "Unknown"

        return (
            f"You are a strict code reviewer.\n"
            f"## Current Stack Versions (Source of Truth)\n{versions_block}\n\n"
            f"Rules:\n"
            f"- DO NOT suggest or implement downgrading any versions listed in the 'Current Stack Versions' section.\n\n"
            f"Review the following context and provide actionable fixes:\n\n{context}"
        )
