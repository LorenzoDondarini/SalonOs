from pydantic import BaseModel
from typing import Optional


class TeamMemberCreate(BaseModel):
    salon_id: int
    name: str
    role: Optional[str]
    phone: Optional[str]


class TeamMemberResponse(BaseModel):
    id: int
    salon_id: int
    name: str
    role: Optional[str]
    phone: Optional[str]

    class Config:
        orm_mode = True