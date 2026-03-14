from pydantic import BaseModel


class UserCreate(BaseModel):
    email: str
    password: str
    salon_id: int


class UserResponse(BaseModel):
    id: int
    email: str
    salon_id: int

    class Config:
        orm_mode = True