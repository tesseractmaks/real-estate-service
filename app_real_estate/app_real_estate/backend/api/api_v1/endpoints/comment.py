from fastapi import APIRouter, HTTPException, status

from core import logger
from crud import create_comment_db, delete_comment_db, update_comment_db
from schemas import (
    CommentBlogCreateSchema,
    CommentBlogResponseSchema,
    CommentUpdateSchema,
)

router = APIRouter(tags=["Comment"])


@logger.catch
@router.post(
    "/{post_id}",
    status_code=status.HTTP_201_CREATED,
    response_model=CommentBlogResponseSchema,
)
async def create_comment(
    comment_in: CommentBlogCreateSchema,
    post_id: str,
):
    if comment_in is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return await create_comment_db(post_id=post_id, comment_in=comment_in)


@logger.catch
@router.put(
    "/replay/{post_id}/{comment_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=CommentBlogResponseSchema,
)
async def update_replay_comment(
    comment_update: CommentUpdateSchema,
    post_id: str,
    comment_id: str,
):
    if comment_update is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    comment_update.author = comment_update.author.__dict__
    return await update_comment_db(
        comment_update=comment_update,
        post_id=post_id,
        comment_id=comment_id,
        replay=True,
    )


@logger.catch
@router.patch(
    "/{post_id}/{comment_id}",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=CommentBlogResponseSchema,
)
async def update_comment(
    comment_update: CommentUpdateSchema,
    post_id: str,
    comment_id: str,
):
    if comment_update is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return await update_comment_db(
        comment_update=comment_update, post_id=post_id, comment_id=comment_id
    )


@logger.catch
@router.delete(
    "/{post_id}/{comment_id}",
)
async def delete_comment(
    post_id: str,
    comment_id: str,
):
    if comment_id or post_id is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return await delete_comment_db(comment_id=comment_id, post_id=post_id)
