from pydantic import BaseModel, ConfigDict

from models import AppRole


class UserProfileSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    email: str
    id: int
    roles: list[str] = [AppRole.ROLE_USER]


class ProfileSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    rating_count: int | None = 0
    nickname: str | None = None
    deals_count: int | None = None
    phone: str | None = None
    avatar: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    post: int | None = None


class ProfileResponseSchema(ProfileSchema):
    model_config = ConfigDict(from_attributes=True)
    id: int
    users: UserProfileSchema


class ProfileCreateSchema(ProfileSchema):
    ...


class ProfileUpdateSchema(ProfileSchema):
    ...


class ProfileUpdatePartialSchema(ProfileSchema):
    model_config = ConfigDict(from_attributes=True)
    ...
