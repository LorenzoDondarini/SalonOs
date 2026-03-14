from sqlalchemy.orm import Session
from .models import Salon
from .schemas import SalonCreate


def create_salon(db: Session, data: SalonCreate):
    salon = Salon(
        name=data.name,
        owner_email=data.owner_email
    )

    db.add(salon)
    db.commit()
    db.refresh(salon)

    return salon