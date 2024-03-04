from sqlalchemy.orm import Mapped, relationship

from db import Base


class Category(Base):
    __tablename__ = "categories"
    title: Mapped[str] # APARTMENT, FAMILY HOME, RESORT VILLAS, OFFICE BUILDING
    properties = relationship("Property", back_populates="categories")

    def __str__(self):
        return f"{self.title}"
