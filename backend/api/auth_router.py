from enum import Enum
from utils.sample_pfp import get_sample_pfp
from services.auth.auth_utils import create_access_token, create_refresh_token, set_auth_cookie
from fastapi import APIRouter, HTTPException, Response, status
from pydantic import BaseModel, EmailStr, constr, Field
import bcrypt
from database.mongo import get_database
from config import Settings
from typing import Dict, Any

class UserRole(str, Enum):
    ADMIN = "admin"
    CLIENT = "client"
    CUSTOMER = "customer"

class Subscription(str, Enum):
    PREMIUM = "Premium"
    BASIC = "Basic"
    MID = "Mid"
    FREE = "Free"

class Verified(str, Enum):
    VERIFIED = "VERIFIED"
    UNVERIFIED = "UNVERIFIED"

class Status(str, Enum):
    ACTIVATED = "ACTIVATED"
    DEACTIVATED = "DEACTIVATED"

users_collection = get_database("users")
profile_collection=get_database("profile")
class UserSignup(BaseModel):
    username: constr(min_length=3, max_length=50) = Field(..., description="Username")
    email: EmailStr = Field(..., description="Email address")
    password: constr(min_length=8) = Field(..., description="Password")

class UserLogin(BaseModel):
    email: EmailStr = Field(..., description="Email address")
    password: str = Field(..., description="Password")
class UserData(BaseModel):
    username: str
    email: EmailStr
    password: str
    u_pfp: str
    u_subscription: Subscription
    u_verified: Verified
    u_role: UserRole
    u_status: Status

    
auth_router = APIRouter()
minute1 = Settings().access_token_expire_minutes
minute2 = Settings().refresh_token_expire_hours

# Helper Functions
def hash_password(password: str) -> str:
    """Hash a password using bcrypt."""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash."""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

@auth_router.post('/signup')
def create_user(user: UserSignup, res: Response) -> Dict[str, Any]:
    existing_user = users_collection.find_one({'email': user.email})
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    hashed_password = hash_password(user.password)
    pfp_url = get_sample_pfp(user.email)

    user_document = {
        'username': user.username,
        'email': user.email.lower(),
        'password': hashed_password,
        'u_pfp': pfp_url,
        'u_subscription': Subscription.FREE,
        'u_verified': Verified.UNVERIFIED,
        "u_role": UserRole.CLIENT,
        'u_status': Status.DEACTIVATED,
    }

    result = users_collection.insert_one(user_document)
    userDoc = users_collection.find_one({"_id": result.inserted_id})

    access_token = create_access_token(str(result.inserted_id), str(userDoc["u_role"]))
    refresh_token = create_refresh_token(str(result.inserted_id), str(userDoc["u_role"]))

    set_auth_cookie(res, access_token, "access-token", minute1)
    set_auth_cookie(res, refresh_token, "refresh-token", minute2)

    return {
        "message": "Account Creation successful",
    }

@auth_router.post('/login')
def login(user: UserLogin, res: Response) -> Dict[str, Any]:

    user_data = users_collection.find_one({'email': user.email})
    print("@user_data",user.email.lower())
    profile_data=profile_collection.find_one({"user_id":user_data["_id"]})
    if not user_data or not verify_password(user.password, user_data['password']) or not profile_data:
        users_collection.delete_one({'email': user.email})
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(str(user_data["_id"]), str(user_data["u_role"]))
    refresh_token = create_refresh_token(str(user_data["_id"]), str(user_data["u_role"]))

    set_auth_cookie(res, access_token, "access-token", minute1)
    set_auth_cookie(res, refresh_token, "refresh-token", minute2)

    return {
        "message": "Login successful",
    }

@auth_router.post("/logout")
def logout(res: Response) -> Dict[str, str]:
    res.delete_cookie(key="access-token")
    res.delete_cookie(key="refresh-token")
    return {"message": "Logged out successfully"}

    
@auth_router.post("/send-verification")
def send_verification():
    pass
