from typing import TYPE_CHECKING

from db import Base
from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from models import Profile, User


class AssociateRatings(Base):
    __tablename__ = "associate_ratings"
    __table_args__ = (UniqueConstraint("user_id", "profile_id", name="idx_unique_u_p"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    profile_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))

    profile: Mapped["Profile"] = relationship(back_populates="users_rating")
    user: Mapped["User"] = relationship(back_populates="ratings")


class ReceivingRating(Base):
    __tablename__ = "receiving_ratings"

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

    def __str__(self):
        return f"{self.user_id}, {self.profile_id}"
