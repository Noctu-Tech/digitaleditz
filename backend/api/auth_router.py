from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel, EmailStr, constr
from pymongo import MongoClient
from bson import ObjectId
import bcrypt
import jwt
from datetime import datetime, timedelta

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['user_authentication_db']
users_collection = db['users']

# Secret key for JWT
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

# Pydantic Models
class UserSignup(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    password: constr(min_length=8)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    email: str

# Authentication Router
auth_router = APIRouter()

# Helper Functions
def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_token(user_id: str, authority: str):
    """Generate JWT token for authentication"""
    payload = {
        "sub": user_id,
        "authority": authority,
        "exp": datetime.utcnow() + timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Signup Route
@auth_router.post('/signup', response_model=UserResponse)
def create_user(user: UserSignup):
    existing_user = users_collection.find_one({
        '$or': [
            {'email': user.email},
            {'username': user.username}
        ]
    })
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or username already registered")
    
    hashed_password = hash_password(user.password)
    user_document = {
        'username': user.username,
        'email': user.email,
        'password': hashed_password,
        "authority": "user"
    }
    
    result = users_collection.insert_one(user_document)
    
    return {
        'id': str(result.inserted_id),
        'username': user.username,
        'email': user.email
    }

# Login Route
@auth_router.post('/login')
def login(user: UserLogin):
    user_data = users_collection.find_one({'email': user.email})
    
    if not user_data or not verify_password(user.password, user_data['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_token(str(user_data['_id']), user_data.get("authority", "user"))
    
    return {
        "message": "Login successful",
        "token": token
    }

# Profile Route
@auth_router.get('/profile/{user_id}')
def get_user_profile(user_id: str, request: Request):
    token = request.headers.get("Authorization")
    
    if not token or not token.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    
    token = token.split(" ")[1]
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        if payload["sub"] != user_id:
            raise HTTPException(status_code=403, detail="Access denied")
        
        object_id = ObjectId(user_id)
        user = users_collection.find_one({'_id': object_id})
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {
            'id': str(user['_id']),
            'username': user['username'],
            'email': user['email']
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.DecodeError:
        raise HTTPException(status_code=401, detail="Invalid token")
