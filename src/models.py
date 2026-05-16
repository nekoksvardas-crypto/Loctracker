from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime


@dataclass(slots=True)
class GpsEvent:
    fleet_id: int
    vehicle_code: str
    latitude: float
    longitude: float
    speed_kmh: float
    timestamp: datetime


@dataclass(slots=True)
class DriverHoursEvent:
    driver_id: int
    fleet_id: int
    driving_minutes: int
    break_minutes: int
    warning_issued: bool
    timestamp: datetime


@dataclass(slots=True)
class BreakWarningEvent:
    driver_id: int
    fleet_id: int
    warning_type: str
    message: str
    severity: str
    timestamp: datetime


@dataclass(slots=True)
class OrderStatusEvent:
    order_id: int
    order_code: str
    status: str
    description: str
    timestamp: datetime
