from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from .schemas import ProductCreate, ProductResponse
from .service import create_product, get_products_by_salon

router = APIRouter(prefix="/products", tags=["products"])


@router.post("/", response_model=ProductResponse)
def create_new_product(data: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, data)


@router.get("/salon/{salon_id}", response_model=List[ProductResponse])
def list_products(salon_id: int, db: Session = Depends(get_db)):
    return get_products_by_salon(db, salon_id)