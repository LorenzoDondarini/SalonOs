from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import jwt

from app.core.database import get_db
from app.core.config import settings
from app.modules.users.models import User

router = APIRouter(prefix="/auth", tags=["auth"])


def create_token(data: dict):

    payload = data.copy()

    payload["exp"] = datetime.utcnow() + timedelta(hours=12)

    return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")


@router.post("/login")
def login(data: dict, db: Session = Depends(get_db)):

    user = db.query(User).filter(
        User.email == data["email"]
    ).first()

    if not user or user.password != data["password"]:
        return {"error": "Invalid credentials"}

    token = create_token({"user_id": user.id, "salon_id": user.salon_id})

    return {"token": token}