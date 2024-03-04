from auth import get_current_active_user
from core import logger
from crud import create_post_db, delete_post_db, read_posts_db, update_post_db
from db import db_helper
from fastapi import APIRouter, Depends, HTTPException, status
from schemas import (
    PostCreateSchema,
    PostSchema,
    PostUpdatePartialSchema,
    PostUpdateSchema,
)
from sqlalchemy.ext.asyncio import AsyncSession

from .depends_endps import post_by_id

router = APIRouter(tags=["Posts"])


@logger.catch
@router.get("/", response_model=list[PostSchema])
async def read_categories(
    current_user=Depends(get_current_active_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    posts = await read_posts_db(session=session)
    if posts is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return posts


@logger.catch
@router.get("/{post_id}/", response_model=PostSchema)
async def read_post_by_id(
    current_user=Depends(get_current_active_user),
    post: PostSchema = Depends(post_by_id),
):
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return post


@logger.catch
@router.post("/", response_model=PostSchema, status_code=status.HTTP_201_CREATED)
async def create_post(
    post_in: PostCreateSchema,
    current_user=Depends(get_current_active_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if post_in is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    return await create_post_db(session=session, post_in=post_in)


@logger.catch
@router.put("/{post_id}", response_model=PostSchema)
async def update_post(
    post_update: PostUpdateSchema,
    current_user=Depends(get_current_active_user),
    post: PostSchema = Depends(post_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if post_update is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    return await update_post_db(session=session, post=post, post_update=post_update)


@logger.catch
@router.delete("/{post_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    post: PostSchema = Depends(post_by_id),
    current_user=Depends(get_current_active_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    await delete_post_db(post=post, session=session)
