from models import Profile, User
from schemas import (
    UserCreateSchema,
    UserSchema,
    UserUpdatePartialSchema,
    UserUpdateSchema,
)
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncResult, AsyncSession
from sqlalchemy.orm import selectinload


async def read_users_db(session: AsyncSession) -> list[UserSchema]:
    stmt = select(User).order_by(User.id)
    result: AsyncResult = await session.execute(stmt)
    users = result.unique().scalars().all()
    return list(users)


async def read_user_by_id_db(session: AsyncSession, user_id: int) -> UserSchema | None:
    return await session.get(User, user_id)


async def read_user_by_username_db(
    session: AsyncSession, username: str
) -> UserSchema | None:
    stmt = (
        select(User)
        .where(User.email == username)
        .options(selectinload(User.properties), selectinload(User.profile))
    )
    result: AsyncResult = await session.execute(stmt)
    user = result.unique().scalar_one()
    return user


async def create_user_db(session: AsyncSession, user_in: UserCreateSchema) -> User:
    user = User(**user_in.model_dump())
    session.add(user)
    profile = Profile()
    session.add(profile)
    await session.commit()
    user.profile_id = profile.id
    session.add(user)
    await session.commit()
    return user.__dict__


async def update_user_db(
    session: AsyncSession,
    user: UserSchema,
    user_update: UserUpdateSchema | UserUpdatePartialSchema,
    partial: bool = False,
) -> UserSchema:
    for name, value in user_update.model_dump(exclude_unset=partial).items():
        setattr(user, name, value)
    await session.commit()
    return user


async def delete_user_db(session: AsyncSession, user: UserSchema) -> None:
    await session.delete(user)
    await session.commit()
