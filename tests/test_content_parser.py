import os
import unittest
import sys
import importlib.util

# Load content_parser from dev-tools/content_parser.py
file_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'dev-tools', 'content_parser.py'))
spec = importlib.util.spec_from_file_location("content_parser", file_path)
content_parser = importlib.util.module_from_spec(spec)
spec.loader.exec_module(content_parser)

class TestContentParser(unittest.TestCase):
    def test_parse_issue_body(self):
        body = """
### New Content Submission

**JSON Data for Pipeline:**
```json
{
  "type": "post",
  "title": "Test Title",
  "category": "Tech",
  "date": "2024-05-20",
  "tags": ["test", "ai"],
  "excerpt": "Test excerpt",
  "author": "Tester"
}
```

**Markdown Preview:**
```markdown
# Test Title
Test content
```
"""
        metadata, content = content_parser.parse_issue_body(body)
        self.assertEqual(metadata["title"], "Test Title")
        self.assertEqual(metadata["type"], "post")
        self.assertEqual(metadata["tags"], ["test", "ai"])
        self.assertEqual(content, "# Test Title\nTest content")

    def test_generate_markdown(self):
        metadata = {
            "type": "resource",
            "title": "My Resource",
            "category": "Gear",
            "date": "2024-05-21",
            "tags": ["gear", "wcs"],
            "excerpt": "Summary",
            "author": "Ariel"
        }
        content = "# My Resource\nHere is the resource."

        md = content_parser.generate_markdown(metadata, content)

        self.assertIn('type: "resource"', md)
        self.assertIn('title: "My Resource"', md)
        self.assertIn('  - gear', md)
        self.assertIn('  - wcs', md)
        self.assertIn('Here is the resource.', md)
        self.assertNotIn('# My Resource', md.split('---')[-1]) # Should be stripped

if __name__ == '__main__':
    unittest.main()
