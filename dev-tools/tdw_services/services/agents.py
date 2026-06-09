import os
import time
import requests
from typing import Optional, List, Dict, Any

class JulesClient:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.environ.get("ANTIGRAVITY_API_KEY") or os.environ.get("JULES_API_KEY")
        if not self.api_key:
            raise ValueError("ANTIGRAVITY_API_KEY or JULES_API_KEY is not set or empty")

        self.base_url = "https://jules.googleapis.com/v1alpha"
        self.legacy_url = "https://api.jules.ai/v1/sessions"
        self.session = requests.Session()
        self.session.headers.update({
            "Content-Type": "application/json",
            "x-goog-api-key": self.api_key
        })

    def _request(self, method: str, endpoint: str, data: Optional[Dict] = None, params: Optional[Dict] = None) -> Optional[Dict[str, Any]]:
        """Make a request to the Jules API with consistent error handling."""
        # Use full URL if provided, otherwise append to base_url
        if endpoint.startswith("http"):
            url = endpoint
        else:
            url = f"{self.base_url}/{endpoint}"

        try:
            response = self.session.request(method, url, json=data, params=params, timeout=30)
            response.raise_for_status()

            if response.status_code == 204 or not response.content:
                return {}

            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"⚠️  Jules API request failed for {endpoint}: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"DEBUG: Response Body: {e.response.text}")
            return None

    def list_sources(self, filter_str: Optional[str] = None) -> List[Dict[str, Any]]:
        endpoint = "sources"
        if filter_str:
            endpoint += f"?filter={filter_str}"
        response = self._request("GET", endpoint)
        return response.get("sources", []) if response else []

    def list_sessions(self, filter_str: Optional[str] = None, page_size: int = 100) -> List[Dict[str, Any]]:
        all_sessions = []
        next_page_token = None

        while True:
            endpoint = "sessions"
            params = {"pageSize": page_size}
            if filter_str:
                params["filter"] = filter_str
            if next_page_token:
                params["pageToken"] = next_page_token

            response = self._request("GET", endpoint, params=params)
            if not response:
                break

            sessions = response.get("sessions", [])
            all_sessions.extend(sessions)

            next_page_token = response.get("nextPageToken")
            if not next_page_token:
                break

        return all_sessions

    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        clean_id = session_id.replace("sessions/", "")
        return self._request("GET", f"sessions/{clean_id}")

    def discover_source_id(self, repo_full_name: str) -> Optional[str]:
        sources = self.list_sources()
        for s in sources:
            ctx = s.get("githubRepoContext", {})
            if ctx.get("repo") == repo_full_name:
                return s.get("name", "").replace("sources/", "")
            if repo_full_name in s.get("displayName", ""):
                return s.get("name", "").replace("sources/", "")
        return None

    def create_session_from_source(self, source_id: str, branch: str, prompt: str, title: Optional[str] = None, source_override: Optional[str] = None) -> Optional[Dict[str, Any]]:
        clean_source_id = source_id.replace("sources/", "")
        source_target = source_override if source_override else f"sources/{clean_source_id}"

        payload = {
            "prompt": prompt,
            "sourceContext": {
                "source": source_target,
                "githubRepoContext": { "startingBranch": branch }
            },
            "automationMode": "AUTO_CREATE_PR"
        }
        if title:
            payload["title"] = title

        return self._request("POST", "sessions", data=payload)

    def create_session(self, prompt: str, source: str, branch: Optional[str] = None, title: Optional[str] = None) -> Optional[str]:
        """Create a new Jules session."""
        if source.startswith("sources/"):
            source_id = source
        else:
            sources = self.list_sources(f'name="{source}"')
            if not sources:
                print(f"Source '{source}' not found.")
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

        response = self._request("POST", "sessions", data=payload)

        if response and "name" in response:
            return response["name"]

        return None

    def send_message(self, session_name: str, text: str) -> bool:
        clean_id = session_name.replace("sessions/", "")
        payload = {"prompt": text}
        response = self._request("POST", f"sessions/{clean_id}:sendMessage", data=payload)
        return response is not None

    def delete_session(self, session_name: str) -> bool:
        clean_id = session_name.replace("sessions/", "")
        # Can't use self._request since we need to check specifically for 404 or success status
        url = f"{self.base_url}/sessions/{clean_id}"
        try:
            response = self.session.delete(url, timeout=30)
            if response.status_code in [200, 204, 404]:
                return True
            response.raise_for_status()
        except Exception as e:
            print(f"⚠️  Failed to delete session {clean_id}: {e}")
            return False

    def monitor_session(self, session_name: str, timeout_minutes: int = 30) -> bool:
        """Monitor a session until completion."""
        print(f"👀 Monitoring session: {session_name}")
        end_time = time.time() + (timeout_minutes * 60)

        while time.time() < end_time:
            status = self.get_session(session_name)
            if not status:
                print("Could not fetch session status, retrying...")
                time.sleep(30)
                continue

            state = status.get("state", "UNKNOWN")

            if state == "SUCCEEDED":
                print("✅ Session completed successfully")
                self._print_pr_link(status)
                return True
            elif state in ["FAILED", "CANCELLED", "TERMINATED"]:
                print(f"❌ Session ended with state: {state}")
                if "error" in status:
                    print(f"Error details: {status['error']}")
                return False
            else:
                print(f"⏳ Status: {state}, waiting 30s...")
                time.sleep(30)

        print("⏱️ Monitoring timed out")
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
        print("Session succeeded but no PR URL found in outputs")
