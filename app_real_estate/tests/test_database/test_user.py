import pytest
from app_real_estate.models import User
from app_real_estate.schemas import UserSchema, UserUpdatePartialSchema
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncResult

from ..conftest import async_session_maker


@pytest.mark.anyio
async def test_read_users_db():
    async with async_session_maker() as session:
        stmt = select(User).order_by(User.id)
        result: AsyncResult = await session.execute(stmt)
        users = result.unique().scalars().all()
        assert len(list(users)) > 1


@pytest.mark.anyio
async def test_read_user_by_id_db():
    async with async_session_maker() as session:
        user = await session.get(User, 1)
        assert user.__dict__["id"] == 1


@pytest.mark.anyio
async def test_read_user_by_username_db():
    async with async_session_maker() as session:
        stmt = select(User).where(User.email == "one@mail.ru1")
        result: AsyncResult = await session.execute(stmt)
        user = result.scalar()
        assert user.__dict__["email"] == "one@mail.ru1"


@pytest.mark.anyio
async def test_create_user_db():
    async with async_session_maker() as session:
        user_in = {
            "email": "one4@mail.ru",
            "password": "qwerty",
            "is_active": True
        }
        user = User(**user_in)
        assert user.email == "one4@mail.ru"


@pytest.mark.anyio
async def test_update_user_db():
    user_update = {
        "email": "one6@mail.ru"
    }
    user = {
        "email": "one5@mail.ru",
        "password": "qwerty",
        "is_active": True
    }
    user_update = UserUpdatePartialSchema(**user_update)
    user = UserSchema(**user)
    for name, value in user_update.model_dump(exclude_unset=True).items():
        setattr(user, name, value)
    assert user.email == "one6@mail.ru"


@pytest.mark.anyio
async def test_delete_user():
    async with async_session_maker() as session:
        user_get = await session.get(User, 1)
        await session.delete(user_get)
        await session.commit()
        user_empty = await session.get(User, 1)
        assert not user_empty
