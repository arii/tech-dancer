"""Logistics data structures for WCS Navigator API."""

from typing import List, Literal, Optional
from pydantic import BaseModel, ConfigDict, Field


class BufferStep(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    label: str
    time: str
    duration: Optional[str] = None
    type: Literal["staging", "warmup", "hotel", "transit", "flight"]
    description: Optional[str] = None


class BufferCalculationResult(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    earliest_staging_time: str = Field(alias="earliestStagingTime")
    warmup_minutes: int = Field(alias="warmupMinutes")
    hotel_settle_minutes: int = Field(alias="hotelSettleMinutes")
    transit_minutes: int = Field(alias="transitMinutes")
    latest_flight_arrival_deadline: str = Field(alias="latestFlightArrivalDeadline")
    steps: List[BufferStep] = Field(default_factory=list)
    formula_summary: str = Field(alias="formulaSummary")

    # Backwards compatibility properties / aliases for python snake_case access
    @property
    def earliest_call_time_iso(self) -> str:
        return self.earliest_staging_time

    @property
    def transit_duration_mins(self) -> int:
        return self.transit_minutes

    @property
    def hotel_buffer_hours(self) -> float:
        return round(self.hotel_settle_minutes / 60.0, 2)

    @property
    def warmup_buffer_hours(self) -> float:
        return round(self.warmup_minutes / 60.0, 2)

    @property
    def latest_flight_arrival_iso(self) -> str:
        return self.latest_flight_arrival_deadline

    @property
    def math_breakdown_formula(self) -> str:
        return self.formula_summary


class SubTask(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    label: str
    status: Literal["completed", "in_progress", "pending"]
    detail: Optional[str] = None


class AuditSession(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    title: str
    time: str
    location: str
    status: Literal["included", "filtered"]
    decision_badge: str = Field(alias="decisionBadge")
    justification: str


class ThemeDressCode(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    day: str
    theme_title: str = Field(alias="themeTitle")
    category: Literal["social_theme", "showcase_formal", "competition_attire", "casual_sunday"]
    description: str
    recommended_attire: List[str] = Field(default_factory=list, alias="recommendedAttire")
    vibe: str


class AgentDecisionTrace(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    sub_tasks: List[SubTask] = Field(default_factory=list, alias="subTasks")
    buffer_timeline: BufferCalculationResult = Field(alias="bufferTimeline")
    sessions: List[AuditSession] = Field(default_factory=list)
    theme_dress_codes: Optional[List[ThemeDressCode]] = Field(default_factory=list, alias="themeDressCodes")
    ics_content: str = Field(alias="icsContent")
