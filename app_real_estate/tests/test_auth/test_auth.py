from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from jose import jwt

from app_real_estate.models import User, AppRole
from app_real_estate.schemas import UserSchema, TokenData, UserInDB
from ..conftest import async_session_maker, create_token

from sqlalchemy.ext.asyncio import AsyncResult
import pytest

from passlib.context import CryptContext
from sqlalchemy import select

SECRET_KEY = "$2b$12$cZmHQ5w9KXng0Q/XWCn4ReMfPh5JqwzpI6oaEY/XS1ERCHSbJceC."
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 5
REFRESH_TOKEN_EXPIRE_MINUTES = 20

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
test_refresh = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmVAbWFpbC5ydTEiLCJleHAiOjE3MDUyMjgxNjJ9.zFTCi1nlYJEJvHYg5XV7kpK1Nd_Z3dgaOlslxWStpZI"


async def read_user_by_username_db(username):
    async with async_session_maker() as session:
        stmt = select(User).where(User.email == username)
        result: AsyncResult = await session.execute(stmt)
        user = result.scalar()
        return user


@pytest.mark.anyio
async def test_authenticate_user(
) -> UserSchema | bool:
    user = await read_user_by_username_db(username="one@mail.ru1")
    assert user


@pytest.mark.anyio
async def test_check_refresh(create_token) -> bool:
    refresh_token = jwt.decode(create_token, SECRET_KEY, algorithms=[ALGORITHM])
    if refresh_token["exp"]:
        assert True


@pytest.mark.anyio
async def test_get_username(create_token):
    refresh_token = create_token
    refresh_token_clean = refresh_token.replace("Bearer ", "")
    payload = jwt.decode(refresh_token_clean, SECRET_KEY, algorithms=[ALGORITHM])
    username: str = payload.get("sub")
    assert username == "one@mail.ru1"


@pytest.mark.anyio
async def test_get_current_active_user(username: UserSchema = "one@mail.ru1"):
    current_user = await read_user_by_username_db(username=username)
    assert current_user.is_active


@pytest.mark.anyio
async def test_get_current_active_user_admin(
        username: UserSchema = "one@mail.ru1"):
    current_user = await read_user_by_username_db(username=username)
    assert current_user.roles


@pytest.mark.anyio
async def test_verify_password():
    hashed_password = pwd_context.hash("qwerty")
    assert pwd_context.verify("qwerty", hashed_password)


@pytest.mark.anyio
async def test_create_token(
        data={"sub": "one@mail.ru1"}):
    tokens = {
        "access_expires": timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        "refresh_expires": timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    }

    access_to_encode = data.copy()
    refresh_to_encode = data.copy()

    expire_access = datetime.utcnow() + tokens["access_expires"]
    expire_refresh = datetime.utcnow() + tokens["refresh_expires"]

    access_to_encode.update({"exp": expire_access})
    jwt_access = jwt.encode(access_to_encode, SECRET_KEY, algorithm=ALGORITHM)

    refresh_to_encode.update({"exp": expire_refresh})
    jwt_refresh = jwt.encode(refresh_to_encode, SECRET_KEY, algorithm=ALGORITHM)

    assert jwt_access
    assert jwt_refresh
    payload = jwt.decode(jwt_refresh, SECRET_KEY, algorithms=[ALGORITHM])
    assert payload.get("sub") == "one@mail.ru1"


