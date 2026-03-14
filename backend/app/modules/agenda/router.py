from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from .models import Appointment
from .schemas import AppointmentCreate
from .slot_optimizer import suggest_available_slots
from fastapi import Query


router = APIRouter(prefix="/appointments", tags=["appointments"])


@router.get("/salon/{salon_id}")
def get_appointments(salon_id: int, db: Session = Depends(get_db)):

    return db.query(Appointment).filter(
        Appointment.salon_id == salon_id
    ).all()


@router.post("/")
def create_appointment(data: AppointmentCreate, db: Session = Depends(get_db)):

    appointment = Appointment(**data.dict())

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    return appointment


@router.put("/{appointment_id}")
def update_appointment(
    appointment_id: int,
    data: AppointmentCreate,
    db: Session = Depends(get_db)
):

    appointment = db.query(Appointment).filter(
        Appointment.id == appointment_id
    ).first()

    if not appointment:
        return {"error": "Appointment not found"}

    appointment.start_time = data.start_time
    appointment.end_time = data.end_time
    appointment.user_id = data.user_id
    appointment.service_id = data.service_id
    appointment.client_id = data.client_id

    db.commit()

    return appointment

@router.get("/suggest-slots")
def suggest_slots(duration: int = Query(...), service_id: int | None = None):

    appointments = service.get_all_appointments()

    slots = suggest_available_slots(appointments, duration)

    return {
        "available_slots": slots
    }