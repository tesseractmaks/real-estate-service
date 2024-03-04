from fastapi_pagination.ext.sqlalchemy import paginate
from models import Property
from schemas import (
    PropertyCreateSchema,
    PropertyFilter,
    PropertySchema,
    PropertyUpdatePartialSchema,
    PropertyUpdateSchema,
)
from sqlalchemy import func, select, update
from sqlalchemy.ext.asyncio import AsyncResult, AsyncSession
from sqlalchemy.orm import selectinload


async def count_cities_db(session: AsyncSession):
    stmt_group = (
        select(Property.city, func.count(1))
        .group_by(Property.city)
        .order_by(func.count(1).desc())
        .limit(4)
    )
    result = await session.execute(stmt_group)
    cities = result.all()
    return dict({"cities": cities})


async def read_properties_db(session: AsyncSession, property_filter: PropertyFilter):
    if property_filter.category_id == 0:
        property_filter.category_id = None
    if property_filter.bedrooms == 0:
        property_filter.bedrooms = None
    stmt = property_filter.filter(
        select(Property).options(
            selectinload(Property.users), selectinload(Property.categories)
        )
    )
    return paginate(session, stmt)


async def sidebar_properties_db(session: AsyncSession) -> list[PropertySchema]:
    query = select(Property).order_by(Property.time_published).limit(6)
    result: AsyncResult = await session.execute(query)
    properties = result.unique().scalars().all()
    return list(properties)


async def read_property_by_id_db(
    session: AsyncSession, property_id: int
) -> PropertySchema | None:
    query = (
        select(Property)
        .where(Property.id == property_id)
        .options(selectinload(Property.users), selectinload(Property.categories))
    )
    result: AsyncResult = await session.execute(query)
    property_ = result.unique().scalar_one()
    return property_


async def create_property_db(
    session: AsyncSession, property_in: PropertyCreateSchema
) -> Property:
    _property = Property(**property_in.model_dump())
    session.add(_property)
    await session.commit()
    return _property


async def update_file_property(
    _property: PropertySchema,
    url_file: str,
    session: AsyncSession,
):
    if _property.photo:
        await session.execute(
            update(Property).where(Property.id == _property.id).values(photo=url_file)
        )
    await session.commit()
    file = {
        "photo": _property.photo,
    }
    return file


async def update_property_db(
    session: AsyncSession,
    _property: PropertySchema,
    property_update: PropertyUpdateSchema | PropertyUpdatePartialSchema,
    partial: bool = False,
) -> PropertySchema:
    for name, value in property_update.model_dump(exclude_unset=partial).items():
        setattr(_property, name, value)
    await session.commit()
    return _property


async def delete_property_db(session: AsyncSession, _property: PropertySchema) -> None:
    await session.delete(_property)
    await session.commit()
