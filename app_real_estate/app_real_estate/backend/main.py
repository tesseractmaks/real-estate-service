from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.exception_handlers import request_validation_exception_handler
from fastapi.exceptions import RequestValidationError, ResponseValidationError
from prometheus_fastapi_instrumentator import Instrumentator
from starlette.middleware.cors import CORSMiddleware
from redis import asyncio as aioredis
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
import sentry_sdk

from api import router as router_v1
from api import router_token
from core import logger, settings
from db import init_db

sentry_sdk.init(
    dsn="https://0b050ce8d333b94538d08673c18eafe4@o4505432482316288.ingest.sentry.io/4506850627158016",
    traces_sample_rate=1.0,
    profiles_sample_rate=1.0,
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    redis = aioredis.from_url("redis://redis_estate:6379")
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
    yield


app = FastAPI(lifespan=lifespan)
Instrumentator().instrument(app).expose(app)


@logger.catch
@app.exception_handler(ResponseValidationError)
async def validation_exception_handler(request, exc):
    logger.error(exc)
    return await request_validation_exception_handler(request, exc)


@logger.catch
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    logger.error(exc)
    return await request_validation_exception_handler(request, exc)


app.include_router(router=router_v1, prefix=settings.api_v1_prefix)
app.include_router(router=router_token)

origins = [
    "estate.tesseractmaks.tech",
    "estate.tesseractmaks.tech/",
    "https://estate.tesseractmaks.tech",
    "https://estate.tesseractmaks.tech/",
    "/",
    "http://estate.tesseractmaks.tech/",
    "http://estate.tesseractmaks.tech",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "PUT", "OPTIONS", "HEAD", "PATCH", "POST", "DELETE"],
    allow_headers=["*"],
)
