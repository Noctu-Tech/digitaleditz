from pydantic import BaseModel

class UserModel(BaseModel):
    u_name:str
    u_pfp:str
    u_subscription:str
    u_address:str
    u_email:str
    u_password:str
    u_phone:str
    u_role:str
    u_verified:str
    u_status:str
    u_business_name:str
    u_business_type:str
    u_business_address:str
    u_business_phone:str