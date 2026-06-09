#!/usr/bin/env python3
"""
Delete all archived Jules sessions.
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


def delete_archived_sessions():
    """Delete all archived Jules sessions."""
    client = get_jules_client()
    
    logger.info("Fetching all archived sessions from Jules to delete them...")
    sessions = client.list_sessions(filter='state="ARCHIVED"')
    
    if not sessions:
        logger.info("No archived sessions found to delete.")
        return
        
    sessions_to_delete = [session.get("name") for session in sessions if session.get("name")]
    
    if not sessions_to_delete:
        logger.info("No valid session names found to delete.")
        return
        
    logger.info(f"Found {len(sessions_to_delete)} archived sessions to delete.")
    
    deleted_count = 0
    for session_name in sessions_to_delete:
        success = client.delete_session(session_name)
        if success:
            deleted_count += 1
            
    logger.info(f"Successfully deleted {deleted_count} of {len(sessions_to_delete)} archived sessions.")


if __name__ == "__main__":
    delete_archived_sessions()
