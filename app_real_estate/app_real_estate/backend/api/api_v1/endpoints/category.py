from auth import get_current_active_user
from core import logger
from crud import (
    create_category_db,
    delete_category_db,
    read_categories_db,
    update_category_db,
)
from db import db_helper
from fastapi import APIRouter, Depends, HTTPException, status
from schemas import (
    CategoryCreateSchema,
    CategorySchema,
    CategoryUpdatePartialSchema,
    CategoryUpdateSchema,
)
from sqlalchemy.ext.asyncio import AsyncSession

from .depends_endps import category_by_id

router = APIRouter(tags=["Categories"])


@logger.catch
@router.get("/", response_model=list[CategorySchema])
async def read_categories(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    current_user=Depends(get_current_active_user),
):
    categories = await read_categories_db(session=session)
    if categories is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return categories


@logger.catch
@router.get("/{category_id}/", response_model=CategorySchema)
async def read_category_by_id(
    current_user=Depends(get_current_active_user),
    category: CategorySchema = Depends(category_by_id),
):
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return category


@logger.catch
@router.post("/", response_model=CategorySchema, status_code=status.HTTP_201_CREATED)
async def create_category(
    category_in: CategoryCreateSchema,
    current_user=Depends(get_current_active_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if category_in is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return await create_category_db(session=session, category_in=category_in)


@logger.catch
@router.put("/{category_id}", response_model=CategorySchema)
async def update_category(
    category_update: CategoryUpdateSchema,
    current_user=Depends(get_current_active_user),
    category: CategorySchema = Depends(category_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if category_update is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return await update_category_db(
        session=session, category=category, category_update=category_update
    )


@logger.catch
@router.patch("/{category_id}", response_model=CategorySchema)
async def update_category_partial(
    category_update: CategoryUpdatePartialSchema,
    current_user=Depends(get_current_active_user),
    category: CategorySchema = Depends(category_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if category_update is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return await update_category_db(
        session=session,
        category=category,
        category_update=category_update,
        partial=True,
    )


@logger.catch
@router.delete("/{category_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_category(
    category: CategorySchema = Depends(category_by_id),
    current_user=Depends(get_current_active_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    await delete_category_db(category=category, session=session)
