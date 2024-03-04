from fastapi import APIRouter, HTTPException, status

from core import logger
from crud import (
    create_post_db,
    delete_post_db,
    read_post_by_id_db,
    read_posts_db,
    update_post_db,
)
from schemas import (
    PostBlogCreateSchema,
    PostBlogResponseSchema,
    PostBlogUpdateSchema,
)

router = APIRouter(tags=["Blog"])


@logger.catch
@router.get("/", response_model=list[PostBlogResponseSchema])
async def read_posts():
    posts = await read_posts_db()
    if posts is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )

    return posts


@logger.catch
@router.get("/{post_id}/", response_model=PostBlogResponseSchema)
async def read_post_by_id(
    post_id: str,
):
    if post_id is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return await read_post_by_id_db(post_id=post_id)


@logger.catch
@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=list[PostBlogResponseSchema],
)
async def create_post(
    post_in: PostBlogCreateSchema,
):
    if post_in is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    return await create_post_db(post_in=post_in)


@logger.catch
@router.patch("/{post_id}", response_model=PostBlogResponseSchema)
async def update_post(
    post_update: PostBlogUpdateSchema,
    post_id: str,
):
    if post_update is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    return await update_post_db(post_update=post_update, post_id=post_id)


@logger.catch
@router.delete(
    "/{post_id}",
)
async def delete_post(
    post_id: str,
):
    if post_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Url format wrong"},
        )
    return await delete_post_db(post_id=post_id)
