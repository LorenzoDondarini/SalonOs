from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from .schemas import UserCreate, UserResponse
from .service import create_user

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserResponse)
def create_new_user(data: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, data)