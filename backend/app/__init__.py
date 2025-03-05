from fastapi import FastAPI
from app.inventory_router import router as inventory_router
from app.user_router import router as user_router
app = FastAPI()

app.include_router("/inventory",inventory_router)
app.include_router("/user",user_router)
