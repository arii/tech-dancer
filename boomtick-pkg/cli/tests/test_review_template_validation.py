import json
import re
import os
import pytest
from dev_tools.services.github import GitHubClient

def test_template_json_block_validity():
    template_path = "boomtick-pkg/cli/review_template.md"
    assert os.path.exists(template_path)

    with open(template_path, 'r') as f:
        content = f.read()

    # Mock formatting
    formatted = content.format(
        pr_num=1,
        head_sha="sha",
        failed_checks="none",
        detected_errors="none"
    )

    # Extract JSON
    json_blocks = list(re.finditer(r' ` ` `json\n(.*?)\n ` ` `'.replace(' ', ''), formatted, re.DOTALL))
    assert len(json_blocks) > 0

    # The last block should be our metadata block
    metadata_raw = json_blocks[-1].group(1)
    payload = json.loads(metadata_raw)

    # Verify expected keys from the goal
    assert "recommendation" in payload
    assert "comments" in payload
    assert isinstance(payload["comments"], list)

    # Verify identification keys used in GitHubClient.submit_pr_review
    METADATA_IDENTIFIER_KEYS = {"recommendation", "comments", "labels"}
    assert any(k in payload for k in METADATA_IDENTIFIER_KEYS)

def test_validate_review_payload_with_new_skeleton():
    # Test that a payload following the new skeleton (with placeholders removed) passes validation
    payload = {
        "body": "Some findings",
        "recommendation": "Approved",
        "labels": [],
        "comments": []
    }
    # Should not raise CLIError
    GitHubClient.validate_review_payload(payload)

def test_validate_review_payload_rejection_on_placeholders():
    from dev_tools.utils import CLIError

    # Payload with placeholders should fail
    payload = {
        "body": "## ANTI-AI-SLOP\n<findings>",
        "recommendation": "<Approved | Approved with Minor Changes | Not Approved>",
        "labels": [],
        "comments": []
    }

    with pytest.raises(CLIError) as excinfo:
        GitHubClient.validate_review_payload(payload)
    assert "Review rejected" in str(excinfo.value)
