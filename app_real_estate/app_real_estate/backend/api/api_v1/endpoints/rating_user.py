from auth import get_current_active_user
from core import logger
from crud import create_rating_db, delete_rating_db, read_ratings_db, update_rating_db
from db import db_helper
from fastapi import APIRouter, Depends, HTTPException, status
from schemas import RatingSchema
from sqlalchemy.ext.asyncio import AsyncSession

from .depends_endps import rating_by_id

router = APIRouter(tags=["Ratings"])


@logger.catch
@router.get("/", response_model=list[RatingSchema])
async def read_ratings(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    current_user=Depends(get_current_active_user),
):
    rating = await read_ratings_db(session=session)
    if rating is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return rating


@logger.catch
@router.get("/{rating_id}/", response_model=RatingSchema)
async def read_rating_by_id(
    rating: RatingSchema = Depends(rating_by_id),
    current_user=Depends(get_current_active_user),
):
    if rating is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return rating


@logger.catch
@router.post("/", response_model=RatingSchema, status_code=status.HTTP_201_CREATED)
async def create_rating(
    rating_in: RatingSchema,
    current_user=Depends(get_current_active_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if rating_in is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    return await create_rating_db(session=session, rating_in=rating_in)


@logger.catch
@router.put("/{rating_id}", response_model=RatingSchema)
async def update_rating(
    rating_update: RatingSchema,
    rating: RatingSchema = Depends(rating_by_id),
    current_user=Depends(get_current_active_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if rating_update is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )

    return await update_rating_db(
        session=session, rating=rating, rating_update=rating_update
    )


@logger.catch
@router.delete("/{rating_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_rating(
    rating: RatingSchema = Depends(rating_by_id),
    current_user=Depends(get_current_active_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    if rating is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    await delete_rating_db(rating=rating, session=session)
