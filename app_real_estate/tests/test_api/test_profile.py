from .utils import values_profile
import pytest
from httpx import AsyncClient

from ..conftest import client


@pytest.mark.anyio
@pytest.mark.parametrize("route", ["profiles/", "profiles/1/"])
async def test_get_profiles(client: AsyncClient, route):
    response = await client.get(route)
    assert response.status_code == 200


@pytest.mark.anyio
async def test_create_profile(client: AsyncClient):
    response = await client.post("profiles/", json=values_profile)
    assert response.status_code == 201


@pytest.mark.anyio
async def test_update_profile(client: AsyncClient):
    response = await client.put("profiles/1", json=values_profile)
    assert response.status_code == 200


@pytest.mark.anyio
async def test_update_profile_partial(client: AsyncClient):
    values_data = {
        "nickname": "string1",
        }
    response = await client.patch("profiles/1", json=values_data)
    assert response.status_code == 200


@pytest.mark.anyio
async def test_delete_profile(client: AsyncClient):
    # respons = await client.delete('http://127.0.0.1:8000/api/v1/profiles/1/')
    response = await client.delete("profiles/1/")
    assert response.status_code == 204

