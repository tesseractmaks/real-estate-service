from models import AssociateRatings
from schemas import RatingSchema
from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession


async def read_ratings_db(session: AsyncSession) -> list[RatingSchema]:
    stmt = select(AssociateRatings).order_by(AssociateRatings.id)
    result: Result = await session.execute(stmt)
    ratings = result.scalars().all()
    return list(ratings)


async def read_rating_by_id_db(
    session: AsyncSession, rating_id: int
) -> RatingSchema | None:
    return await session.get(AssociateRatings, rating_id)


async def create_rating_db(
    session: AsyncSession, rating_in: RatingSchema
) -> AssociateRatings:
    rating = AssociateRatings(**rating_in.model_dump())
    session.add(rating)
    await session.commit()
    return rating


async def update_rating_db(
    session: AsyncSession,
    rating: RatingSchema,
    rating_update: RatingSchema,
    partial: bool = False,
) -> RatingSchema:
    for name, value in rating_update.model_dump(exclude_unset=partial).items():
        setattr(rating, name, value)
    await session.commit()
    return rating


async def delete_rating_db(session: AsyncSession, rating: RatingSchema) -> None:
    await session.delete(rating)
    await session.commit()
