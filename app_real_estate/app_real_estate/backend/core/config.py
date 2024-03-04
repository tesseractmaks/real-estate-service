import sys

import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from loguru import logger
load_dotenv()


class Setting(BaseSettings):
    db_url: str = f"postgresql+asyncpg://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_HOST')}:5432/estate_db"
    api_v1_prefix: str = "/api/v1"
    db_username: str = "estate"
    db_password: str = "qwerty"
    db_name: str = "estate_db"
    db_echo: bool = True


settings = Setting()


logger.add(
    sys.stdout,
    format="{time} {level} {message}",
    level="ERROR",
    serialize=True,
    backtrace=True,
    diagnose=True,
)