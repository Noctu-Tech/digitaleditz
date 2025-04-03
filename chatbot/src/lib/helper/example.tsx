// FRONTEND IMPLEMENTATION (NEXT.JS)

// src/types/auth.ts


// src/lib/axios.ts


// src/hooks/auth.ts


// src/hooks/usePermission.ts


// src/components/ProtectedRoute.tsx


// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default MyApp;

// src/pages/login.tsx
import { useState } from 'react';
import { useAuth } from '../hooks/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Log in</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

// src/pages/dashboard.tsx
import { useAuth } from '../hooks/auth';
import { usePermission } from '../hooks/usePermission';
import ProtectedRoute from '../components/ProtectedRoute';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { canView } = usePermission();

  return (
    <ProtectedRoute>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div>
            <span className="mr-4">Welcome, {user?.name}</span>
            <button 
              onClick={() => logout()} 
              className="py-2 px-4 bg-red-600 text-white rounded-md"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Everyone can see this */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">User Dashboard</h2>
            <p>This content is visible to all authenticated users.</p>
          </div>

          {/* Only managers and admins can see this */}
          {canView(
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Management Panel</h2>
              <p>This content is only visible to managers and admins.</p>
            </div>,
            ['manager', 'admin']
          )}

          {/* Only admins can see this */}
          {canView(
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
              <p>This content is only visible to admins.</p>
            </div>,
            ['admin']
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;

// BACKEND IMPLEMENTATION (FASTAPI)

# app/models/user.py
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from uuid import UUID, uuid4

class UserRole(str):
    ADMIN = "admin"
    MANAGER = "manager"
    USER = "user"

class UserBase(BaseModel):
    email: EmailStr
    name: str
    roles: List[UserRole] = [UserRole.USER]

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class UserInDB(UserBase):
    id: UUID = Field(default_factory=uuid4)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

# app/core/security.py
from datetime import datetime, timedelta
from typing import Any, Optional, Union
from fastapi import Depends, HTTPException, status, Response, Cookie, Request
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import ValidationError

from app.models.user import UserInDB, UserRole
from app.core.config import settings
from app.services.user_service import get_user_by_email

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login", auto_error=False)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

# Custom cookie extractor
async def get_token_from_cookie(
    access_token: Optional[str] = Cookie(None),
) -> Optional[str]:
    return access_token

async def get_current_user(
    token: Optional[str] = Depends(get_token_from_cookie),
    db: Any = None,
) -> Optional[UserInDB]:
    if not token:
        return None
    
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
    except (JWTError, ValidationError):
        return None
    
    user = await get_user_by_email(user_id, db)
    return user

# Authentication dependency that raises an exception if not authenticated
async def require_authenticated_user(
    current_user: Optional[UserInDB] = Depends(get_current_user)
) -> UserInDB:
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return current_user

# Role-based dependency
def has_role(required_roles: list[UserRole]):
    async def role_checker(current_user: UserInDB = Depends(require_authenticated_user)):
        if "admin" in current_user.roles:  # Admin has all permissions
            return current_user
            
        for role in required_roles:
            if role in current_user.roles:
                return current_user
                
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions",
        )
    return role_checker

# app/api/endpoints/auth.py
from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, require_authenticated_user, verify_password, get_current_user
from app.db.database import get_db
from app.models.user import UserResponse, UserInDB
from app.services.user_service import get_user_by_email
from app.core.config import settings

router = APIRouter()

@router.post("/login")
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
) -> Any:
    user = await get_user_by_email(form_data.username, db)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.email, expires_delta=access_token_expires
    )
    
    # Set cookie with the token
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,  # Cannot be accessed by JavaScript
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        expires=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        secure=settings.COOKIE_SECURE,  # Should be True in production with HTTPS
        samesite="lax"  # Prevents CSRF attacks
    )
    
    return {
        "message": "Successfully logged in",
        "user": UserResponse.from_orm(user)
    }

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: UserInDB = Depends(require_authenticated_user)) -> Any:
    return current_user

@router.post("/logout")
async def logout(response: Response):
    # Clear the auth cookie
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite="lax"
    )
    return {"message": "Successfully logged out"}

# app/core/config.py
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    APP_NAME: str = "RBAC FastAPI Backend"
    SECRET_KEY: str = "your-secret-key"  # In production, use a secure random key
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]  # Frontend URL
    COOKIE_SECURE: bool = False  # Set to True in production with HTTPS
    
    # Database settings
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost/rbac_db"
    
    class Config:
        env_file = ".env"

settings = Settings()

# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api import api_router
from app.core.config import settings

app = FastAPI(title=settings.APP_NAME)

# Set up CORS - important for cookie authentication
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,  # Important for cookies
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to RBAC API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)