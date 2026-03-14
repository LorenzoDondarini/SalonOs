from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from .schemas import TeamMemberCreate, TeamMemberResponse
from .service import create_team_member, get_team_by_salon

router = APIRouter(prefix="/team", tags=["team"])


@router.post("/", response_model=TeamMemberResponse)
def create_member(data: TeamMemberCreate, db: Session = Depends(get_db)):
    return create_team_member(db, data)


@router.get("/salon/{salon_id}", response_model=List[TeamMemberResponse])
def list_team(salon_id: int, db: Session = Depends(get_db)):
    return get_team_by_salon(db, salon_id)