from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    salon_id = Column(Integer, ForeignKey("salons.id"), index=True)

    name = Column(String, nullable=False)
    brand = Column(String)

    stock_quantity = Column(Integer, default=0)
    min_stock = Column(Integer, default=0)

    cost_price = Column(Float)
    retail_price = Column(Float)

    salon = relationship("Salon")