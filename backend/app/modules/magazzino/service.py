from sqlalchemy.orm import Session
from .models import Product
from .schemas import ProductCreate


def create_product(db: Session, data: ProductCreate):

    product = Product(
        salon_id=data.salon_id,
        name=data.name,
        brand=data.brand,
        stock_quantity=data.stock_quantity,
        min_stock=data.min_stock,
        cost_price=data.cost_price,
        retail_price=data.retail_price
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


def get_products_by_salon(db: Session, salon_id: int):

    return db.query(Product).filter(
        Product.salon_id == salon_id
    ).all()