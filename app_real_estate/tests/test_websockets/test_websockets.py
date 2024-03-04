from ..conftest import client
from fastapi.websockets import WebSocket
from httpx import AsyncClient
from app_real_estate.main import app
from fastapi.testclient import TestClient


@app.websocket("/ws")
async def websocket(websocket: WebSocket):
    await websocket.accept()
    await websocket.send_json({"msg": "Hello WebSocket"})
    await websocket.close()


def test_websocket(client: AsyncClient):
    client = TestClient(app)
    with client.websocket_connect("/ws") as websocket:
        data = websocket.receive_json()
        assert data == {"msg": "Hello WebSocket"}