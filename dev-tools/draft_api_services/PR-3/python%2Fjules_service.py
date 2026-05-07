import requests
import json
import time
from typing import List, Optional, Dict, Any
from .types import JulesSession, JulesSource

JULES_API_BASE = 'https://jules.googleapis.com/v1alpha'

class JulesService:
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("Jules API Key is missing.")
        self.api_key = api_key
        self._cache = {}

    def _request(self, endpoint: str, method: str = 'GET', data: Optional[Dict] = None) -> Any:
        url = f"{JULES_API_BASE}/{endpoint}"
        headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': self.api_key
        }

        response = requests.request(method, url, headers=headers, json=data)

        if not response.ok:
            error_message = f"Jules API Error: {response.status_code}"
            try:
                error_body = response.json()
                if 'error' in error_body and 'message' in error_body['error']:
                    error_message = error_body['error']['message']
            except:
                pass
            raise Exception(error_message)

        if method != 'GET' and response.status_code == 204:
            return {}

        return response.json()

    def list_sources(self, filter_str: Optional[str] = None) -> List[JulesSource]:
        query = f"?filter={requests.utils.quote(filter_str)}" if filter_str else ''
        data = self._request(f"sources{query}")
        return data.get('sources', [])

    def list_sessions(self) -> List[JulesSession]:
        all_sessions = []
        next_token = None
        pages = 0

        while True:
            query = f"?pageToken={next_token}" if next_token else ''
            data = self._request(f"sessions{query}")
            if 'sessions' in data:
                all_sessions.extend(data['sessions'])

            next_token = data.get('nextPageToken')
            pages += 1
            if not next_token or pages >= 5:
                break

        return all_sessions

    def get_session(self, session_name: str) -> JulesSession:
        return self._request(f"sessions/{session_name}")

    def create_session(self, prompt: str, source_id: str, branch: str = 'leader', title: Optional[str] = None) -> JulesSession:
        payload = {
            'prompt': prompt,
            'sourceContext': {
                'source': source_id,
                'githubRepoContext': {'startingBranch': branch}
            }
        }
        if title:
            payload['title'] = title

        return self._request('sessions', method='POST', data=payload)

    def send_message(self, session_name: str, text: str) -> Any:
        return self._request(f"sessions/{session_name}:sendMessage", method='POST', data={'prompt': text})

    def delete_session(self, session_name: str) -> None:
        self._request(f"sessions/{session_name}", method='DELETE')

    def find_source_for_repo(self, repo_name: str) -> Optional[str]:
        try:
            sources = self.list_sources()
            for source in sources:
                if source['name'].endswith(repo_name) or repo_name in source['name']:
                    return source['name']
            return None
        except:
            return None
