from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from .service import clients_to_recover, upcoming_reminders
from .client_recovery import find_inactive_clients

router = APIRouter(prefix="/marketing", tags=["marketing"])


@router.get("/recover/{salon_id}")
def recover_clients(salon_id: int, db: Session = Depends(get_db)):
    return clients_to_recover(db, salon_id)


@router.get("/reminders/{salon_id}")
def reminders(salon_id: int, db: Session = Depends(get_db)):
    return upcoming_reminders(db, salon_id)

@router.get("/inactive-clients")
def inactive_clients():

    clients = service.get_all_clients()

    result = find_inactive_clients(clients)

    return result
    