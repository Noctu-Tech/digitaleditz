from typing import Optional
from pydantic import BaseModel


class InventoryModel(BaseModel):
    i_title: str
    i_img:Optional[str]
    i_length: int
    i_width: int
    i_front: int
    i_facing: int
    i_area: int
    i_price:int
    i_location:str
    i_description: Optional[str]