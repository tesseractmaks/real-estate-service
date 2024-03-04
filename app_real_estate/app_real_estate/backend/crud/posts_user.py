from models import Post
from schemas import (
    PostCreateSchema,
    PostSchema,
    PostUpdatePartialSchema,
    PostUpdateSchema,
)
from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession


async def read_posts_db(session: AsyncSession) -> list[PostSchema]:
    stmt = select(Post).order_by(Post.id)
    result: Result = await session.execute(stmt)
    posts = result.scalars().all()
    return list(posts)


async def read_post_by_id_db(session: AsyncSession, post_id: int) -> PostSchema | None:
    return await session.get(Post, post_id)


async def create_post_db(session: AsyncSession, post_in: PostCreateSchema) -> Post:
    post = Post(**post_in.model_dump())
    session.add(post)
    await session.commit()
    return post


async def update_post_db(
    session: AsyncSession,
    post: PostSchema,
    post_update: PostUpdateSchema | PostUpdatePartialSchema,
    partial: bool = False,
) -> PostSchema:
    for name, value in post_update.model_dump(exclude_unset=partial).items():
        setattr(post, name, value)
    await session.commit()
    return post


async def delete_post_db(session: AsyncSession, post: PostSchema) -> None:
    await session.delete(post)
    await session.commit()
