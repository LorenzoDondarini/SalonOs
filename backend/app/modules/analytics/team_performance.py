from sqlalchemy.orm import Session
from sqlalchemy import func

from app.modules.team.models import TeamMember
from app.modules.agenda.models import Appointment
from app.modules.cassa.models import Payment


def calculate_team_performance(db: Session, salon_id: int):

    team = db.query(TeamMember).filter(
        TeamMember.salon_id == salon_id
    ).all()

    result = []

    for member in team:

        appointments = db.query(Appointment).filter(
            Appointment.user_id == member.id
        ).all()

        appointment_ids = [a.id for a in appointments]

        total_revenue = db.query(func.sum(Payment.amount)).filter(
            Payment.appointment_id.in_(appointment_ids)
        ).scalar()

        total_revenue = total_revenue or 0

        visits = len(appointments)

        avg_ticket = total_revenue / visits if visits else 0

        result.append({
            "team_member_id": member.id,
            "name": member.name,
            "visits": visits,
            "revenue": round(total_revenue,2),
            "avg_ticket": round(avg_ticket,2)
        })

    return result