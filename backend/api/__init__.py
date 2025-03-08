from fastapi import FastAPI
from .admin_router import router as admin_router 
from .inventory_router import router as inventory_router
from .user_router import router as user_router
from .auth_router import router as auth_router
from .help_router import router as help_router
from .payment_router import router as payment_router
from .workflow_router import router as workflow_router
from .chat_router import router as chat_router

app = FastAPI()
def create_app():
    app.include_router(admin_router,prefix="/admin",tags=["Admin"])
    app.include_router(chat_router,prefix="/chat",tags=["Chat"])
    app.include_router(inventory_router,prefix="/inventory",tags=["Inventory"])
    app.include_router(user_router,prefix="/user",tags=["User"])
    app.include_router(auth_router,prefix="/auth",tags=["Auth"]) 
    app.include_router(help_router,prefix="/help",tags=["Help"])
    app.include_router(payment_router,prefix="/payment",tags=["Payment"])
    app.include_router(workflow_router,prefix="/workflow",tags=["Workflow"])
    return app