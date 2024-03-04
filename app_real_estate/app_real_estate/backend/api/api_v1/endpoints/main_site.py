from core import logger
from crud import read_data_one_db
from fastapi import APIRouter, HTTPException, status
from fastapi_cache.decorator import cache

router = APIRouter(tags=["MainSite"])


@logger.catch
@router.get("/")
@cache(expire=120)
async def read_data():
    data_one = await read_data_one_db()
    if data_one is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return data_one
