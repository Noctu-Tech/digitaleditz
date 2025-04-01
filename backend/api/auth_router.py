from services.auth.auth_utils import create_access_token, create_refresh_token, set_auth_cookie
from fastapi import APIRouter, HTTPException, Request, Response
from pydantic import BaseModel, EmailStr, constr
from datetime import datetime, timedelta
import sys
print(sys.path)
from jwt import encode as jwt_encode
import bcrypt
from bson import ObjectId
from database.mongo import get_database
from config import Settings

users_collection=get_database("client_collection")
class UserSignup(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    password: constr(min_length=8)

class UserLogin(BaseModel):
    email: EmailStr
    password: str


auth_router = APIRouter()

# Helper Functions
def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

@auth_router.post('/signup')
def create_user(user: UserSignup,res:Response):
    existing_user = users_collection.find_one({'email': user.email})
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    user_document = {
        'username': user.username,
        'email': user.email,
        'password': hashed_password,
        "authority": "user"
    }
    
    result = users_collection.insert_one(user_document)
    access_token=create_access_token({"userId":str(result.inserted_id)})
    refresh_token=create_refresh_token({"userId":str(result.inserted_id) })
    set_auth_cookie(res,access_token,"access-token")
    set_auth_cookie(res,refresh_token,"refresh-token")
    
    return {
        "message": "Account Creation successful",
    }

# Login Route
@auth_router.post('/login')
def login(user: UserLogin,res:Response):
    user_data = users_collection.find_one({'email': user.email})
    
    if not user_data or not verify_password(user.password, user_data['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not (user_data.authority=="admin"):
        access_token=create_access_token({"userId":str(user_data["_id"])})
        refresh_token=create_refresh_token({"userId":str(user_data["_id"]) })
    else :
        access_token=create_access_token({"userId":str(user_data["_id"]),"authority":user_data.authority})
        refresh_token=create_refresh_token({"userId":str(user_data["_id"]),"authority":user_data.authority })
    
    set_auth_cookie(res,access_token,"access-token")
    set_auth_cookie(res,refresh_token,"refresh-token")
    
    return {
        "message": "Login successful",
    }