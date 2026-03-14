from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import stripe

from app.core.config import settings
from app.core.database import get_db
from .models import Payment

stripe.api_key = settings.STRIPE_SECRET

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/stripe")
def stripe_payment(data: dict):

    intent = stripe.PaymentIntent.create(
        amount=int(data["amount"] * 100),
        currency="eur",
        payment_method_types=["card"]
    )

    return {"client_secret": intent.client_secret}


@router.post("/")
def create_payment(data: dict, db: Session = Depends(get_db)):

    payment = Payment(**data)

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return payment