import json
import os
import random
from datetime import datetime

import asyncpg
from pymongo.mongo_client import MongoClient
from sqlalchemy import insert, inspect

from .base_class import Base
from .db_helper import db_helper


async def connect_create_if_exist(user, password, db_name):
    sys_conn = await asyncpg.connect(user=user, password=password, host="127.0.0.1")
    try:
        await asyncpg.connect(
            user=user, password=password, host="127.0.0.1", database=db_name
        )
    except asyncpg.InvalidCatalogNameError:
        await sys_conn.execute(f"CREATE DATABASE {db_name} OWNER {user}")
    finally:
        await sys_conn.close()


async def init_db():
    async with db_helper.engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        tables = await conn.run_sync(
            lambda sys_conn: inspect(sys_conn).get_table_names()
        )
        if not tables:
            await conn.run_sync(Base.metadata.create_all)
    await add_test_post_data()
    await add_test_profile_data()
    await add_test_user_data()
    await add_test_categories_data()
    await add_test_profile_data()
    await add_test_property_data()


async def add_test_post_data():
    from models import Post

    async with db_helper.engine.begin() as conn:
        for _ in range(1, 4):
            values_data = {"title": "string"}
            await conn.execute(insert(Post).values(values_data))
        await conn.commit()


async def add_test_categories_data():
    from models import Category

    async with db_helper.engine.begin() as conn:
        for i in ["flat", "house"]:
            values_data = {"title": i}
            await conn.execute(insert(Category).values(values_data))
        await conn.commit()


async def add_test_profile_data():
    from models import Profile

    async with db_helper.engine.begin() as conn:
        for i in range(1, 4):
            values_data = {
                "rating_count": i,
                "nickname": "string",
                "deals_count": 0,
                "phone": "string",
                "avatar": "/src/img/author.jpg",
                "first_name": "string",
                "last_name": "string",
                "post": 1,
            }
            await conn.execute(insert(Profile).values(values_data))
        await conn.commit()


async def add_test_user_data():
    from models import AppRole, User

    async with db_helper.engine.begin() as conn:
        for i in range(1, 4):
            values_data = {
                "profile_id": i,
                "email": f"one{i}@mail.ru",
                "password": "$2b$12$ApY3jQ1m3FyNmJ305FHcqufutbf0cVV5oOUWIXgp7TakmlY.d21bC",
                "is_active": True,
                "roles": [AppRole.ROLE_USER],
            }
            if i == 1:
                values_data["roles"].extend(
                    [AppRole.ROLE_SUPER_ADMIN, AppRole.ROLE_ADMIN]
                )
            await conn.execute(insert(User).values(values_data))
        await conn.commit()


async def add_test_property_data():
    from models import Property

    async with db_helper.engine.begin() as conn:
        for _ in range(1, 160):
            values_data = {
                "agent_id": 1,
                "category_id": random.randint(1, 2),
                "street": "string",
                "city": random.choice(
                    [
                        "Moscow",
                        "Saint Petersburg",
                        "Tula",
                        "Kursk",
                        "Omsk",
                        "Tver",
                        "Oryol",
                    ]
                ),
                "state": random.choice(["Moscow area", "Leningradskaya", "Tulskaya"]),
                "country": "string",
                "postal_code": 0,
                "price": random.randint(10000, 80000),
                "photo": [
                    "/src/img/single-list-slider/2.jpg",
                    "/src/img/single-list-slider/3.jpg",
                    "/src/img/single-list-slider/4.jpg",
                    "/src/img/single-list-slider/5.jpg",
                    "/src/img/single-list-slider/3.jpg",
                    "/src/img/single-list-slider/4.jpg",
                ],
                "photo_plan": [
                    "/src/img/plan-sketch.jpg",
                    "/src/img/plan-sketch.jpg",
                    "/src/img/plan-sketch.jpg",
                ],
                "status": random.choice(["sale", "rent"]),
                "house_area": random.randint(50, 800),
                "bedrooms": random.randint(1, 6),
                "garages": 2,
                "bathrooms": 3,
                "time_published": datetime.now(),
                "age": random.randint(1, 16),
                "communicate": "string",
                "description": "string",
                "first_floor_area": 10,
                "second_floor_area": 10,
                "third_floor_area": 10,
                "video": "string",
                "map": "string",
            }

            await conn.execute(insert(Property).values(values_data))
        await conn.commit()


uri = "mongodb://mongo:27017/"

client = MongoClient(uri)
try:
    client.admin.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as exc:
    print(exc)


estate_db = client.estate
blog_db = client.blog


def create_post_collection(blog_db=blog_db):
    try:
        blog_db.create_collection("post")
    except Exception as exc:
        print(exc)


def create_author_collection(blog_db=blog_db):
    try:
        blog_db.create_collection("author")
    except Exception as exc:
        print(exc)


def insert_data(filename):
    with open(filename) as file:
        data = json.load(file)
    main_collection = estate_db.main
    main_collection.insert_one(data)


def create_main_collection():
    try:
        estate_db.create_collection("main")
    except Exception as exc:
        print(exc)
    filename = os.path.relpath("db/main_site.json")
    insert_data(filename)


create_main_collection()


def insert_test_bulk_data(blog_db=blog_db):
    author = {"first_name": "1gku", "last_name": "1gku"}
    author_id = blog_db.author.insert_one(author).inserted_id
    posts = [
        {
            "author": blog_db.author.find_one({"_id": author_id}),
            "content": "mustbea date andisrequired",
            "photo": "mustbea date andisrequired",
            "published": str(datetime.now()),
            "category": ["mustbea", "date", "andisrequired"],
            "comments": [],
            "tags": ["mustbea", "date", "andisrequired"],
            "views": 6,
            "likes": 2,
        },
    ]
    posts_collection = blog_db.post
    posts_collection.insert_many(posts)


def insert_test_data(filename):
    with open(filename) as file:
        data = json.load(file)
    main_collection = blog_db.main
    main_collection.insert_one(data)
