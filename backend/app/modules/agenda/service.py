from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from .models import Appointment


def get_all_appointments(db: Session):

    return db.query(Appointment).all()


def get_operator_appointments(db: Session, operator_id: int):

    return (
        db.query(Appointment)
        .filter(Appointment.operator_id == operator_id)
        .all()
    )


def has_conflict(
    db: Session,
    operator_id: int,
    start_time: datetime,
    duration_minutes: int,
    appointment_id: int | None = None,
):

    end_time = start_time + timedelta(minutes=duration_minutes)

    query = db.query(Appointment).filter(
        Appointment.operator_id == operator_id
    )

    appointments = query.all()

    for ap in appointments:

        if appointment_id and ap.id == appointment_id:
            continue

        ap_start = ap.start_time
        ap_end = ap.end_time

        if start_time < ap_end and end_time > ap_start:
            return True

    return False


def update_appointment_time(
    db: Session,
    appointment_id: int,
    operator_id: int,
    start_time: datetime,
):

    appointment = db.query(Appointment).get(appointment_id)

    if not appointment:
        return None

    duration = appointment.duration_minutes

    conflict = has_conflict(
        db,
        operator_id,
        start_time,
        duration,
        appointment_id=appointment_id,
    )

    if conflict:
        raise Exception("Appointment conflict detected")

    appointment.operator_id = operator_id
    appointment.start_time = start_time
    appointment.end_time = start_time + timedelta(minutes=duration)

    db.commit()
    db.refresh(appointment)

    return appointment