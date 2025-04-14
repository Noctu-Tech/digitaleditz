from typing import Optional
from pydantic import BaseModel


class InventoryModel(BaseModel):
    title: str
    status: str
    length: int
    width: int
    front: int
    direction: str
    facing: str
    unit:str
    area: int
    price:int
    address: str
    city: str
    state: str
    zip: str
    description: str
    # images:list[str]
    type:str
    # uuid:str
    # cid:Optional[str]