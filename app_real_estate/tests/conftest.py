from datetime import datetime, timedelta
from typing import Any, AsyncGenerator

import pytest
import pytest_asyncio
from app_real_estate.core import settings
from app_real_estate.db import Base, db_helper
from app_real_estate.main import app
from httpx import AsyncClient
from jose import jwt
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.pool import NullPool

SECRET_KEY = "$2b$12$cZmHQ5w9KXng0Q/XWCn4ReMfPh5JqwzpI6oaEY/XS1ERCHSbJceC."
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 5
REFRESH_TOKEN_EXPIRE_MINUTES = 20
engine_test = create_async_engine(settings.test_db_url, poolclass=NullPool)
async_session_maker = async_sessionmaker(
    bind=engine_test, class_=AsyncSession, expire_on_commit=False
)


async def override_get_async_session() -> AsyncGenerator[AsyncSession, Any]:
    async with async_session_maker() as session:
        yield session


app.dependency_overrides[db_helper.scoped_session_dependency] = (
    override_get_async_session
)


@pytest_asyncio.fixture(autouse=True, scope="session")
async def init_test_db():
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest_asyncio.fixture
async def client() -> AsyncGenerator[AsyncClient, None]:
    async with AsyncClient(
        app=app, base_url="http://127.0.0.1:8000/api/v1/", follow_redirects=True
    ) as ac:
        yield ac


@pytest.fixture
def anyio_backend():
    return "asyncio"


@pytest_asyncio.fixture
async def create_token(
    client: AsyncClient,
    data={"sub": "one@mail.ru1"},
):
    tokens = {
        "access_expires": timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        "refresh_expires": timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES),
    }

    access_to_encode = data.copy()
    refresh_to_encode = data.copy()

    expire_access = datetime.utcnow() + tokens["access_expires"]
    expire_refresh = datetime.utcnow() + tokens["refresh_expires"]

    access_to_encode.update({"exp": expire_access})
    jwt_access = jwt.encode(access_to_encode, SECRET_KEY, algorithm=ALGORITHM)

    refresh_to_encode.update({"exp": expire_refresh})
    jwt_refresh = jwt.encode(refresh_to_encode, SECRET_KEY, algorithm=ALGORITHM)
    values_data = {"access_token": "string", "token_type": "string"}
    return jwt_refresh
