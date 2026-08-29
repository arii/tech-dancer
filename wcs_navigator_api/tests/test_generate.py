"""Unit and integration tests for Stage 2 Generation Pass endpoint (/generate-calendar/generate)."""

import json
from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from wcs_navigator_api.main import app
from wcs_navigator_api.models.payloads import GenerateResponse

client = TestClient(app)

VALID_PDF_BYTES = b"%PDF-1.4 Mock PDF Content for Schedule"

MOCK_GEMINI_RESPONSE_JSON = json.dumps({
    "decisionTrace": {
        "subTasks": [
            {
                "id": "1",
                "label": "Parsed event timetable",
                "status": "completed",
                "detail": "Extracted sessions from schedule PDF"
            },
            {
                "id": "2",
                "label": "Calculated travel buffer",
                "status": "completed",
                "detail": "Computed safe flight landing deadline"
            },
            {
                "id": "3",
                "label": "Filtered workshops & assembled calendar",
                "status": "completed",
                "detail": "Tailored schedule generated"
            }
        ],
        "sessions": [
            {
                "id": "s-novice",
                "title": "Novice Strictly Swing Prelims",
                "time": "Friday 5:30 PM - 6:30 PM",
                "location": "Grand Ballroom",
                "status": "included",
                "decisionBadge": "Division Match",
                "justification": "Matches user's Novice division selection."
            },
            {
                "id": "s-advanced",
                "title": "Advanced / Champion Workshop",
                "time": "Saturday 11:00 AM - 12:00 PM",
                "location": "Junior Ballroom",
                "status": "filtered",
                "decisionBadge": "Level Ineligible",
                "justification": "Filtered out because user level is Novice and ineligible for Advanced+ classes."
            }
        ],
        "themeDressCodes": [
            {
                "id": "t1",
                "day": "Friday Night",
                "themeTitle": "Neon & Glow Party",
                "category": "social_theme",
                "description": "Midnight UV blacklight social.",
                "recommendedAttire": ["Neon clothing", "White tops"],
                "vibe": "High Energy"
            }
        ],
        "packingManifest": [
            {
                "id": "p1",
                "name": "Adhesive Suede Shoe Sheets",
                "category": "footwear",
                "rationale": "For portable ballroom vinyl tiling",
                "quantity": 2
            }
        ],
        "icsContent": "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//WCS Navigator//EN\nEND:VCALENDAR"
    },
    "icsContent": "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//WCS Navigator//EN\nEND:VCALENDAR"
})


@patch("wcs_navigator_api.routes.generate.get_genai_client")
def test_generate_calendar_multipart_success(mock_get_genai):
    """Test POST /generate-calendar/generate with multipart PDF upload."""
    mock_genai_client = MagicMock()
    mock_chat = MagicMock()
    mock_response = MagicMock()
    mock_response.text = MOCK_GEMINI_RESPONSE_JSON
    mock_response.parsed = None
    mock_chat.send_message.return_value = mock_response
    mock_genai_client.chats.create.return_value = mock_chat
    mock_get_genai.return_value = mock_genai_client

    files = {
        "file": ("schedule.pdf", VALID_PDF_BYTES, "application/pdf")
    }
    data = {
        "questionnaire_responses": json.dumps({
            "wsdc_division": "novice",
            "earliest_call_time_iso": "2026-10-09T17:15:00-07:00",
            "transit_minutes": 30
        })
    }

    response = client.post("/generate-calendar/generate", files=files, data=data)

    assert response.status_code == 200
    res_data = response.json()

    # Validate response schema
    gen_response = GenerateResponse(**res_data)
    assert gen_response.decision_trace.buffer_timeline.earliest_staging_time == "2026-10-09T17:15:00-07:00"
    assert "✈️ Target Flight Landing Deadline" in gen_response.ics_content

    # Validate sessions and filtering integrity
    sessions = gen_response.decision_trace.sessions
    assert len(sessions) == 2
    novice_session = next(s for s in sessions if s.id == "s-novice")
    adv_session = next(s for s in sessions if s.id == "s-advanced")

    assert novice_session.status == "included"
    assert novice_session.decision_badge == "Division Match"
    assert adv_session.status == "filtered"
    assert adv_session.decision_badge == "Level Ineligible"


@patch("wcs_navigator_api.routes.generate.fetch_pdf_bytes_from_url")
@patch("wcs_navigator_api.routes.generate.get_genai_client")
def test_generate_calendar_json_url_success(mock_get_genai, mock_fetch_pdf):
    """Test POST /generate-calendar/generate with JSON GenerateUrlRequest body."""
    mock_fetch_pdf.return_value = VALID_PDF_BYTES

    mock_genai_client = MagicMock()
    mock_chat = MagicMock()
    mock_response = MagicMock()
    mock_response.text = MOCK_GEMINI_RESPONSE_JSON
    mock_response.parsed = None
    mock_chat.send_message.return_value = mock_response
    mock_genai_client.chats.create.return_value = mock_chat
    mock_get_genai.return_value = mock_genai_client

    payload = {
        "url": "https://example.com/schedule.pdf",
        "questionnaire_responses": {
            "wsdc_division": "novice",
            "earliest_call_time_iso": "2026-10-09T17:15:00-07:00"
        }
    }

    response = client.post("/generate-calendar/generate", json=payload)

    assert response.status_code == 200
    res_data = response.json()
    assert "decisionTrace" in res_data
    assert "icsContent" in res_data
    mock_fetch_pdf.assert_called_once_with("https://example.com/schedule.pdf")


@patch("wcs_navigator_api.routes.generate.fetch_pdf_bytes_from_url")
@patch("wcs_navigator_api.routes.generate.get_genai_client")
def test_generate_calendar_aliased_routes(mock_get_genai, mock_fetch_pdf):
    """Test that /api/v1/generate alias route works identically."""
    mock_fetch_pdf.return_value = VALID_PDF_BYTES

    mock_genai_client = MagicMock()
    mock_chat = MagicMock()
    mock_response = MagicMock()
    mock_response.text = MOCK_GEMINI_RESPONSE_JSON
    mock_response.parsed = None
    mock_chat.send_message.return_value = mock_response
    mock_genai_client.chats.create.return_value = mock_chat
    mock_get_genai.return_value = mock_genai_client

    payload = {
        "url": "https://example.com/schedule.pdf",
        "questionnaire_responses": {
            "wsdc_division": "novice"
        }
    }

    response = client.post("/api/v1/generate", json=payload)
    assert response.status_code == 200


def test_generate_calendar_invalid_file_type():
    """Test 400 error when non-PDF file is uploaded."""
    files = {
        "file": ("notes.txt", b"Hello world text file", "text/plain")
    }

    response = client.post("/generate-calendar/generate", files=files)
    assert response.status_code == 400


def test_format_iso_to_utc_ics():
    """Test ISO to strict RFC 5545 UTC timestamp formatting."""
    from wcs_navigator_api.routes.generate import format_iso_to_utc_ics

    # ISO string with timezone offset (-07:00) -> converts to UTC
    formatted = format_iso_to_utc_ics("2026-10-09T14:15:00-07:00")
    assert formatted == "20261009T211500Z"

    # Naive ISO string -> adds Z
    formatted_naive = format_iso_to_utc_ics("2026-10-09T14:15:00")
    assert formatted_naive == "20261009T141500Z"


def test_agent_tools():
    """Test agent tools in wcs_navigator_api.tools."""
    from wcs_navigator_api.tools import (
        sync_google_tasks,
        compile_packing_list,
        route_event_details,
        AGENT_TOOLS,
    )

    assert len(AGENT_TOOLS) == 3
    res_tasks = sync_google_tasks("Boogie by the Bay", ["Bring suede dance shoes", "Pack extra shirts"])
    assert "Successfully synced 2 tasks" in res_tasks

    res_packing = compile_packing_list("Boogie by the Bay", ["footwear", "apparel"])
    assert "Boogie by the Bay" in res_packing

    res_route = route_event_details("Hyatt Regency SFO", "Grand Ballroom")
    assert "Hyatt Regency SFO" in res_route

