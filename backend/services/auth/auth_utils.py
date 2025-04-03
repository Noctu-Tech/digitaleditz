import json
from bson import ObjectId
from fastapi import Cookie, Depends, HTTPException, Header, Request, Security
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
    token=jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)
    print("@token",token)
    return token

def create_access_token(user_id: str) -> str:
    """Generate an access token."""
    return create_token({"user_id": user_id}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES), ACCESS_SECRET_KEY)

def create_refresh_token(user_id: str) -> str:
    """Generate a refresh token **AFTER** the access token."""
    return create_token({"user_id": user_id}, timedelta(hours=REFRESH_TOKEN_EXPIRE_HOURS), REFRESH_SECRET_KEY)

def set_auth_cookie(response: Response, token: str,token_key:str,minutes:int):
    response.set_cookie(
        key=token_key,
        value=token,
        httponly=True,
        secure=False,  # Use True in production with HTTPS
        samesite="lax",
        max_age=minutes,
        path="/"
    )
    print(f"Set cookie: {token_key} (expires in {minutes} minutes)")
    
    # For debugging, you can also print cookie headers
    print(f"Response cookies: {response.headers.get('set-cookie', 'None')}")
async def get_tokens(req:Request
):
    """Extracts both access and refresh tokens from cookies."""
    access_token=req.cookies.get("access_token")
    refresh_token=req.cookies.get("refresh_token")
    print(access_token,refresh_token)
    if not access_token or not refresh_token:
        raise HTTPException(status_code=401, detail="Missing tokens")
    return access_token, refresh_token

def verify_token(res:Response,tokens: tuple = Depends(get_tokens)) -> bool:
    """Verifies the access token without decoding."""
    access_token, _ = tokens  # We only use the access token for verification
    try:
        # Just verify the token
        jwt.decode(access_token, ACCESS_SECRET_KEY, algorithms=[ALGORITHM])
        set_auth_cookie(res,access_token,"access-token",ACCESS_TOKEN_EXPIRE_MINUTES)
        set_auth_cookie(res,_,"refresh-token",REFRESH_TOKEN_EXPIRE_HOURS)
        print("done")
        return True
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

def extract_token(tokens: tuple = Depends(get_tokens)) -> str:
    """Decodes the access token and returns the user_id."""
    access_token, _ = tokens  # We only use the access token for verification
    try:
        # Decode the token
        payload = jwt.decode(access_token, ACCESS_SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
