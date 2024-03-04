from pydantic import BaseModel, ConfigDict

from models import AppRole


class ProfileSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    user_id: int | None = None
    rating_count: int | None = 0
    nickname: str | None = None
    deals_count: int | None = None
    phone: str | None = None
    avatar: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    post: int | None = None


class UserSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    email: str
    password: str
    is_active: bool


class UserProfileSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    email: str
    id: int


class UserResponseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    email: str
    roles: list[str] = [AppRole.ROLE_USER]
    profile: ProfileSchema


class UserCreateSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    email: str
    password: str
    is_active: bool
    roles: list[str] = [AppRole.ROLE_USER]


class UserUpdateSchema(UserSchema):
    ...


class UserUpdatePartialSchema(UserSchema):
    model_config = ConfigDict(from_attributes=True)
    email: str | None = None
    password: str | None = None
    is_active: bool | None = None
    roles: list[AppRole] | None = None
    id: int | None = None


class UserInDB(UserSchema):
    model_config = ConfigDict(from_attributes=True)
    password: str
