from typing import TYPE_CHECKING

from db import Base
from sqlalchemy import Column, ForeignKey, Integer, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy_utils import aggregated

if TYPE_CHECKING:
    from models import AssociateFeedback, User


class Profile(Base):
    users = relationship("User", uselist=False, back_populates="profile", lazy="joined")

    @aggregated('users_rating', Column(Integer, default=0))
    def rating_count(self):
        return func.count('1')

    users_rating: Mapped[list["AssociateRatings"]] = relationship(back_populates="profile")
    nickname: Mapped[str] = mapped_column(default="", server_default="")
    deals_count: Mapped[int] = mapped_column(nullable=True)
    phone: Mapped[str] = mapped_column(default="", server_default="")
    avatar: Mapped[str] = mapped_column(default="", server_default="")
    first_name: Mapped[str] = mapped_column(default="", server_default="")
    last_name: Mapped[str] = mapped_column(default="", server_default="")
    post: Mapped[int] = mapped_column(ForeignKey("posts.id"), nullable=True)
    posts = relationship("Post", back_populates="profiles")

    def __str__(self):
        return f"{self.nickname}, {self.last_name}, {self.nickname}"
