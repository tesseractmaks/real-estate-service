from datetime import datetime

from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from sqlalchemy.ext.asyncio import AsyncSession

from auth import authenticate_user, create_token, get_refresh_token
from core import logger
from crud import delete_refresh_db, read_refresh_by_name_db
from db import db_helper
from schemas import Token

router = APIRouter(tags=["Token"])


@logger.catch
@router.post("/token/auth/logout")
async def logout_for_access_token(
        response: Response,
        session: AsyncSession = Depends(db_helper.scoped_session_dependency),
        refresh_token: str | None = Cookie(default=None),
):
    response.delete_cookie(
        "access_token", secure=True, domain="estate.tesseractmaks.tech"
    )
    response.delete_cookie(
        "refresh_token", secure=True, domain="estate.tesseractmaks.tech"
    )
    response.delete_cookie("user_id", secure=True, domain="estate.tesseractmaks.tech")

    refresh_token_clean = str(refresh_token).replace("Bearer ", "")
    refresh_key = await read_refresh_by_name_db(
        session=session, refresh_name=refresh_token_clean
    )

    await delete_refresh_db(session=session, refresh=refresh_key)
    return {"access_token": ""}


@logger.catch
@router.post("/token", response_model=Token)
async def login_for_access_token(
        response: Response,
        form_data: OAuth2PasswordRequestForm = Depends(),
        session: AsyncSession = Depends(db_helper.scoped_session_dependency),
):
    if form_data is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            headers={"X-Error": "Empty data"},
        )

    user = await authenticate_user(
        form_data.username,
        form_data.password,
        session=session,
    )

    access_token, refresh_token = await create_token(
        data={"sub": user.email},
        session=session,
        response=response,
    )

    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        secure=True,
        domain="estate.tesseractmaks.tech",
    )
    response.set_cookie(
        key="refresh_token",
        value=f"Bearer {refresh_token}",
        secure=True,
        domain="estate.tesseractmaks.tech",
        httponly=True,
    )
    response.set_cookie(
        key="user_id", secure=True, domain="estate.tesseractmaks.tech", value=user.id
    )
    SECRET_KEY = "$2b$12$cZmHQ5w9KXng0Q/XWCn4ReMfPh5JqwzpI6oaEY/XS1ERCHSbJceC."
    ALGORITHM = "HS256"
    jwt_access = jwt.decode(access_token, SECRET_KEY, algorithms=ALGORITHM)
    jwt_refresh = jwt.decode(refresh_token, SECRET_KEY, algorithms=ALGORITHM)
    access_token = datetime.utcfromtimestamp(int(jwt_access["exp"])).strftime(
        "%Y-%m-%d %H:%M:%S"
    )
    refresh_token = datetime.utcfromtimestamp(int(jwt_refresh["exp"])).strftime(
        "%Y-%m-%d %H:%M:%S"
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/token/refresh")
async def refresh_token(
        current_user=Depends(get_refresh_token),
        refresh_token: str | None = Cookie(default=None),
):
    return True
