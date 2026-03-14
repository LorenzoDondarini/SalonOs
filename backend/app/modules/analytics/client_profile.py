from sqlalchemy.orm import Session
from sqlalchemy import func

from app.modules.clienti.models import Client
from app.modules.agenda.models import Appointment
from app.modules.servizi.models import Service
from app.modules.team.models import TeamMember
from app.modules.cassa.models import Payment


def get_client_profile(db: Session, client_id: int):

    client = db.query(Client).filter(
        Client.id == client_id
    ).first()

    appointments = db.query(Appointment).filter(
        Appointment.client_id == client_id
    ).all()

    history = []

    for a in appointments:

        service = db.query(Service).filter(
            Service.id == a.service_id
        ).first()

        user = db.query(TeamMember).filter(
            TeamMember.id == a.user_id
        ).first()

        history.append({

            "id": a.id,
            "date": a.start_time,
            "service": service.name if service else "",
            "operator": user.name if user else ""

        })

    total_spent = db.query(func.sum(Payment.amount)).join(
        Appointment,
        Payment.appointment_id == Appointment.id
    ).filter(
        Appointment.client_id == client_id
    ).scalar()

    total_spent = total_spent or 0

    visits = len(appointments)

    avg_ticket = total_spent / visits if visits else 0

    return {

        "client": client,
        "visits": visits,
        "total_spent": round(total_spent,2),
        "avg_ticket": round(avg_ticket,2),
        "history": history

    }