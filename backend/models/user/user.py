from pydantic import BaseModel

class UserModel(BaseModel):
    u_name:str
    u_pfp:str
    u_subscription:str
    