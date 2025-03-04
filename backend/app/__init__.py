from fastapi import FastAPI
from app.inventory_router import router as inventory_router
app = FastAPI()

app.get("/inventory",inventory_router)