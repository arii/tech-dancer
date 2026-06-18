import os
import requests
from typing import Optional, List, Dict, Any

class JulesClient:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.environ.get("JULES_API_KEY")
        if not self.api_key:
            raise ValueError("JULES_API_KEY is not set or empty")

        self.base_url = "https://jules.googleapis.com/v1alpha"
        self.legacy_url = "https://api.jules.ai/v1/sessions"
        self.headers = {
            "Content-Type": "application/json",
            "x-goog-api-key": self.api_key
        }

    def list_sources(self) -> List[Dict[str, Any]]:
        url = f"{self.base_url}/sources"
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            return response.json().get("sources", [])
        except Exception as e:
            print(f"⚠️  Jules API list_sources failed: {e}")
            return []

    def list_sessions(self, pageSize: int = 10) -> List[Dict[str, Any]]:
        url = f"{self.base_url}/sessions"
        params = {"pageSize": pageSize}
        try:
            response = requests.get(url, headers=self.headers, params=params, timeout=10)
            response.raise_for_status()
            return response.json().get("sessions", [])
        except Exception as e:
            print(f"⚠️  Jules API list_sessions failed: {e}")
            return []

    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        clean_id = session_id.replace("sessions/", "")
        url = f"{self.base_url}/sessions/{clean_id}"
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"⚠️  Jules API get_session failed: {e}")
            return None

    def discover_source_id(self, repo_full_name: str) -> Optional[str]:
        sources = self.list_sources()
        for s in sources:
            ctx = s.get("githubRepoContext", {})
            if ctx.get("repo") == repo_full_name:
                return s.get("name").replace("sources/", "")
            if repo_full_name in s.get("displayName", ""):
                return s.get("name").replace("sources/", "")
        return None

    def create_session_from_source(self, source_id: str, branch: str, prompt: str) -> Optional[Dict[str, Any]]:
        url = f"{self.base_url}/sessions"
        # Sanitize source_id to avoid double-prefixing
        clean_source_id = source_id.replace("sources/", "")
        payload = {
            "prompt": prompt,
            "sourceContext": {
                "source": f"sources/{clean_source_id}",
                "githubRepoContext": { "startingBranch": branch }
            },
            "automationMode": "AUTO_CREATE_PR"
        }

        print(f"DEBUG: Creating Jules session at {url}")
        print(f"DEBUG: Payload: {payload}")

        try:
            response = requests.post(url, headers=self.headers, json=payload, timeout=15)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"⚠️  Jules API create_session failed: {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"DEBUG: Response Body: {e.response.text}")
            return None

    def create_session(self, prompt: str, branch: str, title: str, owner: str, repo_name: str) -> str:
        """
        Creates a new Jules session via the legacy API and returns the session ID.
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "prompt": prompt,
            "branch": branch,
            "title": title,
            "owner": owner,
            "repo_name": repo_name,
        }

        try:
            response = requests.post(self.legacy_url, headers=headers, json=payload)
            response.raise_for_status()
            response_data = response.json()
            session_id = response_data.get("id")
            if not session_id:
                raise RuntimeError("Could not find session ID in API response.")
            return session_id
        except requests.exceptions.RequestException as e:
            error_msg = f"Error creating Jules session: {e}"
            if e.response is not None:
                error_msg += f"\nResponse: {e.response.text}"
            raise RuntimeError(error_msg)

    def get_messages(self, session_id: str) -> List[Dict[str, Any]]:
        clean_id = session_id.replace("sessions/", "")
        url = f"{self.base_url}/sessions/{clean_id}/activities"
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            data = response.json()
            activities = data.get("activities", [])
            messages = []
            for act in activities:
                role = "user" if act.get("originator") == "user" else "jules"
                content = ""
                if act.get("userMessaged"):
                    um = act["userMessaged"]
                    if isinstance(um, str):
                        content = um
                    elif isinstance(um, dict):
                        user_msg = um.get("userMessage", "")
                        if isinstance(user_msg, dict):
                            content = user_msg.get("body", "") or ""
                        elif isinstance(user_msg, str):
                            content = user_msg
                elif act.get("progressUpdated") and isinstance(act.get("progressUpdated"), dict):
                    content = act["progressUpdated"].get("description", "")
                elif act.get("planGenerated") and isinstance(act.get("planGenerated"), dict):
                    plan = act["planGenerated"].get("plan") or {}
                    steps = plan.get("steps", []) if isinstance(plan, dict) else []
                    content = "Generated plan:\n" + "\n".join(f"- {s.get('description', '')}" for s in steps if isinstance(s, dict))
                elif act.get("sessionCompleted"):
                    content = "Session completed successfully."
                
                if content:
                    messages.append({
                        "role": role,
                        "content": content,
                        "time": act.get("createTime")
                    })
            return messages
        except Exception as e:
            print(f"⚠️  Jules API get_messages failed: {e}")
            return []

    def send_message(self, session_id: str, message: str) -> Dict[str, Any]:
        clean_id = session_id.replace("sessions/", "")
        url = f"{self.base_url}/sessions/{clean_id}:sendMessage"
        payload = {"prompt": message}
        try:
            response = requests.post(url, headers=self.headers, json=payload, timeout=10)
            response.raise_for_status()
            return {"status": "success", "message": "Message sent successfully"}
        except Exception as e:
            print(f"⚠️  Jules API send_message failed: {e}")
            return {"status": "error", "message": str(e)}
