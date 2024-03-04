import pytest
from httpx import AsyncClient

from ..conftest import client


@pytest.mark.anyio
@pytest.mark.parametrize("route", ["ratings/", "ratings/1/"])
async def test_get_ratings(client: AsyncClient, route):
    response = await client.get(route)
    assert response.status_code == 200


@pytest.mark.anyio
async def test_delete_rating(client: AsyncClient):
    # respons = await client.delete('http://127.0.0.1:8000/api/v1/profiles/1/')
    response = await client.delete("ratings/1/")
    assert response.status_code == 204

