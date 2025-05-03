from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from services.auth.auth_utils import verify_and_refresh_tokens

from .admin_router import router as client_router
from .inventory_router import router as inventory_router
from .user_router import router as user_router
from .auth_router import auth_router
from .help_router import router as help_router
from .payment_router import router as payment_router
from .workflow_router import router as workflow_router
from .notification_router import router as notification_router
from .upload_router import router as file_router
from .whatsapp import whatsapp_router
def create_app():
    app = FastAPI()

    # CORS Configuration (Adjust for production)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000","https://e996-2401-4900-80a9-2ba8-f800-6aae-a637-5fae.ngrok-free.app"],  # Adjust for production
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["Set-Cookie"],
    )

    # Routers with Authentication (where applicable)
    app.include_router(client_router, prefix="/client", tags=["Client"], dependencies=[Depends(verify_and_refresh_tokens)])
    app.include_router(inventory_router, prefix="/inventory", tags=["Inventory"], dependencies=[Depends(verify_and_refresh_tokens)])
    app.include_router(user_router, prefix="/user", tags=["User"], dependencies=[Depends(verify_and_refresh_tokens)])
    app.include_router(help_router, prefix="/help", tags=["Help"], dependencies=[Depends(verify_and_refresh_tokens)])
    app.include_router(payment_router, prefix="/payment", tags=["Payment"], dependencies=[Depends(verify_and_refresh_tokens)])
    app.include_router(workflow_router, prefix="/workflow", tags=["Workflow"], dependencies=[Depends(verify_and_refresh_tokens)])
    app.include_router(notification_router, prefix="/notification", tags=["Notification"], dependencies=[Depends(verify_and_refresh_tokens)])
    app.include_router(whatsapp_router,prefix='/whatsapp',tags=['Whatsapp'])
# Routers without Authentication
    app.include_router(auth_router, prefix="/auth", tags=["Auth"])
    app.include_router(file_router, prefix="/file", tags=["file"])


    return app
