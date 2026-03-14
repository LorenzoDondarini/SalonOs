from sqlalchemy.orm import Session
from sqlalchemy import func
from app.modules.servizi.models import Service
from app.modules.agenda.models import Appointment


def suggest_price_adjustments(db: Session, salon_id: int):

    services = db.query(Service).filter(
        Service.salon_id == salon_id
    ).all()

    suggestions = []

    for service in services:

        usage = db.query(func.count(Appointment.id)).filter(
            Appointment.service_id == service.id
        ).scalar()

        if usage and usage > 50:

            suggested_price = service.price * 1.1

            suggestions.append({
                "service": service.name,
                "current_price": service.price,
                "suggested_price": round(suggested_price, 2)
            })

    return suggestions