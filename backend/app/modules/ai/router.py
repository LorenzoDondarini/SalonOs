from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from .forecast import forecast_revenue_next_week
from .client_retention import clients_at_risk
from .pricing import suggest_price_adjustments
from .schedule_optimizer import find_free_slots
from .ghost_clients import find_ghost_clients

router = APIRouter(prefix="/ai", tags=["ai"])


@router.get("/forecast/{salon_id}")
def forecast(salon_id: int, db: Session = Depends(get_db)):

    return forecast_revenue_next_week(db, salon_id)


@router.get("/clients-risk/{salon_id}")
def risky_clients(salon_id: int, db: Session = Depends(get_db)):

    return clients_at_risk(db, salon_id)


@router.get("/pricing/{salon_id}")
def pricing_suggestions(salon_id: int, db: Session = Depends(get_db)):

    return suggest_price_adjustments(db, salon_id)


@router.get("/free-slots/{salon_id}")
def free_slots(salon_id: int, db: Session = Depends(get_db)):

    return find_free_slots(db, salon_id)


@router.get("/ghost-clients/{salon_id}")
def ghost_clients(salon_id: int, db: Session = Depends(get_db)):

    return find_ghost_clients(db, salon_id)