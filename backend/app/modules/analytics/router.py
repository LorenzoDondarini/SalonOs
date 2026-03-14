from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db
from app.modules.agenda.models import Appointment
from app.modules.servizi.models import Service

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/client-profile/{client_id}")
def client_profile(client_id: int, db: Session = Depends(get_db)):

    appointments = db.query(Appointment).filter(
        Appointment.client_id == client_id
    ).all()

    total = 0

    services = []

    for a in appointments:

        s = db.query(Service).filter(
            Service.id == a.service_id
        ).first()

        if s:

            total += s.price

            services.append(s.name)

    visits = len(appointments)

    avg = total / visits if visits > 0 else 0

    return {
        "visits": visits,
        "total_spent": total,
        "avg_ticket": avg,
        "services": services
    }