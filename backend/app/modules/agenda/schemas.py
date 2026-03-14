from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AppointmentCreate(BaseModel):
    salon_id: int
    client_id: int
    user_id: int
    service_id: int
    start_time: datetime
    end_time: datetime
    notes: Optional[str] = None


class AppointmentResponse(BaseModel):
    id: int
    salon_id: int
    client_id: int
    user_id: int
    service_id: int
    start_time: datetime
    end_time: datetime
    status: str
    notes: Optional[str] = None

    class Config:
        from_attributes = True