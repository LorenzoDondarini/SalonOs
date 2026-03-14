from sqlalchemy.orm import Session
from sqlalchemy import func

from app.modules.clienti.models import Client
from app.modules.agenda.models import Appointment
from app.modules.cassa.models import Payment


def calculate_customer_value(db: Session, salon_id: int):

    clients = db.query(Client).filter(
        Client.salon_id == salon_id
    ).all()

    result = []

    for client in clients:

        visits = db.query(Appointment).filter(
            Appointment.client_id == client.id
        ).count()

        total_spent = db.query(func.sum(Payment.amount)).join(
            Appointment,
            Payment.appointment_id == Appointment.id
        ).filter(
            Appointment.client_id == client.id
        ).scalar()

        total_spent = total_spent or 0

        avg_ticket = total_spent / visits if visits else 0

        result.append({
            "client_id": client.id,
            "name": f"{client.first_name} {client.last_name or ''}",
            "visits": visits,
            "total_spent": round(total_spent,2),
            "avg_ticket": round(avg_ticket,2)
        })

    return result