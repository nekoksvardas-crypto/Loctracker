from __future__ import annotations

import asyncio
import json
from collections import defaultdict
from dataclasses import asdict
from datetime import datetime
from typing import Any

from websockets import WebSocketServerProtocol


class WebSocketHub:
    """In-memory topic hub; can be swapped with Redis/Kafka bridge later."""

    def __init__(self) -> None:
        self._topics: dict[str, set[WebSocketServerProtocol]] = defaultdict(set)
        self._lock = asyncio.Lock()

    async def subscribe(self, topic: str, websocket: WebSocketServerProtocol) -> None:
        async with self._lock:
            self._topics[topic].add(websocket)

    async def unsubscribe(self, topic: str, websocket: WebSocketServerProtocol) -> None:
        async with self._lock:
            clients = self._topics.get(topic)
            if not clients:
                return
            clients.discard(websocket)
            if not clients:
                del self._topics[topic]

    async def publish(self, topic: str, event: Any) -> None:
        payload = self._serialize(event)
        async with self._lock:
            subscribers = list(self._topics.get(topic, set()))

        if not subscribers:
            return

        await asyncio.gather(
            *(client.send(payload) for client in subscribers if not client.closed),
            return_exceptions=True,
        )

    @staticmethod
    def _serialize(event: Any) -> str:
        if hasattr(event, "__dataclass_fields__"):
            data = asdict(event)
        elif isinstance(event, dict):
            data = event
        else:
            data = {"value": str(event)}

        for key, value in list(data.items()):
            if isinstance(value, datetime):
                data[key] = value.isoformat()

        return json.dumps(data, ensure_ascii=False)
