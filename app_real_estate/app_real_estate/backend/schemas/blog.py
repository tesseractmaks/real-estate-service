from datetime import datetime

from bson import ObjectId
from pydantic import BaseModel, Field
from schemas.comment import CommentAllSchema


class AuthorSchema(BaseModel):
    id: str | ObjectId = Field(alias="_id")
    first_name: str
    last_name: str

    class Config:
        from_attributes = True
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class PostBlogSchema(BaseModel):
    author: AuthorSchema
    content: str
    photo: str | None = None
    published: str | None = str(datetime.now())
    category: list[str] | None = None
    tags: list[str] | None = None
    comments: list[CommentAllSchema] = []

    class Config:
        from_attributes = True
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

        model_config = {
            "json_schema_extra": {
                "examples": [
                    {
                        "author": {
                            "id": "655376e5807668698d9acf8d",
                            "first_name": "some name",
                            "last_name": "some last name"
                        },
                        "content": "some text",
                        "photo": "some link",
                        "category": ["some text", "some text", "some text"],
                        "tags": ["some text", "some text", "some text"],
                    },
                ]
            }
        }


class PostBlogResponseSchema(PostBlogSchema):
    id: str | ObjectId = Field(alias="_id")

    class Config:
        from_attributes = True
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class PostBlogCreateSchema(PostBlogSchema):
    ...


class PostBlogUpdateSchema(PostBlogSchema):
    author: AuthorSchema | None = None
    content: str | None = None
    photo: str | None = None
    published: str | None = str(datetime.now())
    category: list[str] | None = None
    tags: list[str] | None = None
