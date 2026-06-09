#!/usr/bin/env python3
"""
Unified Jules API client for hrm-workspace operations.
Consolidates all Jules API interactions with consistent error handling.
"""

import os
import sys
import time
import requests
from typing import Optional, Dict, List, Any
from common_config import setup_logging, JULES_API_BASE_URL, JULES_DEFAULT_SOURCE

logger = setup_logging("jules_client")


class JulesClient:
    """Unified client for interacting with the Jules API."""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.environ.get("JULES_API_KEY")
        
        if not self.api_key:
            logger.error(
                "No API key found. Set JULES_API_KEY environment variable "
                "or pass --api-key parameter."
            )
            sys.exit(1)
        
        self.session = requests.Session()
        self.session.headers.update({
            "Content-Type": "application/json",
            "X-Goog-Api-Key": self.api_key,
        })
        
    def _request(self, method: str, endpoint: str, data: Optional[Dict] = None, 
                params: Optional[Dict] = None) -> Optional[Dict[str, Any]]:
        """Make a request to the Jules API with consistent error handling."""
        url = f"{JULES_API_BASE_URL}/{endpoint}"
        
        try:
            response = self.session.request(
                method, url, json=data, params=params, timeout=30
            )
            response.raise_for_status()
            
            if response.status_code == 204 or not response.content:
                return {}
            
            return response.json()
            
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                logger.debug(f"Resource not found (404): {endpoint}")
                return {"error": "not_found", "status_code": 404}
            
            logger.error(f"HTTP Error {e.response.status_code}: {e.response.text}")
            return {"error": "http_error", "status_code": e.response.status_code, "message": e.response.text}
            
        except requests.exceptions.Timeout:
            logger.error(f"Request timeout for: {endpoint}")
            return {"error": "timeout"}
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed for {endpoint}: {e}")
            return {"error": "request_failed", "message": str(e)}
            
    def list_sources(self, filter_str: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get list of available sources."""
        endpoint = "sources"
        if filter_str:
            endpoint += f"?filter={filter_str}"
            
        response = self._request("GET", endpoint)
        return response.get("sources", []) if response and "error" not in response else []
        
    def list_sessions(self, filter: Optional[str] = None, page_size: int = 100) -> List[Dict[str, Any]]:
        """Get all sessions with pagination."""
        all_sessions = []
        next_page_token = None
        
        while True:
            endpoint = "sessions"
            params = {"pageSize": page_size}

            if filter:
                params["filter"] = filter

            if next_page_token:
                params["pageToken"] = next_page_token
                
            response = self._request("GET", endpoint, params=params)
            
            if not response or "error" in response:
                logger.warning(f"Failed to fetch sessions page: {response}")
                break
                
            sessions = response.get("sessions", [])
            all_sessions.extend(sessions)
            
            next_page_token = response.get("nextPageToken")
            if not next_page_token:
                break
                
        logger.info(f"Retrieved {len(all_sessions)} total sessions")
        return all_sessions
        
    def get_session(self, session_name: str) -> Optional[Dict[str, Any]]:
        """Get details for a specific session."""
        response = self._request("GET", f"sessions/{session_name}")
        return response if response and "error" not in response else None
        
    def create_session(self, prompt: str, source: str = JULES_DEFAULT_SOURCE, 
                      branch: Optional[str] = None, title: Optional[str] = None) -> Optional[str]:
        """Create a new Jules session."""
        # Resolve source name to ID
        if source.startswith("sources/"):
            source_id = source
        else:
            sources = self.list_sources(f'name="{source}"')
            if not sources:
                logger.error(f"Source '{source}' not found.")
                return None
            source_id = sources[0]["id"]
            
        payload = {
            "prompt": prompt,
            "sourceContext": {
                "source": source_id,
                "githubRepoContext": {
                    "startingBranch": branch or "main"
                },
            },
        }
        
        if title:
            payload["title"] = title
            
        logger.info(f"🚀 Creating session with source: {source_id}")
        if title:
            logger.info(f"📝 Title: {title}")
            
        response = self._request("POST", "sessions", payload)
        
        if response and "name" in response:
            session_name = response["name"]
            logger.info(f"✅ Session created: {session_name}")
            return session_name
            
        logger.error("Failed to create session")
        return None
        
    def send_message(self, session_name: str, text: str) -> bool:
        """Send a message to an existing session."""
        payload = {"prompt": text}
        response = self._request("POST", f"sessions/{session_name}:sendMessage", payload)
        
        success = response is not None and "error" not in response
        if success:
            logger.info("📨 Message sent successfully")
        else:
            logger.error("Failed to send message")
            
        return success
        
    def delete_session(self, session_name: str) -> bool:
        """Delete a session."""
        logger.info(f"🗑️ Deleting session: {session_name}")
        response = self._request("DELETE", f"sessions/{session_name}")
        
        success = response is not None and response.get("error") != "http_error"
        if success:
            logger.debug(f"Successfully deleted session: {session_name}")
        elif response and response.get("status_code") == 404:
            logger.debug(f"Session already deleted or not found: {session_name}")
            success = True  # Consider 404 as success for deletion
        else:
            logger.error(f"Failed to delete session: {session_name}")
            
        return success
        
    def monitor_session(self, session_name: str, timeout_minutes: int = 30) -> bool:
        """Monitor a session until completion."""
        logger.info(f"👀 Monitoring session: {session_name}")
        end_time = time.time() + (timeout_minutes * 60)
        
        while time.time() < end_time:
            status = self.get_session(session_name)
            if not status:
                logger.warning("Could not fetch session status, retrying...")
                time.sleep(30)
                continue
                
            state = status.get("state", "UNKNOWN")
            
            if state == "SUCCEEDED":
                logger.info("✅ Session completed successfully")
                self._print_pr_link(status)
                return True
                
            elif state in ["FAILED", "CANCELLED", "TERMINATED"]:
                logger.error(f"❌ Session ended with state: {state}")
                if "error" in status:
                    logger.error(f"Error details: {status['error']}")
                return False
                
            else:
                logger.info(f"⏳ Status: {state}, waiting 30s...")
                time.sleep(30)
                
        logger.error("⏱️ Monitoring timed out")
        return False
        
    def _print_pr_link(self, status_json: Dict[str, Any]) -> None:
        """Extract and display PR link from session outputs."""
        outputs = status_json.get("outputs", [])
        for output in outputs:
            if "pullRequest" in output:
                pr_url = output["pullRequest"].get("url")
                if pr_url:
                    print(f"\n{'-'*50}")
                    print(f"🚀 PULL REQUEST CREATED: {pr_url}")
                    print(f"{'-'*50}\n")
                    return
                    
        logger.warning("Session succeeded but no PR URL found in outputs")


def get_jules_client(api_key: Optional[str] = None) -> JulesClient:
    """Factory function to get a Jules client instance."""
    return JulesClient(api_key)