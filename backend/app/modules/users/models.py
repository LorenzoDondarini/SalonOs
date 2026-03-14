from sqlalchemy import Column,Integer,String,ForeignKey
from app.core.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer,primary_key=True,index=True)

    salon_id = Column(Integer,ForeignKey("salons.id"))

    name = Column(String)

    email = Column(String)

    password = Column(String)