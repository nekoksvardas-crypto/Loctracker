from __future__ import annotations

import asyncio

from websockets.asyncio.server import serve
from websockets.exceptions import ConnectionClosed

from .simulator import LiveSimulator
from .websocket_hub import WebSocketHub


async def websocket_handler(websocket) -> None:
    path = websocket.request.path
    topic = path.rsplit("/", 1)[-1]

    if topic not in {"fleet", "orders", "warnings"}:
        await websocket.send('{"error":"Unknown topic"}')
        await websocket.close(code=1008, reason="Unknown topic")
        return

    await HUB.subscribe(topic, websocket)
    try:
        async for _ in websocket:
            # Reserved for future client commands (ack, filters, control plane)
            pass
    except ConnectionClosed:
        pass
    finally:
        await HUB.unsubscribe(topic, websocket)


async def main() -> None:
    simulator = LiveSimulator(HUB)

    async with serve(websocket_handler, "0.0.0.0", 8765):
        print("WebSocket server started at ws://0.0.0.0:8765/ws/<fleet|orders|warnings>")
        await simulator.run()


HUB = WebSocketHub()

if __name__ == "__main__":
    asyncio.run(main())
