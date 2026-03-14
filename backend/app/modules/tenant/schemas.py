from pydantic import BaseModel


class SalonCreate(BaseModel):
    name: str
    owner_email: str


class SalonResponse(BaseModel):
    id: int
    name: str
    owner_email: str

    class Config:
        orm_mode = True