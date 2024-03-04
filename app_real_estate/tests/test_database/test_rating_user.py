import pytest
from app_real_estate.models import User
from app_real_estate.schemas import RatingSchema
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncResult

from ..conftest import async_session_maker


@pytest.mark.anyio
async def test_read_ratings_db():
    async with async_session_maker() as session:
        stmt = select(User).order_by(User.id)
        result: AsyncResult = await session.execute(stmt)
        users = result.unique().scalars().all()
        assert len(list(users)) > 1
        assert isinstance(list(users), list)


@pytest.mark.anyio
async def test_rating_by_id_db():
    async with async_session_maker() as session:
        user = await session.get(User, 1)
        assert user.__dict__["id"] == 1


@pytest.mark.anyio
async def test_rating_db():
    rating_update = {
        "user_id": 2
    }
    rating = {
        "user_id": 1,
        "profile_id": 1
    }
    rating_update = RatingSchema(**rating_update)
    rating = RatingSchema(**rating)
    for name, value in rating_update.model_dump(exclude_unset=True).items():
        setattr(rating, name, value)
    assert rating.user_id == 2
