from pydantic import BaseModel


class RatingSchema(BaseModel):
    user_id: int | None = None
    profile_id: int | None = None