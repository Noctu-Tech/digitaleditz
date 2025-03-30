# from .demo_router import demo_router
from permission import TeapotUserAgentPermission
from fastapi import FastAPI,Depends
from fastapi_contrib.permissions import PermissionsDependency
from .admin_router import router as admin_router 
from .inventory_router import router as inventory_router
from .user_router import router as user_router
from .auth_router import auth_router
from .help_router import router as help_router
from .payment_router import router as payment_router
from .workflow_router import router as workflow_router
from .chat_router import router as chat_router
from .whatsapp import whatsapp_router

from middleware.middleware import AuthorityMiddleware

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
# app.add_middleware(AuthorityMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def create_app():
    app.include_router(admin_router,prefix="/admin",tags=["Admin"])
    app.include_router(chat_router,prefix="/chat",tags=["Chat"])
    app.include_router(inventory_router,prefix="/inventory",tags=["Inventory"])
    app.include_router(user_router,prefix="/user",tags=["User"])
    app.include_router(auth_router,prefix="/auth",tags=["Auth"]) 
    app.include_router(help_router,prefix="/help",tags=["Help"])
    app.include_router(payment_router,prefix="/payment",tags=["Payment"])
    app.include_router(workflow_router,prefix="/workflow",tags=["Workflow"])
    # app.include_router(demo_router,prefix="/demo",tags=["Demo"])
    app.include_router(whatsapp_router,prefix="/whatsapp",tags=["WhatsApp"])
    return app