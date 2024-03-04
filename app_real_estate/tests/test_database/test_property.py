import pytest
from app_real_estate.models import Property
from app_real_estate.schemas import PropertyUpdatePartialSchema, PropertySchema
from sqlalchemy import select, update, func
from sqlalchemy.ext.asyncio import AsyncResult

from ..conftest import async_session_maker
from ..utils import values_update_property


@pytest.mark.anyio
async def test_count_cities_db():
    async with async_session_maker() as session:
        stmt_group = select(
            Property.city,
            func.count(1)
        ).group_by(
            Property.city
        ).order_by(
            func.count(1).desc()
        ).limit(4)
        result = await session.execute(stmt_group)
        cities = result.all()
        assert len(list(cities)) > 1


@pytest.mark.anyio
async def test_sidebar_properties_db():
    async with async_session_maker() as session:
        query = select(Property).order_by(Property.time_published).limit(6)
        result: AsyncResult = await session.execute(query)
        properties = result.unique().scalars().all()
        assert len(list(properties)) > 1


@pytest.mark.anyio
async def test_read_property_by_id_db():
    async with async_session_maker() as session:
        property_ = await session.get(Property, 1)
        assert property_.__dict__["id"] == 1


@pytest.mark.anyio
async def test_create_property_db():
    async with async_session_maker() as session:
        _property = Property(**values_update_property)
        assert _property.country == "string"


@pytest.mark.anyio
async def test_update_file_property():
    async with async_session_maker() as session:
        _property = Property(**values_update_property)
        await session.execute(update(Property).where(Property.id == _property.id).values(photo="../photo.png"))


@pytest.mark.anyio
async def test_update_property_db():
    property_update = {
        "country": "string"
    }
    property_update = PropertyUpdatePartialSchema(**property_update)
    _property = PropertySchema(**values_update_property)
    for name, value in property_update.model_dump(exclude_unset=True).items():
        setattr(_property, name, value)
    assert _property.country == "string"


@pytest.mark.anyio
async def test_delete_user():
    async with async_session_maker() as session:
        property_get = await session.get(Property, 1)
        await session.delete(property_get)
        await session.commit()
        property_empty = await session.get(Property, 1)
        assert not property_empty
