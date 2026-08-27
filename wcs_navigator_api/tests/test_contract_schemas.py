"""Unit tests ensuring WCS Navigator Backend schemas match Frontend TypeScript contracts."""

import json
from pathlib import Path

from wcs_navigator_api.models.payloads import (
    DiscoveryResponse,
    FormQuestion,
    FormQuestionOption,
    GenerateResponse,
)
from wcs_navigator_api.models.logistics import (
    AgentDecisionTrace,
    AuditSession,
    BufferCalculationResult,
    BufferStep,
    PackingItem,
    SubTask,
    ThemeDressCode,
)

FIXTURES_DIR = Path(__file__).parent / "fixtures"


def test_discovery_response_frontend_contract_serialization():
    """Verify DiscoveryResponse matches TypeScript DiscoveryResponse & FormQuestion interfaces."""
    question = FormQuestion(
        id="wsdc_division",
        title="What is your dancer persona & competition division?",
        type="select",
        context="Filters out ineligible workshop tracks and determines staging call times.",
        required=True,
        defaultValue="novice",
        options=[
            FormQuestionOption(
                label="Novice Competitor",
                value="novice",
                subtitle="WSDC Novice prelims, early staging call, foundational tracks",
                badge="Novice",
            ),
            FormQuestionOption(
                label="Social Dancer Only",
                value="social_only",
                subtitle="All-levels workshops, peak party energy, no prelim staging calls",
                badge="Social",
            ),
        ],
    )

    discovery = DiscoveryResponse(
        preset_id="boogie-by-the-bay-2026",
        preset_name="Boogie by the Bay 2026",
        event_name="Boogie by the Bay 2026",
        tracks_detected=["West Coast Swing", "Country Swing", "Hustle"],
        suggested_form_questions=[question],
    )

    payload = discovery.model_dump(by_alias=True)

    # Assert shape matches frontend DynamicQuestionnaire requirements
    assert payload["preset_id"] == "boogie-by-the-bay-2026"
    assert payload["preset_name"] == "Boogie by the Bay 2026"
    assert payload["event_name"] == "Boogie by the Bay 2026"
    assert len(payload["suggested_form_questions"]) == 1

    q_dump = payload["suggested_form_questions"][0]
    assert q_dump["id"] == "wsdc_division"
    assert q_dump["title"] == "What is your dancer persona & competition division?"
    assert q_dump["context"] == "Filters out ineligible workshop tracks and determines staging call times."
    assert q_dump["type"] == "select"
    assert q_dump["required"] is True
    assert q_dump["defaultValue"] == "novice"
    assert len(q_dump["options"]) == 2
    assert q_dump["options"][0]["label"] == "Novice Competitor"
    assert q_dump["options"][0]["value"] == "novice"
    assert q_dump["options"][0]["badge"] == "Novice"
    assert q_dump["options"][0]["subtitle"] is not None


def test_generate_response_frontend_contract_serialization():
    """Verify GenerateResponse and AgentDecisionTrace match TypeScript AgentDecisionTrace interface."""
    sub_tasks = [
        SubTask(id="1", label="Parsed event timetable", status="completed", detail="Extracted sessions"),
        SubTask(id="2", label="Calculated travel buffer", status="completed", detail="Target landing computed"),
    ]

    buffer_steps = [
        BufferStep(label="Staging Call", time="5:15 PM", duration="Check-in", type="staging"),
        BufferStep(label="Target Landing", time="2:15 PM", duration="Deadline", type="flight"),
    ]

    buffer_timeline = BufferCalculationResult(
        earliestStagingTime="2026-10-09T17:15:00-07:00",
        warmupMinutes=60,
        hotelSettleMinutes=90,
        transitMinutes=30,
        latestFlightArrivalDeadline="2026-10-09T14:25:00-07:00",
        steps=buffer_steps,
        formulaSummary="17:15 (Call) - 30m - 90m - 60m = 14:25 (Landing)",
    )

    sessions = [
        AuditSession(
            id="s1",
            title="Novice Strictly Swing Prelims",
            time="Friday 5:30 PM - 6:30 PM",
            location="Grand Ballroom",
            status="included",
            decisionBadge="Division Match",
            justification="Matches selected competitive division (Novice).",
        ),
        AuditSession(
            id="s2",
            title="Advanced/All-Star Masterclass",
            time="Saturday 11:00 AM - 12:00 PM",
            location="Junior Ballroom",
            status="filtered",
            decisionBadge="Level Ineligible",
            justification="Filtered: User profile is ineligible for Advanced+ classes.",
        ),
    ]

    themes = [
        ThemeDressCode(
            id="t1",
            day="Friday Night",
            themeTitle="Neon & Glow Party",
            category="social_theme",
            description="Midnight social with UV lighting.",
            recommendedAttire=["Neon tops", "Glow accessories"],
            vibe="High Energy",
        )
    ]

    packing = [
        PackingItem(
            id="p1",
            name="Adhesive Suede Shoe Sheets",
            category="footwear",
            rationale="For portable ballroom vinyl tiling",
            quantity=2,
        )
    ]

    decision_trace = AgentDecisionTrace(
        subTasks=sub_tasks,
        bufferTimeline=buffer_timeline,
        sessions=sessions,
        themeDressCodes=themes,
        packingManifest=packing,
        icsContent="BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR",
    )

    generate_resp = GenerateResponse(
        decisionTrace=decision_trace,
        icsContent="BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR",
    )

    dump = generate_resp.model_dump(by_alias=True)

    # Top-level checks
    assert "decisionTrace" in dump
    assert "icsContent" in dump
    assert dump["icsContent"].startswith("BEGIN:VCALENDAR")

    trace_dump = dump["decisionTrace"]
    assert len(trace_dump["subTasks"]) == 2
    assert trace_dump["subTasks"][0]["status"] in ["completed", "in_progress", "pending"]

    # Buffer Timeline checks
    assert trace_dump["bufferTimeline"]["earliestStagingTime"] == "2026-10-09T17:15:00-07:00"
    assert trace_dump["bufferTimeline"]["latestFlightArrivalDeadline"] == "2026-10-09T14:25:00-07:00"
    assert len(trace_dump["bufferTimeline"]["steps"]) == 2

    # Sessions Audit Matrix checks
    assert len(trace_dump["sessions"]) == 2
    assert trace_dump["sessions"][0]["status"] == "included"
    assert trace_dump["sessions"][0]["decisionBadge"] == "Division Match"
    assert trace_dump["sessions"][1]["status"] == "filtered"
    assert trace_dump["sessions"][1]["decisionBadge"] == "Level Ineligible"

    # Themes checks
    assert len(trace_dump["themeDressCodes"]) == 1
    assert trace_dump["themeDressCodes"][0]["themeTitle"] == "Neon & Glow Party"
    assert trace_dump["themeDressCodes"][0]["category"] == "social_theme"
    assert trace_dump["themeDressCodes"][0]["recommendedAttire"] == ["Neon tops", "Glow accessories"]

    # Packing checks
    assert len(trace_dump["packingManifest"]) == 1
    assert trace_dump["packingManifest"][0]["name"] == "Adhesive Suede Shoe Sheets"
    assert trace_dump["packingManifest"][0]["category"] == "footwear"


def test_fixture_schema_deserialization_gate():
    """Ensure fixture JSON files deserialize directly into Pydantic models matching frontend contract."""
    for fixture_name in ["bbb_2026.json", "halloween_2026.json"]:
        filepath = FIXTURES_DIR / fixture_name
        assert filepath.exists()

        data = json.loads(filepath.read_text(encoding="utf-8"))

        discovery = DiscoveryResponse.model_validate(data["discovery"])
        assert len(discovery.suggested_form_questions) > 0
        for q in discovery.suggested_form_questions:
            assert q.id
            assert q.title
            assert q.context

        generate = GenerateResponse.model_validate(data["generate"])
        trace = generate.decision_trace
        assert len(trace.sub_tasks) > 0
        assert trace.buffer_timeline.earliest_staging_time
        assert trace.buffer_timeline.latest_flight_arrival_deadline
        for sess in trace.sessions:
            assert sess.status in ["included", "filtered"]
            assert sess.decision_badge
