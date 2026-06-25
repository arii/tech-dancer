import unittest
from unittest.mock import MagicMock, patch
import sys
import os

# Add dev-tools to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

from tdw_services.services.jules import JulesClient

class TestJulesDiscovery(unittest.TestCase):
    @patch('tdw_services.services.jules.JulesClient.list_sources')
    @patch.dict('os.environ', {'JULES_API_KEY': 'fake-key'})
    def test_discover_source_id_success(self, mock_list_sources):
        # Mock API response matching the new expected format
        mock_list_sources.return_value = [
            {
                "name": "sources/123",
                "displayName": "other-repo",
                "githubRepo": {
                    "owner": "other",
                    "repo": "repo"
                }
            },
            {
                "name": "sources/456",
                "displayName": "arii/tech-dancer",
                "githubRepo": {
                    "owner": "arii",
                    "repo": "tech-dancer"
                }
            }
        ]

        client = JulesClient()
        source_id = client.discover_source_id("arii/tech-dancer")

        self.assertEqual(source_id, "456")

    @patch('tdw_services.services.jules.JulesClient.list_sources')
    @patch.dict('os.environ', {'JULES_API_KEY': 'fake-key'})
    def test_discover_source_id_mismatch(self, mock_list_sources):
        mock_list_sources.return_value = [
            {
                "name": "sources/123",
                "githubRepo": {
                    "owner": "arii",
                    "repo": "other-repo"
                }
            }
        ]

        client = JulesClient()
        source_id = client.discover_source_id("arii/tech-dancer")

        self.assertIsNone(source_id)

    @patch('tdw_services.services.jules.JulesClient.list_sources')
    @patch.dict('os.environ', {'JULES_API_KEY': 'fake-key'})
    def test_discover_source_id_display_name_fallback(self, mock_list_sources):
        # Test fallback to displayName if githubRepo doesn't match
        mock_list_sources.return_value = [
            {
                "name": "sources/789",
                "displayName": "arii/tech-dancer repository",
                "githubRepo": {
                    "owner": "wrong",
                    "repo": "repo"
                }
            }
        ]

        client = JulesClient()
        source_id = client.discover_source_id("arii/tech-dancer")

        self.assertEqual(source_id, "789")

if __name__ == '__main__':
    unittest.main()
