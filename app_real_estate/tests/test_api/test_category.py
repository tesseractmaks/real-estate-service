import pytest
from httpx import AsyncClient
from ..conftest import client


@pytest.mark.anyio
@pytest.mark.parametrize("route", ["categories/", "categories/1/"])
async def test_get_categories(client: AsyncClient, route):
    response = await client.get(route)
    assert response.status_code == 200


@pytest.mark.anyio
async def test_create_category(client: AsyncClient):
    values_data = {
        "title": "mustbea"
    }
    response = await client.post("categories/", json=values_data)
    assert response.status_code == 201


@pytest.mark.anyio
async def test_update_category(client: AsyncClient):
    values_data = {
        "title": "mustbea"
    }
    response = await client.put("categories/1", json=values_data)
    assert response.status_code == 200


@pytest.mark.anyio
async def test_delete_category(client: AsyncClient):
    # respons = await client.delete('http://127.0.0.1:8000/api/v1/profiles/1/')
    response = await client.delete("categories/1/")
    assert response.status_code == 204
