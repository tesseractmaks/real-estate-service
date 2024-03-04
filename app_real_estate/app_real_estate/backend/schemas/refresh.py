from datetime import datetime
from uuid import UUID, uuid4

from pydantic import BaseModel, ConfigDict, Field


class RefreshKeySchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID = Field(default_factory=uuid4)
    exp: datetime
    refresh: str
    sub: str | None = ""