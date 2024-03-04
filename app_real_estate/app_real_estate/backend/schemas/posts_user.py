from pydantic import BaseModel, ConfigDict


class PostSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str | None = None


class PostCreateSchema(PostSchema):
    ...


class PostUpdateSchema(PostSchema):
    ...


class PostUpdatePartialSchema(PostSchema):
    title: str | None = None
