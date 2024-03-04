from models import Profile, User
from schemas import (
    ProfileCreateSchema,
    ProfileSchema,
    ProfileUpdatePartialSchema,
    ProfileUpdateSchema,
)
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncResult, AsyncSession


async def read_profiles_db(session: AsyncSession) -> list[ProfileSchema]:
    stmt = select(Profile).order_by(Profile.id).join(Profile.users)
    result: AsyncResult = await session.execute(stmt)
    profiles = result.unique().scalars().all()
    return list(profiles)


async def read_profile_by_id_db(
    session: AsyncSession, profile_id: int
) -> ProfileSchema | None:
    return await session.get(Profile, profile_id)


async def read_profile_by_id_user_db(
    session: AsyncSession, user_id: int
) -> ProfileSchema | None:
    stmt = select(Profile).join(Profile.users).where(User.id == user_id)
    result: AsyncResult = await session.execute(stmt)
    profile = result.unique().scalar_one()
    return profile


async def create_profile_db(
    session: AsyncSession,
    profile_in: ProfileCreateSchema,
) -> Profile:
    profile_obj = profile_in.model_dump()
    profile = Profile(**profile_obj)
    session.add(profile)
    await session.commit()
    return profile


async def update_profile_db(
    session: AsyncSession,
    profile: ProfileSchema,
    profile_update: ProfileUpdateSchema | ProfileUpdatePartialSchema,
    partial: bool = False,
) -> ProfileSchema:
    for name, value in profile_update.model_dump(exclude_unset=partial).items():
        setattr(profile, name, value)
    await session.commit()
    return profile


async def update_photo_profile(
    profile: ProfileSchema,
    url_file: str,
    session: AsyncSession,
):
    if profile.avatar:
        await session.execute(
            update(Profile).where(Profile.id == profile.id).values(avatar=url_file)
        )
    await session.commit()
    avatar = {
        "avatar": profile.avatar,
    }
    return avatar


async def delete_profile_db(session: AsyncSession, profile: ProfileSchema) -> None:
    await session.delete(profile)
    await session.commit()
