from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)

    salon_id = Column(Integer, ForeignKey("salons.id"), index=True)

    name = Column(String, nullable=False)
    role = Column(String)
    phone = Column(String)

    salon = relationship("Salon")