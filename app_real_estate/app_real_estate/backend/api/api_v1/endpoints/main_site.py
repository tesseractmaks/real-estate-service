from core import logger
from crud import read_data_one_db
from fastapi import APIRouter, HTTPException, status

router = APIRouter(tags=["MainSite"])


@logger.catch
@router.get("/")
async def read_data():
    data_one = await read_data_one_db()
    if data_one is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            headers={"X-Error": "Url format wrong"},
        )
    return data_one
