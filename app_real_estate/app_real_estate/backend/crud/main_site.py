import json
import re

from db import estate_db


async def pasre_to_obj(collect):
    step_1 = re.sub(r"(ObjectId\()", "", str(collect))
    step_2 = re.sub(r"('\),\s)", "', ", step_1)
    step_3 = re.sub(r"('\))", "'", step_2)
    str_obj = re.sub(r"'", '"', step_3)

    stud_obj = json.loads(str_obj)
    json_obj = json.dumps(stud_obj)
    collection = json.loads(json_obj)
    return collection


async def read_data_db() -> list:
    collect = estate_db.main.find()
    return list(collect)


async def read_data_one_db():
    collect = estate_db.main.find_one()
    result = await pasre_to_obj(collect)
    return result
