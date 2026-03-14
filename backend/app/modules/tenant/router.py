from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from .schemas import SalonCreate, SalonResponse
from .service import create_salon

router = APIRouter(prefix="/salons", tags=["salons"])


@router.post("/", response_model=SalonResponse)
def create_new_salon(data: SalonCreate, db: Session = Depends(get_db)):
    return create_salon(db, data)