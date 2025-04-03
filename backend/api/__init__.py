# from .demo_router import demo_router
from services.auth.auth_utils import verify_token
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
    app.include_router(inventory_router,prefix="/inventory",tags=["Inventory"],dependencies=[Depends(verify_token)])
    app.include_router(user_router,prefix="/user",tags=["User"])
    app.include_router(auth_router,prefix="/auth",tags=["Auth"]) 
    app.include_router(help_router,prefix="/help",tags=["Help"],dependencies=[Depends(verify_token)])
    app.include_router(payment_router,prefix="/payment",tags=["Payment"],dependencies=[Depends(verify_token)])
    app.include_router(workflow_router,prefix="/workflow",tags=["Workflow"],dependencies=[Depends(verify_token)])
    # app.include_router(demo_router,prefix="/demo",tags=["Demo"])
    app.include_router(whatsapp_router,prefix="/whatsapp",tags=["WhatsApp"],dependencies=[Depends(verify_token)])
    return app