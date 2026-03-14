from sqlalchemy.orm import Session
from sqlalchemy import func
from app.modules.cassa.models import Payment
from app.modules.agenda.models import Appointment
from app.modules.servizi.models import Service


def get_total_revenue(db: Session, salon_id: int):
    total = db.query(func.sum(Payment.amount)).filter(
        Payment.salon_id == salon_id
    ).scalar()

    return total or 0


def get_appointments_count(db: Session, salon_id: int):
    count = db.query(Appointment).filter(
        Appointment.salon_id == salon_id
    ).count()

    return count


def get_top_services(db: Session, salon_id: int):

    result = db.query(
        Service.name,
        func.count(Appointment.id).label("total")
    ).join(
        Appointment, Appointment.service_id == Service.id
    ).filter(
        Service.salon_id == salon_id
    ).group_by(
        Service.name
    ).order_by(
        func.count(Appointment.id).desc()
    ).limit(5).all()

    return result