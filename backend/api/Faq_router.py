from fastapi import APIRouter, Depends

from services.auth.auth_utils import extract_user_data_from_token
from database.mongo import get_database
from models.help.query import FAQModel


router=APIRouter()
faqs=get_database("faqs_collection")
users=get_database("users")
async def createNew(data:FAQModel,userData:tuple=Depends(extract_user_data_from_token)):
    userId,role=userData
    newdata=data.model_dump()
    if users.find_one({"_id":userId,"authority":role}):
        faqs.insert_one(newdata)