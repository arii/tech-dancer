"""Unit and integration tests for Stage 1 Discovery Pass endpoints (/generate-calendar/discover & /api/v1/discover)."""

import pytest
from fastapi.testclient import TestClient

from wcs_navigator_api.main import app
from wcs_navigator_api.models.payloads import DiscoveryResponse, FormQuestion, FormQuestionOption

client = TestClient(app)

SAMPLE_PDF_BYTES = b"%PDF-1.4\n%...\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF"


@pytest.fixture
def mock_discovery_response():
    """Mock structured DiscoveryResponse returned by Gemini client."""
    question1 = FormQuestion(
        id="dance_styles",
        title="Which dance styles do you plan to participate in?",
        type="multiselect",
        context="Filters schedule items by your preferred dance styles (WCS, Country, Hustle).",
        required=True,
        defaultValue=["wcs"],
        options=[
            FormQuestionOption(
                label="West Coast Swing",
                value="wcs",
                subtitle="Primary convention workshops & social dancing",
                badge="WCS",
            ),
            FormQuestionOption(
                label="Country Swing",
                value="country",
                subtitle="Cross-over workshops & late night social rooms",
                badge="Country",
            ),
        ],
    )

    question2 = FormQuestion(
        id="wsdc_level",
        title="What is your WSDC workshop level?",
        type="select",
        context="Restricts eligible workshop sessions to your verified WSDC skill level.",
        required=True,
        defaultValue="novice",
        options=[
            FormQuestionOption(
                label="Novice Level",
                value="novice",
                subtitle="Foundational workshops & Novice prelim staging calls",
                badge="Novice",
            ),
            FormQuestionOption(
                label="Intermediate Level",
                value="intermediate",
                subtitle="Intermediate workshops & Intermediate prelim calls",
                badge="Intermediate",
            ),
        ],
    )

    return DiscoveryResponse(
        preset_id="boogie-by-the-bay-2026",
        preset_name="Boogie by the Bay 2026",
        event_name="Boogie by the Bay 2026",
        tracks_detected=["West Coast Swing", "Country Swing"],
        suggested_form_questions=[question1, question2],
    )


def test_discover_file_upload_success(mocker, mock_discovery_response):
    """Verify POST /generate-calendar/discover with PDF file upload succeeds and enforces P0 context rules."""
    mock_genai_instance = mocker.MagicMock()
    mock_response = mocker.MagicMock()
    mock_response.parsed = mock_discovery_response
    mock_genai_instance.models.generate_content.return_value = mock_response

    mocker.patch(
        "wcs_navigator_api.routes.discover.get_genai_client",
        return_value=mock_genai_instance,
    )

    files = {"file": ("schedule.pdf", SAMPLE_PDF_BYTES, "application/pdf")}
    response = client.post("/generate-calendar/discover", files=files)

    assert response.status_code == 200
    data = response.json()

    assert data["preset_id"] == "boogie-by-the-bay-2026"
    assert data["event_name"] == "Boogie by the Bay 2026"
    assert len(data["suggested_form_questions"]) == 2

    q1 = data["suggested_form_questions"][0]
    assert q1["id"] == "dance_styles"
    assert q1["title"] == "Which dance styles do you plan to participate in?"
    assert q1["type"] == "multiselect"
    assert q1["defaultValue"] == ["wcs"]
    assert len(q1["context"]) > 0  # P0: Explainability requirement
    assert len(q1["options"]) == 2
    assert q1["options"][0]["subtitle"] is not None
    assert q1["options"][0]["badge"] == "WCS"


def test_discover_url_request_success(mocker, mock_discovery_response):
    """Verify POST /api/v1/discover with JSON DiscoverUrlRequest succeeds."""
    mock_genai_instance = mocker.MagicMock()
    mock_response = mocker.MagicMock()
    mock_response.parsed = mock_discovery_response
    mock_genai_instance.models.generate_content.return_value = mock_response

    mocker.patch(
        "wcs_navigator_api.routes.discover.get_genai_client",
        return_value=mock_genai_instance,
    )

    mocker.patch(
        "wcs_navigator_api.routes.discover.fetch_pdf_bytes_from_url",
        return_value=SAMPLE_PDF_BYTES,
    )

    payload = {"url": "https://example.com/2026-schedule.pdf"}
    response = client.post("/api/v1/discover", json=payload)

    assert response.status_code == 200
    data = response.json()

    assert data["preset_name"] == "Boogie by the Bay 2026"
    assert len(data["tracks_detected"]) == 2
    assert len(data["suggested_form_questions"]) == 2

    # Verify P0 explainability context on every question
    for q in data["suggested_form_questions"]:
        assert "context" in q
        assert len(q["context"]) > 0


def test_discover_invalid_file_upload_returns_400():
    """Verify uploading a non-PDF corrupt file returns 400 Bad Request."""
    files = {"file": ("corrupt.txt", b"NOT A PDF FILE DATA", "text/plain")}
    response = client.post("/generate-calendar/discover", files=files)

    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid PDF"


def test_discover_invalid_url_json_returns_400():
    """Verify submitting invalid URL JSON returns 400 Bad Request."""
    payload = {"url": "not_a_valid_url"}
    response = client.post("/api/v1/discover", json=payload)

    assert response.status_code == 400
    assert "Invalid DiscoverUrlRequest" in response.json()["detail"]


def test_discover_no_payload_returns_400():
    """Verify submitting empty request returns 400 Bad Request."""
    response = client.post("/generate-calendar/discover", json={})

    assert response.status_code == 400


def test_discover_gemini_failure_returns_500(mocker):
    """Verify Gemini API failure returns 500 Internal Server Error."""
    mock_genai_instance = mocker.MagicMock()
    mock_genai_instance.models.generate_content.side_effect = Exception("Gemini Quota Exceeded")

    mocker.patch(
        "wcs_navigator_api.routes.discover.get_genai_client",
        return_value=mock_genai_instance,
    )

    # Use unique bytes so we don't hit the cache from previous tests
    fail_bytes = b"%PDF-1.4\n%...\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\nFailure"
    files = {"file": ("schedule.pdf", fail_bytes, "application/pdf")}
    response = client.post("/generate-calendar/discover", files=files)

    assert response.status_code == 500
    assert "Gemini API discovery pass execution failed" in response.json()["detail"]
