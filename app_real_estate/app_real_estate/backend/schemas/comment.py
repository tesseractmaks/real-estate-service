from datetime import datetime
from bson import ObjectId
from pydantic import BaseModel, Field


class AuthorSchema(BaseModel):
    id: str | ObjectId = Field(alias="_id")
    first_name: str
    last_name: str

    class Config:
        from_attributes = True
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class CommentReplaySchema(BaseModel):
    id: str
    author: AuthorSchema
    post_id: str | None = None
    comment_id: str | None = None
    content: str | None = None
    published: str | None = str(datetime.now())
    likes: int | None = 0
    replay_comments: list | None = []

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "author": {
                        "_id": "str",
                        "first_name": "some name",
                        "last_name": "some last name"
                    },
                    "_id": "str",
                    "comment_id": "str",
                    "published": str(datetime.now()),
                    "content": "some text",
                    "likes": 3
                }
            ]
        }

    }


class CommentSchema(BaseModel):
    author: AuthorSchema
    post_id: str | None = None
    content: str | None = None
    replay_comments: list[CommentReplaySchema] | None = []

    class Config:
        from_attributes = True
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

        model_config = {
            "json_schema_extra": {
                "examples": [
                    {
                        "comments": [
                            {
                                "author": {
                                    "_id": "str",
                                    "first_name": "some name",
                                    "last_name": "some last name"
                                },
                                "post_id": "str",
                                "published": str(datetime.now()),
                                "content": "some text",
                                "likes": 1,
                            }
                        ]
                    }
                ]
            }
        }


class CommentAllSchema(CommentSchema):
    id: str | ObjectId = Field(alias="_id")
    replay_comments: list[CommentReplaySchema] = []


class CommentBlogCreateSchema(CommentSchema):
    ...
    

class CommentBlogResponseSchema(CommentSchema):
    id: str | ObjectId = Field(alias="_id", default=None)
    published: str | None = str(datetime.now())
    likes: int | None = 0


class CommentUpdateSchema(CommentSchema):
    id: str | ObjectId = Field(alias="_id", default=str(ObjectId()))
    author: AuthorSchema | None = None
    post_id: str | None = None
    comment_id: str | None = None
    published: str | None = str(datetime.now())
    content: str | None = None
    replay_comments: list[CommentReplaySchema] | None = []
