from sqlalchemy.orm import Session
from .models import Appointment
from .schemas import AppointmentCreate


def create_appointment(db: Session, data: AppointmentCreate):
    appointment = Appointment(
        salon_id=data.salon_id,
        client_id=data.client_id,
        user_id=data.user_id,
        service_id=data.service_id,
        start_time=data.start_time,
        end_time=data.end_time,
        notes=data.notes,
    )

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    return appointment


def get_salon_appointments(db: Session, salon_id: int):
    return db.query(Appointment).filter(
        Appointment.salon_id == salon_id
    ).all()