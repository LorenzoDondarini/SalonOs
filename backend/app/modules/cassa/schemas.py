from pydantic import BaseModel
from typing import Optional


class PaymentCreate(BaseModel):
    salon_id: int
    appointment_id: int
    amount: float
    method: Optional[str]


class PaymentResponse(BaseModel):
    id: int
    salon_id: int
    appointment_id: int
    amount: float
    method: Optional[str]

    class Config:
        orm_mode = True