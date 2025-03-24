from typing import Optional
from pydantic import BaseModel


class InventoryModel(BaseModel):
    i_title: str
    i_img:Optional[list[str]]
    i_length: int
    i_width: int
    i_front: int
    i_direction: str
    i_facing: int
    i_unit:str
    i_area: int
    i_price:int
    i_location:str
    i_uuid:str
    i_cid:Optional[str]
    i_description: Optional[str]