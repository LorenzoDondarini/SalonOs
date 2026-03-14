from pydantic import BaseModel
from typing import Optional


class ClientCreate(BaseModel):
    salon_id: int
    first_name: str
    last_name: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    notes: Optional[str]


class ClientResponse(BaseModel):
    id: int
    salon_id: int
    first_name: str
    last_name: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    notes: Optional[str]

    class Config:
        orm_mode = True