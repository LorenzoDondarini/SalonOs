from sqlalchemy.orm import Session
from .models import Client
from .schemas import ClientCreate


def create_client(db: Session, data: ClientCreate):

    client = Client(
        salon_id=data.salon_id,
        first_name=data.first_name,
        last_name=data.last_name,
        phone=data.phone,
        email=data.email,
        notes=data.notes
    )

    db.add(client)
    db.commit()
    db.refresh(client)

    return client


def get_clients_by_salon(db: Session, salon_id: int):

    return db.query(Client).filter(Client.salon_id == salon_id).all()