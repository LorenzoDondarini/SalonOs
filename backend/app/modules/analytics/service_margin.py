from sqlalchemy.orm import Session

from app.modules.servizi.models import Service


def calculate_service_margin(db: Session, salon_id: int):

    services = db.query(Service).filter(
        Service.salon_id == salon_id
    ).all()

    result = []

    for service in services:

        # stima semplice costo prodotto (30%)
        product_cost = service.price * 0.30

        profit = service.price - product_cost

        margin = (profit / service.price) * 100 if service.price else 0

        result.append({
            "service_id": service.id,
            "name": service.name,
            "price": service.price,
            "product_cost": round(product_cost,2),
            "profit": round(profit,2),
            "margin": round(margin,1)
        })

    return result