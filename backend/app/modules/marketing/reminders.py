from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.modules.agenda.models import Appointment
from app.modules.clienti.models import Client


REMINDER_HOURS = 24


def appointments_to_remind(db: Session, salon_id: int):

    now = datetime.utcnow()
    reminder_time = now + timedelta(hours=REMINDER_HOURS)

    appointments = db.query(Appointment).filter(
        Appointment.salon_id == salon_id,
        Appointment.start_time <= reminder_time,
        Appointment.start_time >= now
    ).all()

    result = []

    for a in appointments:

        client = db.query(Client).filter(
            Client.id == a.client_id
        ).first()

        if client:

            result.append({
                "appointment_id": a.id,
                "client_name": f"{client.first_name} {client.last_name or ''}",
                "phone": client.phone,
                "time": a.start_time
            })

    return result