import requests
import json
import os
import sys

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
            if response.status_code != 200:
                print(f"⚠️  Jules API list_sources failed (HTTP {response.status_code}): {response.text}", file=sys.stderr)
            response.raise_for_status()
            return response.json().get("sources", [])
        except Exception as e:
            if not isinstance(e, requests.HTTPError):
                print(f"⚠️  Jules API list_sources failed: {e}", file=sys.stderr)
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
            if response.status_code not in [200, 201]:
                print(f"⚠️  Jules API create_session failed (HTTP {response.status_code}): {response.text}", file=sys.stderr)
            response.raise_for_status()
            return response.json()
        except Exception as e:
            if not isinstance(e, requests.HTTPError):
                print(f"⚠️  Jules API create_session failed: {e}", file=sys.stderr)
            return None
