from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_db
from app.modules.agenda.models import Appointment
from app.modules.servizi.models import Service
from .lifetime_value import calculate_customer_lifetime_value
from .kpi_dashboard import generate_kpi_dashboard

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

@router.get("/client/{client_id}/value")
def client_value(client_id: int):

    payments = service.get_client_payments(client_id)

    value = calculate_customer_lifetime_value(payments)

    return value

@router.get("/dashboard")
def analytics_dashboard():

    appointments = service.get_all_appointments()
    payments = service.get_all_payments()
    clients = service.get_all_clients()

    return generate_kpi_dashboard(appointments, payments, clients)