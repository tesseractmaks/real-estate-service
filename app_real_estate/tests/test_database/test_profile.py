import pytest
from app_real_estate.models import Profile
from app_real_estate.schemas import ProfileUpdatePartialSchema, ProfileSchema
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncResult

from ..conftest import async_session_maker
from ..utils import values_profile


@pytest.mark.anyio
async def test_read_profiles_db():
    async with async_session_maker() as session:
        stmt = select(Profile).order_by(Profile.id)
        result: AsyncResult = await session.execute(stmt)
        profiles = result.unique().scalars().all()
        assert len(list(profiles)) > 1


@pytest.mark.anyio
async def test_read_profile_by_id_db():
    async with async_session_maker() as session:
        profile = await session.get(Profile, 1)
        assert profile.__dict__["id"] == 1


@pytest.mark.anyio
async def test_create_profile_db():
    async with async_session_maker() as session:
        profile = Profile(**values_profile)
        assert profile.nickname == "string"


@pytest.mark.anyio
async def test_update_profile_db():
    profile_update = {
        "nickname": "string1"
    }
    profile_update = ProfileUpdatePartialSchema(**profile_update)
    profile = ProfileSchema(**values_profile)
    for name, value in profile_update.model_dump(exclude_unset=True).items():
        setattr(profile, name, value)
    assert profile.nickname == "string1"


@pytest.mark.anyio
async def test_update_file_profile():
    async with async_session_maker() as session:
        await session.execute(update(Profile).where(Profile.id == 1).values(avatar="../photo.png"))


@pytest.mark.anyio
async def test_delete_profile():
    async with async_session_maker() as session:
        profile_get = await session.get(Profile, 1)
        await session.delete(profile_get)
        await session.commit()
        profile_empty = await session.get(Profile, 1)
        assert not profile_empty
