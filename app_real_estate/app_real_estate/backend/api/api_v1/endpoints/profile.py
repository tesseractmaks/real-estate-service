import os
import shutil

from auth import get_current_active_user, get_refresh_token
from core import logger
from crud import (
    create_profile_db,
    delete_profile_db,
    read_profiles_db,
    update_profile_db,
)
from crud.profile import read_profile_by_id_user_db, update_photo_profile
from db import db_helper
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from schemas import (
    ProfileCreateSchema,
    ProfileResponseSchema,
    ProfileSchema,
    ProfileUpdatePartialSchema,
    ProfileUpdateSchema,
)
from sqlalchemy.ext.asyncio import AsyncSession

from .depends_endps import profile_by_id

router = APIRouter(tags=["Profiles"])


@logger.catch
@router.get("/", response_model=list[ProfileResponseSchema])
async def read_profiles(
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    profiles = await read_profiles_db(session=session)
    if profiles is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return profiles


@logger.catch
@router.get("/{profile_id}/", response_model=ProfileResponseSchema)
async def read_profile_by_id(
    refresh=Depends(get_refresh_token), profile: ProfileSchema = Depends(profile_by_id)
):
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return profile


@logger.catch
@router.get("/user_id", response_model=ProfileResponseSchema)
async def read_profile_by_user_id(
    user_id: int,
    refresh=Depends(get_refresh_token),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    profile = await read_profile_by_id_user_db(session=session, user_id=user_id)
    return profile


@logger.catch
@router.post("/", response_model=ProfileSchema, status_code=status.HTTP_201_CREATED)
async def create_profile(
    profile_in: ProfileCreateSchema,
    current_user=Depends(get_current_active_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if profile_in is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    return await create_profile_db(session=session, profile_in=profile_in)


@logger.catch
@router.patch("/upload/{profile_id}", status_code=status.HTTP_201_CREATED)
async def upload_photo_profile(
    profile: ProfileSchema = Depends(profile_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    photo: UploadFile = File(...),
):
    if photo is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    path_image_dir = f"img/users/{profile.id}/profile/avatar/"
    full_image_path = os.path.join(path_image_dir, photo.filename)

    if not os.path.exists(path_image_dir):
        os.makedirs(path_image_dir, exist_ok=True)

    file_name = full_image_path.replace(photo.filename, "profile.png")

    with open(file_name, "wb") as img:
        shutil.copyfileobj(photo.file, img)

    return await update_photo_profile(
        session=session,
        profile=profile,
        url_file=file_name,
    )


@logger.catch
@router.put("/{profile_id}", response_model=ProfileSchema)
async def update_profile(
    profile_update: ProfileUpdateSchema,
    profile: ProfileSchema = Depends(profile_by_id),
    current_user=Depends(get_current_active_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if profile_update is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    return await update_profile_db(
        session=session, profile=profile, profile_update=profile_update
    )


@logger.catch
@router.patch("/{profile_id}", response_model=ProfileSchema)
async def update_profile_partial(
    profile_update: ProfileUpdatePartialSchema,
    profile: ProfileSchema = Depends(profile_by_id),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if profile_update is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )
    return await update_profile_db(
        session=session, profile=profile, profile_update=profile_update, partial=True
    )


@logger.catch
@router.delete("/{profile_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_profile(
    profile: ProfileSchema = Depends(profile_by_id),
    current_user=Depends(get_current_active_user),
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> None:
    if profile is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    await delete_profile_db(profile=profile, session=session)
