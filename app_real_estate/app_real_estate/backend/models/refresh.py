import uuid
from datetime import datetime

from db import Base
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column


class RefreshKey(Base):
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    exp: Mapped[datetime]
    refresh: Mapped[str]
    sub: Mapped[str]

    def __str__(self):
        return f"{self.__class__.__name__}, id={self.id}, exp={self.exp}, refresh={self.exp}, sub={self.sub}"

    def __repr__(self):
        return str(self)
