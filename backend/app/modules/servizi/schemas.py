from pydantic import BaseModel
from typing import Optional


class ServiceCreate(BaseModel):
    salon_id: int
    name: str
    duration_minutes: int
    price: float
    description: Optional[str]


class ServiceResponse(BaseModel):
    id: int
    salon_id: int
    name: str
    duration_minutes: int
    price: float
    description: Optional[str]

    class Config:
        orm_mode = True