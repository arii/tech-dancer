"""Automated Pytest Golden Target Validation for California 2026 Event Fixtures."""

import json
from pathlib import Path
from wcs_navigator_api.models.payloads import DiscoveryResponse, GenerateResponse
from wcs_navigator_api.services.buffer_engine import calculate_flight_buffer

FIXTURES_DIR = Path(__file__).parent / "fixtures"


def test_boogie_by_the_bay_2026_fixture_validation():
    """Validates Boogie by the Bay 2026 (Novice Competitor & Social Focused)."""
    fixture_path = FIXTURES_DIR / "bbb_2026.json"
    assert fixture_path.exists(), "bbb_2026.json fixture file missing."

    data = json.loads(fixture_path.read_text(encoding="utf-8"))

    # Inputs verification
    inputs = data["inputs"]
    assert inputs["wsdc_division"] == "Novice"
    assert "competitor" in inputs["primary_intents"]
    assert "social_only" in inputs["primary_intents"]
    assert inputs["hotel_transit_mins"] == 20

    # Discovery & Generate Pydantic parsing
    discovery = DiscoveryResponse.model_validate(data["discovery"])
    generate = GenerateResponse.model_validate(data["generate"])
    trace = generate.decision_trace

    # Buffer Mathematics Assertion:
    # Staging: Friday 17:15 (2026-10-09T17:15:00-07:00) with 20m transit
    earliest_call_iso = "2026-10-09T17:15:00-07:00"
    buffer_res = calculate_flight_buffer(
        earliest_call_iso=earliest_call_iso,
        transit_mins=inputs["hotel_transit_mins"],
        hotel_settle_hours=1.5,
        warmup_buffer_hours=1.0,
    )

    assert trace.buffer_timeline.earliest_staging_time == earliest_call_iso
    assert trace.buffer_timeline.latest_flight_arrival_deadline == "2026-10-09T14:25:00-07:00"
    assert buffer_res.latest_flight_arrival_deadline == "2026-10-09T14:25:00-07:00"

    # Filtering Integrity Assertions:
    # 1. Novice Jack & Jill and Novice Strictly prelims marked status='included' with decisionBadge='Division Match'
    novice_included_sessions = [
        s for s in trace.sessions if "Novice" in s.title and s.status == "included"
    ]
    assert len(novice_included_sessions) >= 2
    for session in novice_included_sessions:
        assert session.status == "included"
        assert session.decision_badge == "Division Match"

    # 2. Intermediate, Advanced, and Champion workshops marked status='filtered' with decisionBadge='Level Ineligible'
    ineligible_workshops = [
        s for s in trace.sessions if s.decision_badge == "Level Ineligible"
    ]
    assert len(ineligible_workshops) >= 3
    for session in ineligible_workshops:
        assert session.status == "filtered"
        assert session.decision_badge == "Level Ineligible"
        assert any(lvl in session.title for lvl in ["Intermediate", "Advanced", "Champion"])

    # Theme Dress Codes: identify Friday Glow Party and Saturday Showcase Gala
    theme_titles = [t.theme_title for t in trace.theme_dress_codes]
    assert "Friday Glow Party" in theme_titles
    assert "Saturday Showcase Gala" in theme_titles

    # Packing List: contains adhesive suede shoe sheets and garment steamer
    packing_items = [p.name for p in trace.packing_manifest]
    assert "Adhesive Suede Shoe Sheets" in packing_items
    assert "Garment Steamer" in packing_items


def test_halloween_swingthing_2026_fixture_validation():
    """Validates Halloween SwingThing 2026 (Pure Social Dancer)."""
    fixture_path = FIXTURES_DIR / "halloween_2026.json"
    assert fixture_path.exists(), "halloween_2026.json fixture file missing."

    data = json.loads(fixture_path.read_text(encoding="utf-8"))

    # Inputs verification
    inputs = data["inputs"]
    assert inputs["wsdc_division"] == "Novice"
    assert "social_only" in inputs["primary_intents"]
    assert "spectator_shows" in inputs["primary_intents"]
    assert inputs["hotel_transit_mins"] == 15

    # Discovery & Generate Pydantic parsing
    generate = GenerateResponse.model_validate(data["generate"])
    trace = generate.decision_trace

    # Filtering Integrity Assertions:
    # 1. All competitive divisions (Jack & Jill and Strictly) are marked status='filtered'
    competitive_sessions = [
        s
        for s in trace.sessions
        if "Jack & Jill" in s.title or "Strictly" in s.title
    ]
    assert len(competitive_sessions) >= 4
    for session in competitive_sessions:
        assert session.status == "filtered"
        assert session.decision_badge == "Non-Competitor"

    # 2. Social dances and showcase exhibitions are marked status='included'
    social_showcase_sessions = [
        s
        for s in trace.sessions
        if "Social" in s.title or "Showcase" in s.title or "Exhibition" in s.title
    ]
    assert len(social_showcase_sessions) >= 2
    for session in social_showcase_sessions:
        assert session.status == "included"

    # Packing List: contains dance-safe Halloween costumes and electrolyte hydration packets
    packing_items = [p.name for p in trace.packing_manifest]
    assert "Dance-Safe Halloween Costumes" in packing_items
    assert "Electrolyte Hydration Packets" in packing_items


def test_rfc_5545_calendar_compliance():
    """Parses generated ics_content and verifies valid RFC 5545 calendar structure."""
    for fixture_name in ["bbb_2026.json", "halloween_2026.json"]:
        filepath = FIXTURES_DIR / fixture_name
        data = json.loads(filepath.read_text(encoding="utf-8"))

        ics = data["generate"]["icsContent"]

        # 1. Check header and footer
        assert "BEGIN:VCALENDAR" in ics
        assert "END:VCALENDAR" in ics
        assert "VERSION:2.0" in ics

        # 2. Check VEVENT blocks
        events = ics.split("BEGIN:VEVENT")[1:]
        assert len(events) >= 1, f"No VEVENT blocks found in {fixture_name}"

        for event_block in events:
            assert "END:VEVENT" in event_block
            assert "DTSTART" in event_block
            assert "DTEND" in event_block
            assert "SUMMARY" in event_block
