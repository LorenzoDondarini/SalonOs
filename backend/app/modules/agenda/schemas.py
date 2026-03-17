from pydantic import BaseModel
from datetime import datetime


class AppointmentCreate(BaseModel):

    client_id: int
    operator_id: int
    start_time: datetime
    duration_minutes: int


class AppointmentUpdate(BaseModel):

    operator_id: int
    start_time: datetime