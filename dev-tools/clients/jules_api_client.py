import requests
import json
import os

class JulesAPIClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://jules.googleapis.com/v1alpha"
        self.headers = {
            "Content-Type": "application/json",
            "x-goog-api-key": self.api_key
        }

    def list_sources(self):
        url = f"{self.base_url}/sources"
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            return response.json().get("sources", [])
        except Exception as e:
            print(f"⚠️  Jules API list_sources failed: {e}")
            return []

    def discover_source_id(self, repo_full_name):
        sources = self.list_sources()
        for s in sources:
            ctx = s.get("githubRepoContext", {})
            if ctx.get("repo") == repo_full_name:
                return s.get("name").replace("sources/", "")
            if repo_full_name in s.get("displayName", ""):
                return s.get("name").replace("sources/", "")
        return None

    def create_session(self, source_id, branch, prompt, mode="FULLY_AUTOMATED"):
        url = f"{self.base_url}/sessions"
        payload = {
            "prompt": prompt,
            "sourceContext": {
                "source": f"sources/{source_id}",
                "githubRepoContext": { "branch": branch }
            },
            "automationMode": mode
        }
        try:
            response = requests.post(url, headers=self.headers, json=payload, timeout=15)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"⚠️  Jules API create_session failed: {e}")
            return None
