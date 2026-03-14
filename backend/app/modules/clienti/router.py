from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from .models import Client

router = APIRouter(prefix="/clients", tags=["clients"])


@router.get("/salon/{salon_id}")
def get_clients_by_salon(salon_id: int, db: Session = Depends(get_db)):

    return db.query(Client).filter(
        Client.salon_id == salon_id
    ).all()


@router.post("/")
def create_client(data: dict, db: Session = Depends(get_db)):

    client = Client(**data)

    db.add(client)
    db.commit()
    db.refresh(client)

    return client


@router.put("/{client_id}/notes")
def update_client_notes(
    client_id: int,
    notes: str = Query(...),
    db: Session = Depends(get_db)
):

    client = db.query(Client).filter(Client.id == client_id).first()

    client.notes = notes

    db.commit()

    return {"status":"updated"}


@router.put("/{client_id}/tags")
def update_client_tags(
    client_id: int,
    tags: str = Query(...),
    db: Session = Depends(get_db)
):

    client = db.query(Client).filter(Client.id == client_id).first()

    client.tags = tags

    db.commit()

    return {"status":"updated"}