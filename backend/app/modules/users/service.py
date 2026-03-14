from sqlalchemy.orm import Session
from passlib.context import CryptContext

from .models import User
from .schemas import UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)


def create_user(db: Session, data: UserCreate):

    user = User(
        email=data.email,
        hashed_password=hash_password(data.password),
        salon_id=data.salon_id
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user