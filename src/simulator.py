from __future__ import annotations

import asyncio
import random
from datetime import datetime, timezone

from .models import BreakWarningEvent, DriverHoursEvent, GpsEvent, OrderStatusEvent
from .websocket_hub import WebSocketHub

FLEET_TOPIC = "fleet"
ORDERS_TOPIC = "orders"
WARNINGS_TOPIC = "warnings"

ORDER_FLOW = [
    ("created", "Užsakymas sukurtas"),
    ("assigned", "Priskirtas vairuotojui"),
    ("in_transit", "Krovinys kelyje"),
    ("delivered", "Užsakymas pristatytas"),
]


class LiveSimulator:
    def __init__(self, hub: WebSocketHub) -> None:
        self.hub = hub
        self._running = True

    async def run(self) -> None:
        await asyncio.gather(
            self._gps_loop(),
            self._driver_hours_loop(),
            self._order_status_loop(),
        )

    async def _gps_loop(self) -> None:
        lat, lon = 54.6872, 25.2797
        while self._running:
            lat += random.uniform(-0.001, 0.001)
            lon += random.uniform(-0.001, 0.001)
            event = GpsEvent(
                fleet_id=1,
                vehicle_code="TRK-001",
                latitude=lat,
                longitude=lon,
                speed_kmh=round(random.uniform(20, 70), 2),
                timestamp=datetime.now(timezone.utc),
            )
            await self.hub.publish(FLEET_TOPIC, event)
            await asyncio.sleep(1)

    async def _driver_hours_loop(self) -> None:
        driving_minutes = 0
        while self._running:
            driving_minutes += 15
            break_minutes = 0 if driving_minutes < 240 else random.choice([0, 15, 30])
            warning_needed = driving_minutes >= 270 and break_minutes < 30

            event = DriverHoursEvent(
                driver_id=101,
                fleet_id=1,
                driving_minutes=driving_minutes,
                break_minutes=break_minutes,
                warning_issued=warning_needed,
                timestamp=datetime.now(timezone.utc),
            )
            await self.hub.publish(FLEET_TOPIC, event)

            if warning_needed:
                warning = BreakWarningEvent(
                    driver_id=101,
                    fleet_id=1,
                    warning_type="mandatory_break",
                    message="Vairuotojui būtina 30 min. pertrauka",
                    severity="high",
                    timestamp=datetime.now(timezone.utc),
                )
                await self.hub.publish(WARNINGS_TOPIC, warning)

            if driving_minutes >= 360:
                driving_minutes = 0

            await asyncio.sleep(5)

    async def _order_status_loop(self) -> None:
        order_id = 5001
        while self._running:
            for status, description in ORDER_FLOW:
                event = OrderStatusEvent(
                    order_id=order_id,
                    order_code=f"ORD-{order_id}",
                    status=status,
                    description=description,
                    timestamp=datetime.now(timezone.utc),
                )
                await self.hub.publish(ORDERS_TOPIC, event)
                await asyncio.sleep(3)
            order_id += 1
