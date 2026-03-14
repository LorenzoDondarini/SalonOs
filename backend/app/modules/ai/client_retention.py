from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.modules.clienti.models import Client
from app.modules.agenda.models import Appointment


def clients_at_risk(db: Session, salon_id: int):

    limit_date = datetime.utcnow() - timedelta(days=60)

    clients = db.query(Client).filter(
        Client.salon_id == salon_id
    ).all()

    risky_clients = []

    for client in clients:

        last_visit = db.query(Appointment).filter(
            Appointment.client_id == client.id
        ).order_by(
            Appointment.start_time.desc()
        ).first()

        if not last_visit or last_visit.start_time < limit_date:

            risky_clients.append({
                "client_id": client.id,
                "name": client.first_name,
                "last_visit": last_visit.start_time if last_visit else None
            })

    return risky_clients