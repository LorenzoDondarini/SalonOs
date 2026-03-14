from sqlalchemy.orm import Session
from .models import Payment
from .schemas import PaymentCreate


def create_payment(db: Session, data: PaymentCreate):

    payment = Payment(
        salon_id=data.salon_id,
        appointment_id=data.appointment_id,
        amount=data.amount,
        method=data.method
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return payment


def get_payments_by_salon(db: Session, salon_id: int):

    return db.query(Payment).filter(
        Payment.salon_id == salon_id
    ).all()