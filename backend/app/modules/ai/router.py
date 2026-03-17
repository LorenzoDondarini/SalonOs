from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.modules.agenda.models import Appointment

from .slot_optimizer import suggest_slots

router = APIRouter(
    prefix="/ai",
    tags=["ai"]
)


@router.get("/suggest-slots")
def ai_suggest_slots(
    duration: int,
    db: Session = Depends(get_db)
):

    appointments = db.query(Appointment).all()

    suggestions = suggest_slots(
        appointments,
        duration
    )

    return {
        "suggested_slots": suggestions
    }