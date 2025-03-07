from typing import Optional
from pydantic import BaseModel

class HelpModel(BaseModel):
    u_id:str
    q_title:str
    q_description:str
    q_media:Optional[str]
    q_duration:str
    # q_status:str  come back to this to make it for  admin side
    timestamp:str