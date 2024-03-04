from models import Category
from schemas import (
    CategoryCreateSchema,
    CategorySchema,
    CategoryUpdatePartialSchema,
    CategoryUpdateSchema,
)
from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession


async def read_categories_db(session: AsyncSession) -> list[CategorySchema]:
    stmt = select(Category).order_by(Category.id)
    result: Result = await session.execute(stmt)
    categories = result.scalars().all()
    return list(categories)


async def read_category_by_id_db(
    session: AsyncSession, category_id: int
) -> CategorySchema | None:
    return await session.get(Category, category_id)


async def create_category_db(
    session: AsyncSession, category_in: CategoryCreateSchema
) -> Category:
    category = Category(**category_in.model_dump())
    session.add(category)
    await session.commit()
    return category


async def update_category_db(
    session: AsyncSession,
    category: CategorySchema,
    category_update: CategoryUpdateSchema | CategoryUpdatePartialSchema,
    partial: bool = False,
) -> CategorySchema:
    for name, value in category_update.model_dump(exclude_unset=partial).items():
        setattr(category, name, value)
    await session.commit()
    return category


async def delete_category_db(session: AsyncSession, category: CategorySchema) -> None:
    await session.delete(category)
    await session.commit()
