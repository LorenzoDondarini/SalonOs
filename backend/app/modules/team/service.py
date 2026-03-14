from sqlalchemy.orm import Session
from .models import TeamMember
from .schemas import TeamMemberCreate


def create_team_member(db: Session, data: TeamMemberCreate):

    member = TeamMember(
        salon_id=data.salon_id,
        name=data.name,
        role=data.role,
        phone=data.phone
    )

    db.add(member)
    db.commit()
    db.refresh(member)

    return member


def get_team_by_salon(db: Session, salon_id: int):

    return db.query(TeamMember).filter(
        TeamMember.salon_id == salon_id
    ).all()