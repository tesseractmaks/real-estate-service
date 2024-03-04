import datetime
from datetime import datetime

from bson import ObjectId
from core import author_validator, blog_validator
from pymongo.mongo_client import MongoClient

uri = "mongodb://localhost:27017/"

client = MongoClient(uri)
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as exc:
    print(exc)

blog_db = client.blog


def create_post_collection(blog_db=blog_db):
    try:
        blog_db.create_collection("post")
    except Exception as exc:
        print(exc)
    blog_db.command("collMod", "post", validator=blog_validator)


def create_author_collection(blog_db=blog_db):
    try:
        blog_db.create_collection("author")
    except Exception as exc:
        print(exc)
    blog_db.command("collMod", "author", validator=author_validator)


def insert_test_bulk_data(blog_db=blog_db):
    author = {
        "first_name": "1gku",
        "last_name": "1gku"
    }
    author_id = blog_db.author.insert_one(author).inserted_id

    posts = [
        {
            "author": author_id,
            "content": "mustbea date andisrequired",
            "photo": "mustbea date andisrequired",
            "published": datetime.now(),
            "category": ["mustbea", "date", "andisrequired"],
            "comments": [
                {
                    "_id": ObjectId(),
                    "author": blog_db.author.find_one({"_id": author_id}, {"first_name": 1}),
                    "published": datetime.now(),
                    "content": "mustbea date,andisrequired",
                    "likes": 1,
                    "replay": [
                        {
                            "_id": ObjectId(),
                            "author": blog_db.author.find_one({"_id": author_id}, {"first_name": 1}),
                            "comment_id": ObjectId(),
                            "published": datetime.now(),
                            "content": "mustbea date,andisrequired",
                            "likes": 3,
                        },
                        {
                            "_id": ObjectId(),
                            "author": blog_db.author.find_one({"_id": author_id}, {"first_name": 1}),
                            "replay_id": ObjectId(),
                            "published": datetime.now(),
                            "content": "mustbea date,andisrequired",
                            "likes": 2,
                        }
                    ]
                },

            ],
            "tags": ["mustbea", "date", "andisrequired"],
            "views": 6,
            "likes": 2,
        },
    ]

    posts_collection = blog_db.post
    posts_collection.insert_many(posts)


create_author_collection()
create_post_collection()
insert_test_bulk_data()
