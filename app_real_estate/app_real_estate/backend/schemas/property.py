from datetime import datetime

from pydantic import BaseModel, ConfigDict

from .user import UserResponseSchema


class CitiesSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    cities: list[tuple]


class CategorySchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    title: str


class PropertySchema(BaseModel):
    model_config = ConfigDict(extra="allow", from_attributes=True)
    agent_id: int | None = None
    category_id: int
    street: str | None = None
    city: str | None = None
    state: str | None = None
    country: str | None = None
    postal_code: int | None = 0
    price: int | None = 0
    photo: list[str] | None = None
    photo_plan: list[str] | None = None
    status: str | None = None
    house_area: int | None = 0
    bedrooms: int | None = 0
    garages: int | None = 0
    bathrooms: int | None = 0
    time_published: datetime = None
    age: int | None = 0
    communicate: str | None = None
    description: str | None = None
    first_floor_area: int | None = 0
    second_floor_area: int | None = 0
    third_floor_area: int | None = 0
    video: str | None = None
    map: str | None = None


class PropertyResponseSchema(PropertySchema):
    model_config = ConfigDict(from_attributes=True)
    users: UserResponseSchema
    categories: CategorySchema
    id: int


class PropertyCreateSchema(PropertySchema): ...


class PropertyUpdateSchema(PropertySchema): ...


class PropertyUpdatePartialSchema(PropertySchema):
    model_config = ConfigDict(from_attributes=True)
    id: int | None = None
    agent_id: int | None = None
    category_id: int | None = None
