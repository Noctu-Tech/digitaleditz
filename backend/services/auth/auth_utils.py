import json
from bson import ObjectId
from fastapi import Cookie, Depends, HTTPException, Header, Security
from typing import Optional
from fastapi import HTTPException, Header, Response
from datetime import datetime, timedelta
from jose import jwt

from config import Settings
ACCESS_SECRET_KEY = Settings().secret_key  # Change this to your actual secret key
ALGORITHM = Settings().algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = Settings().access_token_expire_minutes
REFRESH_SECRET_KEY=Settings().refresh_secret_key
REFRESH_TOKEN_EXPIRE_HOURS=Settings().refresh_token_expire_hours


def create_token(data: dict, expires_delta: Optional[timedelta], secret_key: str) -> str:
    """Generate a JWT token with an expiration time."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)

def create_access_token(user_id: str) -> str:
    """Generate an access token."""
    return create_token({"user_id": user_id}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES), ACCESS_SECRET_KEY)

def create_refresh_token(user_id: str) -> str:
    """Generate a refresh token **AFTER** the access token."""
    return create_token({"user_id": user_id}, timedelta(hours=REFRESH_TOKEN_EXPIRE_HOURS), REFRESH_SECRET_KEY)

def set_auth_cookie(response: Response, token: str,token_key:str):
    response.set_cookie(
        key=token_key,
        value=token,
        httponly=True,
        secure=True,  # Use True in production with HTTPS
        samesite="lax",
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60
    )
async def get_tokens(
    access_token: str = Cookie(None),
    refresh_token: str = Cookie(None)
):
    """Extracts both access and refresh tokens from cookies."""
    if not access_token or not refresh_token:
        raise HTTPException(status_code=401, detail="Missing tokens")
    return access_token, refresh_token

def verify_token(tokens: tuple = Depends(get_tokens)) -> str:
    """Verifies and decodes the access token."""
    access_token, _ = tokens  # We only use the access token for verification
    try:
        # Decode the token
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("id")
        
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
        
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
