from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.modules.cassa.models import Payment


def forecast_revenue_next_week(db: Session, salon_id: int):

    today = datetime.utcnow()
    last_month = today - timedelta(days=30)

    total_last_month = db.query(func.sum(Payment.amount)).filter(
        Payment.salon_id == salon_id,
        Payment.created_at >= last_month
    ).scalar()

    if not total_last_month:
        return {"forecast_next_week": 0}

    avg_daily = total_last_month / 30
    forecast = avg_daily * 7

    return {
        "forecast_next_week": round(forecast, 2)
    }