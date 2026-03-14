from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)

    salon_id = Column(Integer, ForeignKey("salons.id"), index=True)

    name = Column(String, nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

    description = Column(String)

    salon = relationship("Salon")