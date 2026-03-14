from sqlalchemy import Column,Integer,ForeignKey,DateTime,String
from sqlalchemy.orm import relationship

from app.core.database import Base


class Appointment(Base):

    __tablename__ = "appointments"

    id = Column(Integer,primary_key=True,index=True)

    salon_id = Column(Integer,ForeignKey("salons.id"))

    client_id = Column(Integer,ForeignKey("clients.id"))
    user_id = Column(Integer,ForeignKey("team.id"))
    service_id = Column(Integer,ForeignKey("services.id"))

    start_time = Column(DateTime)
    end_time = Column(DateTime)

    status = Column(String,default="booked")