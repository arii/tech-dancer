"""Buffer calculation arithmetic service module."""

from datetime import datetime, timedelta
from wcs_navigator_api.models.logistics import BufferCalculationResult


def calculate_flight_buffer(
    earliest_call_iso: str,
    transit_mins: int = 30,
    hotel_settle_hours: float = 1.5,
    warmup_buffer_hours: float = 1.0,
) -> BufferCalculationResult:
    """Calculates the latest safe flight arrival deadline based on earliest mandatory call time.

    Formula:
    Latest Landing = Earliest Call Time - (Transit Mins + 1.5h Hotel Settle + 1.0h Warmup/Reg Buffer)
    """
    earliest_dt = datetime.fromisoformat(earliest_call_iso)

    hotel_mins = int(hotel_settle_hours * 60)
    warmup_mins = int(warmup_buffer_hours * 60)

    total_buffer_mins = transit_mins + hotel_mins + warmup_mins
    latest_landing_dt = earliest_dt - timedelta(minutes=total_buffer_mins)

    call_time_str = earliest_dt.strftime("%H:%M")
    landing_time_str = latest_landing_dt.strftime("%H:%M")

    math_formula = (
        f"{call_time_str} (Call) - {transit_mins}m (Transit) - "
        f"{hotel_mins}m (Hotel Settle) - {warmup_mins}m (Warmup) = "
        f"{landing_time_str} (Landing Deadline)"
    )

    return BufferCalculationResult(
        earliest_call_time_iso=earliest_dt.isoformat(),
        transit_duration_mins=transit_mins,
        hotel_buffer_hours=hotel_settle_hours,
        warmup_buffer_hours=warmup_buffer_hours,
        latest_flight_arrival_iso=latest_landing_dt.isoformat(),
        math_breakdown_formula=math_formula,
    )
