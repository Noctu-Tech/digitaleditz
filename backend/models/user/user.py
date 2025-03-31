from typing import Optional
from pydantic import BaseModel
class UserRole(str,enum):
    CHIEF="Chief"
    CLIENT="Client"
    CUSTOMER="Customer"
class UserModel(BaseModel):
    u_name:str
    u_pfp:str
    u_subscription:Optional[str]
    u_address:str
    u_email:str
    u_password:str
    u_phone:str
    u_role:str
    u_verified:str
    u_role:UserRole
    u_status:str
    u_business_name:str
    u_business_type:str
    u_business_address:str
    u_business_phone:str