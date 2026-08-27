"""Buffer calculation arithmetic service module."""

from datetime import datetime, timedelta
from wcs_navigator_api.models.logistics import BufferCalculationResult, BufferStep


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

    # Timeline calculation step by step backwards from call time
    warmup_start_dt = earliest_dt - timedelta(minutes=warmup_mins)
    hotel_start_dt = warmup_start_dt - timedelta(minutes=hotel_mins)
    latest_landing_dt = hotel_start_dt - timedelta(minutes=transit_mins)

    call_time_str = earliest_dt.strftime("%H:%M")
    landing_time_str = latest_landing_dt.strftime("%H:%M")

    math_formula = (
        f"{call_time_str} (Call) - {transit_mins}m (Transit) - "
        f"{hotel_mins}m (Hotel Settle) - {warmup_mins}m (Warmup) = "
        f"{landing_time_str} (Landing Deadline)"
    )

    steps = [
        BufferStep(
            label="Earliest Call / Staging",
            time=earliest_dt.strftime("%I:%M %p").lstrip("0"),
            type="staging",
            description="Mandatory event call time",
        ),
        BufferStep(
            label="Warmup & Registration Buffer",
            time=warmup_start_dt.strftime("%I:%M %p").lstrip("0"),
            duration=f"{warmup_mins}m",
            type="warmup",
            description="Warmup and bib pick-up buffer",
        ),
        BufferStep(
            label="Hotel Check-In & Settle",
            time=hotel_start_dt.strftime("%I:%M %p").lstrip("0"),
            duration=f"{hotel_mins}m",
            type="hotel",
            description="Hotel check-in and luggage drop",
        ),
        BufferStep(
            label="Airport Transit",
            time=latest_landing_dt.strftime("%I:%M %p").lstrip("0"),
            duration=f"{transit_mins}m",
            type="transit",
            description="Drive/shuttle from airport to hotel",
        ),
        BufferStep(
            label="Latest Flight Landing",
            time=latest_landing_dt.strftime("%I:%M %p").lstrip("0"),
            type="flight",
            description="Latest safe touchdown deadline",
        ),
    ]

    return BufferCalculationResult(
        earliestStagingTime=earliest_dt.isoformat(),
        warmupMinutes=warmup_mins,
        hotelSettleMinutes=hotel_mins,
        transitMinutes=transit_mins,
        latestFlightArrivalDeadline=latest_landing_dt.isoformat(),
        steps=steps,
        formulaSummary=math_formula,
    )
