from typing import TYPE_CHECKING

from db import Base
from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from models import Profile, User


class AssociateFeedback(Base):
    __tablename__ = "associate_feedbacks"

    __table_args__ = (
        UniqueConstraint("user_id", "profile_id", name="idx_unique_feedbacks"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    profile_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    text: Mapped[str] = mapped_column(default="", server_default="")
    user: Mapped["User"] = relationship(back_populates="profiles")
    profile: Mapped["Profile"] = relationship(back_populates="users_feed")
