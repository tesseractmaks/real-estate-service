import json
import re
from datetime import datetime

from bson import ObjectId
from db import blog_db
from schemas import (
    CommentAllSchema,
    CommentBlogCreateSchema,
    CommentBlogResponseSchema,
    CommentSchema,
    CommentUpdateSchema,
    PostBlogCreateSchema,
    PostBlogSchema,
    PostBlogUpdateSchema,
)


async def parse_to_obj(collect):
    step_1 = re.sub(r"(ObjectId\()", "", str(collect))
    step_2 = re.sub(r"('\),\s)", "', ", step_1)
    step_3 = re.sub(r"('\))", "'", step_2)
    str_obj = re.sub(r"'", '"', step_3)

    stud_obj = json.loads(str_obj)
    json_obj = json.dumps(stud_obj)
    collection = json.loads(json_obj)
    return collection


async def create_comment_db(
    comment_in: CommentBlogCreateSchema, post_id: str
) -> CommentBlogResponseSchema:
    comment_collection = blog_db.post
    comment = {
        "_id": str(ObjectId()),
        "author": dict(comment_in.author),
        "post_id": post_id,
        "published": str(datetime.now()),
        "content": comment_in.content,
        "replay_comments": [],
    }

    comment_new = blog_db.post.find_one_and_update(
        {"_id": ObjectId(post_id)}, {"$push": {"comments": comment}}
    )
    comment_collection.insert_one(comment)
    comment_response = await parse_to_obj(comment_new)
    return comment_response


async def update_comment_db(
    comment_update: CommentUpdateSchema,
    post_id: str,
    comment_id: str,
    replay: bool = False,
) -> CommentSchema:
    get_post = blog_db.post.find_one({"_id": ObjectId(post_id)})
    for comment in get_post["comments"]:
        if replay:
            if comment["replay_comments"] == []:
                comment["replay_comments"].append(dict(comment_update))
                blog_db.post.find_one_and_update(
                    {"_id": ObjectId(post_id)}, {"$set": get_post}
                )
                comment_response = await parse_to_obj(get_post)
                return comment_response
            else:
                for comment in comment["replay_comments"]:
                    if str(comment["comment_id"]) == str(comment_id):
                        comment["replay_comments"].append(dict(comment_update))
                        blog_db.post.find_one_and_update(
                            {"_id": ObjectId(post_id)}, {"$set": get_post}
                        )
                        comment_response = await parse_to_obj(get_post)
                        return comment_response
        if str(comment["_id"]) == str(comment_id):
            updated_model = CommentUpdateSchema.parse_obj(comment_update)
            data = updated_model.dict(exclude_unset=True)
            comment.update(data)
            blog_db.post.find_one_and_update(
                {"_id": ObjectId(post_id)}, {"$set": get_post}
            )
            comment_response = await parse_to_obj(get_post)
            return comment_response


async def delete_comment_db(
    post_id: str,
    comment_id: str,
) -> str:
    get_post = blog_db.post.find_one({"_id": ObjectId(post_id)})
    for comment in get_post["comments"]:
        if comment["_id"] == str(comment_id):
            get_post["comments"].remove(comment)

    blog_db.post.find_one_and_update({"_id": ObjectId(post_id)}, {"$set": get_post})
    return "Delete"
