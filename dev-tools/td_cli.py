#!/usr/bin/env python3
"""
td_cli.py - Tech-Dancer Developer CLI Shim

This script is a thin wrapper around the unified tdw_services CLI.
It maintains backward compatibility for existing scripts and CI workflows.
"""

import sys
import os

# Add the dev-tools directory to sys.path so we can import tdw_services
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from tdw_services.cli import cli
except ImportError as e:
    print(f"Error: Could not import tdw_services or its dependencies.")
    print(f"Details: {e}")
    print("\nTroubleshooting:")
    print("1. Ensure dependencies are installed: pip install -e dev-tools/")
    print("2. Ensure PYTHONPATH includes the dev-tools directory.")
    print("   Example: export PYTHONPATH=$PYTHONPATH:$(pwd)/dev-tools")
    sys.exit(1)

def main():
    # click entry point automatically handles sys.argv
    cli(obj={})

if __name__ == "__main__":
    main()
