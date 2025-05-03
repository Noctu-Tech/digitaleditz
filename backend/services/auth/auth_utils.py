from datetime import datetime, timedelta
from typing import Optional, Tuple, Dict, Any

from fastapi import Header, HTTPException, Request, Response, Depends
from jose import jwt, ExpiredSignatureError, JWTError

from config import Settings

ACCESS_SECRET_KEY = Settings().secret_key
ALGORITHM = Settings().algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = Settings().access_token_expire_minutes
REFRESH_SECRET_KEY = Settings().refresh_secret_key
REFRESH_TOKEN_EXPIRE_HOURS = Settings().refresh_token_expire_hours


def create_token(data: Dict[str, Any], expires_delta: Optional[timedelta], secret_key: str) -> str:
    """Generates a JWT token with an expiration time."""
    to_encode = data.copy()
    expire = datetime.now() + (expires_delta if expires_delta else timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, secret_key, algorithm=ALGORITHM)


def create_access_token(user_id: str, authority: str) -> str:
    """Generates an access token."""
    return create_token({"user_id": user_id, "authority": authority}, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES), ACCESS_SECRET_KEY)


def create_refresh_token(user_id: str, authority: str) -> str:
    """Generates a refresh token."""
    return create_token({"user_id": user_id, "authority": authority}, timedelta(hours=REFRESH_TOKEN_EXPIRE_HOURS), REFRESH_SECRET_KEY)


def set_auth_cookie(response: Response, token: str, token_key: str, max_age_minutes: int) -> None:
    """Sets an authentication cookie."""
    response.set_cookie(
        httponly=True,
        secure=False,  # Use True in production with HTTPS
        key=token_key,
        value=token,
        samesite="lax",
        max_age=max_age_minutes * 60,  # Convert minutes to seconds
        path="/",
    )


def get_tokens(request: Request) -> Tuple[str, str]:
    """Extracts access and refresh tokens from cookies."""
    access_token = request.cookies.get("access-token")
    refresh_token = request.cookies.get("refresh-token")
    print("@access_token",access_token)
    print("@refresh_token",refresh_token)
    if not access_token or not refresh_token:
        raise HTTPException(status_code=401, detail="Missing tokens")

    return access_token, refresh_token

def verify_and_refresh_tokens(response: Response, tokens: Tuple[str, str] = Depends(get_tokens)) -> Dict[str, str]:
    """Verifies and optionally refreshes tokens."""
    access_token, refresh_token = tokens
    try:
        payload = jwt.decode(access_token, ACCESS_SECRET_KEY, algorithms=[ALGORITHM])
        set_auth_cookie(response, access_token, "access-token", ACCESS_TOKEN_EXPIRE_MINUTES)
        set_auth_cookie(response, refresh_token, "refresh-token", REFRESH_TOKEN_EXPIRE_HOURS)
        return {"status": "success"}
    except ExpiredSignatureError:
        try:
            payload = jwt.decode(refresh_token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
            new_access_token = create_access_token(payload["user_id"], payload["authority"])
            new_refresh_token = create_refresh_token(payload["user_id"], payload["authority"])
            set_auth_cookie(response, new_access_token, "access-token", ACCESS_TOKEN_EXPIRE_MINUTES)
            set_auth_cookie(response, new_refresh_token, "refresh-token", REFRESH_TOKEN_EXPIRE_HOURS)
            return {"status": "success"}
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid access token")


def extract_user_data_from_token(response: Response, tokens: Tuple[str, str] = Depends(get_tokens)) -> Dict[str, Any]:
    """Decodes the access token and returns user data."""
    access_token, refresh_token = tokens
    try:
        payload = jwt.decode(access_token, ACCESS_SECRET_KEY, algorithms=[ALGORITHM])
        set_auth_cookie(response, access_token, "access-token", ACCESS_TOKEN_EXPIRE_MINUTES)
        set_auth_cookie(response, refresh_token, refresh_token, REFRESH_TOKEN_EXPIRE_HOURS)
        user_id = payload.get("user_id")
        authority = payload.get("authority")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        return {"user_id": user_id, "authority": authority}
    except ExpiredSignatureError:
        try:
            payload = jwt.decode(refresh_token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
            new_access_token = create_access_token(payload["user_id"], payload["authority"])
            new_refresh_token = create_refresh_token(payload["user_id"], payload["authority"])
            set_auth_cookie(response, new_access_token, "access-token", ACCESS_TOKEN_EXPIRE_MINUTES)
            set_auth_cookie(response, new_refresh_token, "refresh-token", REFRESH_TOKEN_EXPIRE_HOURS)

            user_id = payload.get("user_id")
            authority = payload.get("authority")
            return {"user_id": user_id, "authority": authority}
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid refresh token")

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    

