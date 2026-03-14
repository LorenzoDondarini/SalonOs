from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.modules.agenda.models import Appointment


WORK_START = 9
WORK_END = 19
SLOT_MINUTES = 30


def find_free_slots(db: Session, salon_id: int):

    today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)

    appointments = db.query(Appointment).filter(
        Appointment.salon_id == salon_id,
        Appointment.start_time >= today
    ).all()

    booked_times = set()

    for a in appointments:

        time = a.start_time.strftime("%H:%M")
        booked_times.add(time)

    slots = []

    current = today.replace(hour=WORK_START)

    end = today.replace(hour=WORK_END)

    while current < end:

        slot = current.strftime("%H:%M")

        if slot not in booked_times:

            slots.append(slot)

        current += timedelta(minutes=SLOT_MINUTES)

    return {
        "suggested_slots": slots[:10]
    }