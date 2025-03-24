from pydantic import BaseModel

class CustomerModel(BaseModel):
    c_name:str
    c_phone:str
    c_other_detail:str            