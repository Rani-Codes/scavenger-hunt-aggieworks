from typing import Annotated
from pydantic import BaseModel, constr

class ItemBase(BaseModel):
    title: str
    photo_url: str

class ItemCreate(ItemBase):
    pass

class ItemInDB(ItemBase):
    id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: Annotated[str, constr(min_length=4)]

class UserCreate(UserBase):
    password: Annotated[str, constr(min_length=4)]

class UserInDB(UserBase):
    id: int
    items: list[ItemInDB] = []

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str