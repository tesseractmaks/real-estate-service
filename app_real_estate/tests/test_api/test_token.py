import pytest
from httpx import AsyncClient

from ..conftest import client


@pytest.mark.anyio
async def test_create_token(client: AsyncClient):
    values_data = {
          "access_token": "string",
          "token_type": "string"
        }
    response = await client.post("http://127.0.0.1:8000/token", json=values_data)
    assert response.status_code == 201
