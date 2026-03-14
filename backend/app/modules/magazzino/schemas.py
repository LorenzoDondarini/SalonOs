from pydantic import BaseModel
from typing import Optional


class ProductCreate(BaseModel):
    salon_id: int
    name: str
    brand: Optional[str]
    stock_quantity: int
    min_stock: int
    cost_price: Optional[float]
    retail_price: Optional[float]


class ProductResponse(BaseModel):
    id: int
    salon_id: int
    name: str
    brand: Optional[str]
    stock_quantity: int
    min_stock: int
    cost_price: Optional[float]
    retail_price: Optional[float]

    class Config:
        orm_mode = True