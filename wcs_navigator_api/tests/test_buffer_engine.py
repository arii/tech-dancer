"""Unit tests for Temporal Flight Buffer Engine."""

from wcs_navigator_api.services.buffer_engine import calculate_flight_buffer


def test_calculate_flight_buffer_definition_of_done():
    """Verify DoD example: 2026-10-09T17:15:00-07:00 with 20m transit returns 2026-10-09T14:25:00-07:00."""
    earliest_call_iso = "2026-10-09T17:15:00-07:00"
    result = calculate_flight_buffer(
        earliest_call_iso=earliest_call_iso,
        transit_mins=20,
        hotel_settle_hours=1.5,
        warmup_buffer_hours=1.0,
    )

    # Snake_case properties / backward compatibility
    assert result.earliest_call_time_iso == earliest_call_iso
    assert result.transit_duration_mins == 20
    assert result.hotel_buffer_hours == 1.5
    assert result.warmup_buffer_hours == 1.0
    assert result.latest_flight_arrival_iso == "2026-10-09T14:25:00-07:00"
    assert (
        result.math_breakdown_formula
        == "17:15 (Call) - 20m (Transit) - 90m (Hotel Settle) - 60m (Warmup) = 14:25 (Landing Deadline)"
    )

    # Frontend FlightBuffer contract fields (JSON camelCase serialization)
    json_dump = result.model_dump(by_alias=True)
    assert json_dump["earliestStagingTime"] == earliest_call_iso
    assert json_dump["transitMinutes"] == 20
    assert json_dump["hotelSettleMinutes"] == 90
    assert json_dump["warmupMinutes"] == 60
    assert json_dump["latestFlightArrivalDeadline"] == "2026-10-09T14:25:00-07:00"
    assert (
        json_dump["formulaSummary"]
        == "17:15 (Call) - 20m (Transit) - 90m (Hotel Settle) - 60m (Warmup) = 14:25 (Landing Deadline)"
    )
    assert len(json_dump["steps"]) == 5
    assert json_dump["steps"][0]["type"] == "staging"
    assert json_dump["steps"][4]["type"] == "flight"


def test_calculate_flight_buffer_defaults():
    """Verify default arguments (30m transit, 1.5h hotel, 1.0h warmup). Total buffer: 30 + 90 + 60 = 180 mins (3 hours)."""
    earliest_call_iso = "2026-10-10T10:30:00-04:00"
    result = calculate_flight_buffer(earliest_call_iso=earliest_call_iso)

    assert result.earliest_call_time_iso == earliest_call_iso
    assert result.transit_duration_mins == 30
    assert result.hotel_buffer_hours == 1.5
    assert result.warmup_buffer_hours == 1.0
    assert result.latest_flight_arrival_iso == "2026-10-10T07:30:00-04:00"
    assert (
        result.math_breakdown_formula
        == "10:30 (Call) - 30m (Transit) - 90m (Hotel Settle) - 60m (Warmup) = 07:30 (Landing Deadline)"
    )


def test_calculate_flight_buffer_custom_buffers():
    """Verify calculation with custom buffer parameters."""
    earliest_call_iso = "2026-11-05T09:00:00+02:00"
    result = calculate_flight_buffer(
        earliest_call_iso=earliest_call_iso,
        transit_mins=45,
        hotel_settle_hours=2.0,
        warmup_buffer_hours=0.5,
    )

    # Total buffer: 45 + 120 + 30 = 195 mins (3h 15m) -> 09:00 - 3h15m = 05:45
    assert result.latest_flight_arrival_iso == "2026-11-05T05:45:00+02:00"
    assert (
        result.math_breakdown_formula
        == "09:00 (Call) - 45m (Transit) - 120m (Hotel Settle) - 30m (Warmup) = 05:45 (Landing Deadline)"
    )
