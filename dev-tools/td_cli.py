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
    print(f"Error: Could not import tdw_services. Ensure your environment is set up correctly.")
    print(f"Details: {e}")
    sys.exit(1)

def main():
    # click entry point automatically handles sys.argv
    cli(obj={})

if __name__ == "__main__":
    # click entry point automatically handles sys.argv
    cli(obj={})
