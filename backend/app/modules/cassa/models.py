from sqlalchemy import Column,Integer,Float,ForeignKey,DateTime
from datetime import datetime

from app.core.database import Base


class Payment(Base):

    __tablename__ = "payments"

    id = Column(Integer,primary_key=True,index=True)

    appointment_id = Column(Integer,ForeignKey("appointments.id"))

    amount = Column(Float)

    created_at = Column(DateTime,default=datetime.utcnow)