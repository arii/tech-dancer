#!/usr/bin/env python3
"""
Close Jules sessions associated with specific PR numbers.
Uses unified Jules client and configuration.
"""

import sys
import re

# Import unified configuration and client
from common_config import setup_logging, setup_python_path
from jules_client import get_jules_client

# Setup
setup_python_path()
logger = setup_logging("jules_session_closer")


def close_sessions_for_prs(pr_numbers):
    """Close Jules sessions associated with a list of PR numbers."""
    client = get_jules_client()
    
    logger.info("Fetching all sessions from Jules...")
    sessions = client.list_sessions()
    
    if not sessions:
        logger.info("No sessions found.")
        return
        
    sessions_to_close = []
    for session in sessions:
        session_title = session.get("title", "")
        session_state = session.get("state", "")
        
        # Skip already closed sessions
        if session_state == 'STATE_CLOSED':
            continue
            
        for pr_number in pr_numbers:
            if f"PR #{pr_number}" in session_title:
                session_name = session.get("name")
                if session_name:
                    sessions_to_close.append(session_name)
                    
    if not sessions_to_close:
        logger.info("No active sessions found for the specified PRs.")
        return
        
    logger.info(f"Found {len(sessions_to_close)} active sessions to close: {sessions_to_close}")
    
    closed_count = 0
    for session_name in set(sessions_to_close):  # Use set to avoid duplicates
        success = client.delete_session(session_name)
        if success:
            closed_count += 1
            
    logger.info(f"Successfully closed {closed_count} of {len(set(sessions_to_close))} sessions.")


if __name__ == "__main__":
    # Example: close sessions for specific closed PRs
    closed_pr_numbers = [626, 628, 630, 632]
    logger.info(f"Looking for active Jules sessions for closed PRs: {closed_pr_numbers}")
    close_sessions_for_prs(closed_pr_numbers)
