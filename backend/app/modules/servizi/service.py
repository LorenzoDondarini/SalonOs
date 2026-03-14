from sqlalchemy.orm import Session
from .models import Service
from .schemas import ServiceCreate


def create_service(db: Session, data: ServiceCreate):

    service = Service(
        salon_id=data.salon_id,
        name=data.name,
        duration_minutes=data.duration_minutes,
        price=data.price,
        description=data.description
    )

    db.add(service)
    db.commit()
    db.refresh(service)

    return service


def get_services_by_salon(db: Session, salon_id: int):

    return db.query(Service).filter(
        Service.salon_id == salon_id
    ).all()