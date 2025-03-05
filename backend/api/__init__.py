from fastapi import FastAPI
from api.admin_router import router as admin_router 
from api.inventory_router import router as inventory_router
from api.user_router import router as user_router
from api.auth_router import router as auth_router
from api.help_router import router as help_router
from api.payment_router import router as payment_router
from workflow_router import router as workflow_router

app = FastAPI()
app.include_router("/admin",admin_router)
app.include_router("/inventory",inventory_router)
app.include_router("/user",user_router)
app.include_router("/auth",auth_router)
app.include_router("/help",help_router)
app.include_router("/payment",payment_router)
app.include_router("/workflow",workflow_router)
