from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.core.database import Base


class Client(Base):

    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)

    first_name = Column(String)
    last_name = Column(String)

    phone = Column(String)

    notes = Column(Text, nullable=True)

    tags = Column(String, nullable=True)

    salon_id = Column(Integer, ForeignKey("salons.id"))