from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.modules.agenda.models import Appointment
from app.modules.servizi.models import Service
from app.modules.clienti.models import Client

from . import service
from .lifetime_value import calculate_customer_lifetime_value
from .kpi_dashboard import generate_kpi_dashboard
from .client_segments import segment_clients
from .business_insights import (
    top_services,
    best_days,
    operator_performance
)
from .business_advisor import generate_business_advice

router = APIRouter(
    prefix="/analytics",
    tags=["analytics"]
)


@router.get("/client-profile/{client_id}")
def client_profile(
    client_id: int,
    db: Session = Depends(get_db)
):

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
def client_value(
    client_id: int,
    db: Session = Depends(get_db)
):

    payments = service.get_client_payments(
        db,
        client_id
    )

    value = calculate_customer_lifetime_value(payments)

    return value


@router.get("/dashboard")
def analytics_dashboard(
    db: Session = Depends(get_db)
):

    appointments = service.get_all_appointments(db)
    payments = service.get_all_payments(db)
    clients = service.get_all_clients(db)

    return generate_kpi_dashboard(
        appointments,
        payments,
        clients
    )


@router.get("/client-segments")
def get_client_segments(
    db: Session = Depends(get_db)
):

    clients = service.get_all_clients(db)

    segments = segment_clients(clients)

    return segments


@router.get("/top-services")
def analytics_top_services(
    db: Session = Depends(get_db)
):

    appointments = service.get_all_appointments(db)
    services = db.query(Service).all()

    return top_services(appointments, services)


@router.get("/best-days")
def analytics_best_days(
    db: Session = Depends(get_db)
):

    appointments = service.get_all_appointments(db)

    return best_days(appointments)


@router.get("/team-performance")
def analytics_team_performance(
    db: Session = Depends(get_db)
):

    appointments = service.get_all_appointments(db)

    return operator_performance(appointments)


# ------------------------------------------
# AI BUSINESS ADVISOR
# ------------------------------------------

@router.get("/advisor")
def business_advisor(
    db: Session = Depends(get_db)
):

    appointments = service.get_all_appointments(db)
    clients = service.get_all_clients(db)
    services = db.query(Service).all()

    top = top_services(appointments, services)
    days = best_days(appointments)

    advice = generate_business_advice(
        clients,
        appointments,
        top,
        days
    )

    return {
        "advice": advice
    }