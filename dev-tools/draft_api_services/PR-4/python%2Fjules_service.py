import requests
import json
import os
import re
from typing import Dict, Any, List, Optional

class JulesService:
    JULES_API_BASE = "https://jules.googleapis.com/v1" # Need full path for requests if not proxying

    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.environ.get("JULES_API_KEY")

    def _request(self, method: str, endpoint: str, **kwargs) -> Any:
        if not self.api_key:
            raise ValueError("Jules API Key is missing.")

        headers = {
            "X-Goog-Api-Key": self.api_key.strip(),
            "Content-Type": "application/json"
        }

        full_url = f"{self.JULES_API_BASE}/{endpoint}"

        try:
            response = requests.request(method, full_url, headers=headers, timeout=30, **kwargs)

            if response.status_code == 204:
                return None

            if not response.ok:
                error_msg = f"Jules API Error: {response.status_code}"
                try:
                    error_body = response.json()
                    if "error" in error_body and "message" in error_body["error"]:
                        error_msg = error_body["error"]["message"]
                except ValueError:
                    error_msg += f" {response.text[:150]}"
                raise Exception(error_msg)

            return response.json()
        except requests.exceptions.RequestException as e:
            raise Exception(f"Network error interacting with Jules API: {str(e)}")

    def get_session_url(self, session_name_or_id: str) -> str:
        if not session_name_or_id:
            return "https://jules.google.com/"

        parts = session_name_or_id.split("/")
        session_id = parts[-1] if parts else session_name_or_id
        return f"https://jules.google.com/session/{session_id}/"

    def list_sources(self, filter_query: str = None) -> List[Dict]:
        query = f"?filter={filter_query}" if filter_query else ""

        endpoints = [
            f"sources{query}",
            f"projects/-/locations/global/sources{query}",
            f"projects/-/locations/-/sources{query}"
        ]

        for endpoint in endpoints:
            try:
                data = self._request("GET", endpoint)
                if data and "sources" in data:
                    return data["sources"]
            except Exception as e:
                 # Silently continue to next fallback
                 pass

        return []

    def get_session(self, session_name: str) -> Dict:
        endpoint = session_name if session_name.startswith("sessions/") else f"sessions/{session_name}"
        return self._request("GET", endpoint)

    def list_sessions(self) -> List[Dict]:
        all_sessions = []
        next_token = None
        pages = 0

        while True:
            query = f"?pageToken={next_token}" if next_token else ""
            data = self._request("GET", f"sessions{query}")

            if "sessions" in data:
                all_sessions.extend(data["sessions"])

            next_token = data.get("nextPageToken")
            pages += 1

            if not next_token or pages >= 10:
                break

        return all_sessions

    def create_session(self, prompt: str, source_id: str, branch: str, title: str = None) -> Dict:
        if not branch:
            raise ValueError("Branch context is required to create a Jules session.")

        payload = {
            "prompt": prompt,
            "sourceContext": {
                "source": source_id,
                "githubRepoContext": {
                    "startingBranch": branch
                }
            }
        }

        if title:
            payload["title"] = title

        return self._request("POST", "sessions", json=payload)

    def send_message(self, session_name: str, text: str) -> Dict:
        endpoint = f"{session_name}:sendMessage" if session_name.startswith("sessions/") else f"sessions/{session_name}:sendMessage"
        return self._request("POST", endpoint, json={"prompt": text})

    def delete_session(self, session_name: str) -> None:
        endpoint = session_name if session_name.startswith("sessions/") else f"sessions/{session_name}"
        self._request("DELETE", endpoint)

    def find_source_for_repo(self, repo_name: str) -> Optional[str]:
        if not repo_name:
             return None

        try:
            sources = self.list_sources()
            if not sources:
                 return f"sources/{repo_name.split('/')[-1].lower()}"

            parts = repo_name.split("/")
            repo_only = parts[-1].lower()

            def normalize_with_sep(s): return re.sub(r'[^a-z0-9\-_]', '', s.lower())
            def normalize_no_sep(s): return re.sub(r'[^a-z0-9]', '', s.lower())

            n_repo_only = normalize_with_sep(repo_only)
            n_repo_only_clean = normalize_no_sep(repo_only)
            n_full_repo = normalize_with_sep(repo_name)
            n_full_repo_clean = normalize_no_sep(repo_name)

            for s in sources:
                source_name = s.get("name", "").lower()
                source_display_name = s.get("displayName", "").lower()

                n_source_name = normalize_with_sep(source_name)
                n_source_name_clean = normalize_no_sep(source_name)
                n_display_name = normalize_with_sep(source_display_name)
                n_display_name_clean = normalize_no_sep(source_display_name)

                if source_name.endswith(f"/{repo_name.lower()}") or source_name.endswith(f"/{repo_only}"): return source_name
                if source_display_name == repo_name.lower() or source_display_name == repo_only: return source_name

                if n_source_name.endswith(n_repo_only) or n_display_name == n_repo_only: return source_name
                if n_full_repo in n_source_name or n_full_repo in n_display_name: return source_name

                if n_source_name_clean.endswith(n_repo_only_clean) or n_display_name_clean == n_repo_only_clean: return source_name
                if n_full_repo_clean in n_source_name_clean or n_full_repo_clean in n_display_name_clean: return source_name

            return f"sources/{repo_only}"
        except Exception:
            fallback = repo_name.lower()
            return f"sources/{fallback}"
