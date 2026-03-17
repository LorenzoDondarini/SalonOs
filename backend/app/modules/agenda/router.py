from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.core.database import get_db
from . import service
from .schemas import AppointmentCreate, AppointmentUpdate

router = APIRouter(
    prefix="/agenda",
    tags=["agenda"]
)


@router.get("/")
def get_agenda(db: Session = Depends(get_db)):

    return service.get_all_appointments(db)


@router.post("/book")
def create_appointment(
    payload: AppointmentCreate,
    db: Session = Depends(get_db)
):

    return service.create_appointment(
        db,
        payload.client_id,
        payload.operator_id,
        payload.start_time,
        payload.duration_minutes
    )


@router.put("/{appointment_id}")
def move_appointment(
    appointment_id: int,
    payload: AppointmentUpdate,
    db: Session = Depends(get_db)
):

    try:

        updated = service.update_appointment_time(
            db,
            appointment_id,
            payload.operator_id,
            payload.start_time,
        )

        if not updated:
            raise HTTPException(
                status_code=404,
                detail="Appointment not found",
            )

        return updated

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e),
        )