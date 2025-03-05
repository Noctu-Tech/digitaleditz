from pydantic import BaseModel

class PaymentModel(BaseModel):
    p_id:str
    p_payeeid:str
    p_description:str
    p_recieverid:str
    p_timestamp:str
    p_amount:float
