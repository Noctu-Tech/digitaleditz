from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class HelpModel(BaseModel):
    u_id:str
    q_title:str
    q_description:str
    q_media:Optional[str]
    q_duration:str
    q_status:Optional[str]
    timestamp:datetime = Field(default_factory=datetime.now)

class FAQModel(BaseModel):
    question:str
    answer:str
