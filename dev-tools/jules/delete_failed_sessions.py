#!/usr/bin/env python3
"""
Delete all Jules sessions - useful for cleanup.
Uses unified Jules client and configuration.
"""

import sys
import os

# Import unified configuration and client
from common_config import setup_logging, setup_python_path
from jules_client import get_jules_client

# Setup
setup_python_path()
logger = setup_logging("jules_session_deleter")


def delete_all_sessions():
    """Delete all Jules sessions."""
    client = get_jules_client()
    
    logger.info("Fetching all sessions from Jules to delete them...")
    sessions = client.list_sessions()
    
    if not sessions:
        logger.info("No sessions found to delete.")
        return
        
    sessions_to_delete = [session.get("name") for session in sessions if session.get("name")]
    
    if not sessions_to_delete:
        logger.info("No valid session names found to delete.")
        return
        
    logger.info(f"Found {len(sessions_to_delete)} sessions to delete.")
    
    deleted_count = 0
    for session_name in sessions_to_delete:
        success = client.delete_session(session_name)
        if success:
            deleted_count += 1
            
    logger.info(f"Successfully deleted {deleted_count} of {len(sessions_to_delete)} sessions.")


if __name__ == "__main__":
    delete_all_sessions()