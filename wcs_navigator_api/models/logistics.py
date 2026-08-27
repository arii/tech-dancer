"""Logistics data structures for WCS Navigator API."""

from pydantic import BaseModel


class BufferCalculationResult(BaseModel):
    earliest_call_time_iso: str
    transit_duration_mins: int
    hotel_buffer_hours: float
    warmup_buffer_hours: float
    latest_flight_arrival_iso: str
    math_breakdown_formula: str  # P0: Explainable step-by-step calculation string
