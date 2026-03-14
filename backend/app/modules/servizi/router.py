from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from .schemas import ServiceCreate, ServiceResponse
from .service import create_service, get_services_by_salon

router = APIRouter(prefix="/services", tags=["services"])


@router.post("/", response_model=ServiceResponse)
def create_new_service(data: ServiceCreate, db: Session = Depends(get_db)):
    return create_service(db, data)


@router.get("/salon/{salon_id}", response_model=List[ServiceResponse])
def list_services(salon_id: int, db: Session = Depends(get_db)):
    return get_services_by_salon(db, salon_id)