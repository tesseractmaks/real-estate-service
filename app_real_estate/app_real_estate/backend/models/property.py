from datetime import datetime

from db import Base
from sqlalchemy import ForeignKey, String, func
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Property(Base):
    __tablename__ = "properties"

    agent_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=True)
    users = relationship("User", back_populates="properties", lazy="joined")
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), nullable=True)
    categories = relationship("Category", back_populates="properties")
    street: Mapped[str] = mapped_column(default="", server_default="")
    city: Mapped[str] = mapped_column(default="", server_default="")
    state: Mapped[str] = mapped_column(default="", server_default="")
    country: Mapped[str] = mapped_column(default="", server_default="")
    postal_code: Mapped[int] = mapped_column(nullable=True)
    price: Mapped[int] = mapped_column(nullable=True)
    photo: Mapped[list | None] = mapped_column(ARRAY(String))
    photo_plan: Mapped[list | None] = mapped_column(ARRAY(String))
    status: Mapped[str] = mapped_column(default="", server_default="")
    house_area: Mapped[int] = mapped_column(nullable=True)
    bedrooms: Mapped[int] = mapped_column(nullable=True)
    garages: Mapped[int] = mapped_column(nullable=True)
    bathrooms: Mapped[int] = mapped_column(nullable=True)
    time_published: Mapped[datetime] = mapped_column(
        default=datetime.now, server_default=func.now()
    )
    age: Mapped[int] = mapped_column(nullable=True)
    communicate: Mapped[str] = mapped_column(default="", server_default="")
    description: Mapped[str] = mapped_column(default="", server_default="")
    first_floor_area: Mapped[int] = mapped_column(nullable=True)
    second_floor_area: Mapped[int] = mapped_column(nullable=True)
    third_floor_area: Mapped[int] = mapped_column(nullable=True)
    video: Mapped[str] = mapped_column(default="", server_default="")
    map: Mapped[str] = mapped_column(default="", server_default="")

    def __str__(self):
        return f"{self.city}"
