from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.modules.clienti.models import Client
from app.modules.agenda.models import Appointment


DAYS_LIMIT = 90


def find_ghost_clients(db: Session, salon_id: int):

    limit_date = datetime.utcnow() - timedelta(days=DAYS_LIMIT)

    clients = db.query(Client).filter(
        Client.salon_id == salon_id
    ).all()

    ghost = []

    for client in clients:

        last_visit = db.query(Appointment).filter(
            Appointment.client_id == client.id
        ).order_by(
            Appointment.start_time.desc()
        ).first()

        if last_visit and last_visit.start_time < limit_date:

            ghost.append({
                "client_id": client.id,
                "name": f"{client.first_name} {client.last_name or ''}",
                "last_visit": last_visit.start_time
            })

    return ghost