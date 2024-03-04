from enum import Enum
from typing import TYPE_CHECKING

from db import Base
from sqlalchemy import ForeignKey, String
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from models import AssociateFeedback, AssociateRatings, Profile


class AppRole(str, Enum):
    ROLE_USER = "ROLE_USER"
    ROLE_ADMIN = "ROLE_ADMIN"
    ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN"


class User(Base):
    __tablename__ = "users"

    email: Mapped[str]
    password: Mapped[str]
    is_active: Mapped[bool]
    roles: Mapped[ARRAY] = mapped_column(ARRAY(String), default=[AppRole.ROLE_USER])

    profile_id: Mapped[int] = mapped_column(
        ForeignKey("profiles.id", ondelete="CASCADE"), nullable=True
    )

    profile = relationship(
        "Profile", uselist=False, back_populates="users", lazy="joined"
    )

    properties = relationship("Property", back_populates="users", lazy="joined")

    ratings: Mapped[list["AssociateRatings"]] = relationship(back_populates="user")

    @property
    def is_super_admin(self):
        return AppRole.ROLE_SUPER_ADMIN in self.roles

    @property
    def is_admin(self):
        return AppRole.ROLE_ADMIN in self.roles

    def add_admin_privileges_to_model(self):
        if not self.is_admin:
            return {*self.roles, AppRole.ROLE_ADMIN}

    def remove_admin_privileges_from_model(self):
        if self.is_admin:
            return {role for role in self.roles if role != AppRole.ROLE_ADMIN}
