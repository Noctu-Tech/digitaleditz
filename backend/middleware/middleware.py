from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
import jwt

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

class AuthorityMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        token = request.headers.get("Authorization")

        if not token or not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Missing or invalid token")

        token = token.split(" ")[1]

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            authority = payload.get("authority")

            if authority != "admin":
                raise HTTPException(status_code=403, detail="Access denied. Insufficient authority")
        
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.DecodeError:
            raise HTTPException(status_code=401, detail="Invalid token")

        response = await call_next(request)
        return response
