from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel

# Initialize router
router = APIRouter()

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['your_database_name']
collection = db['your_collection_name']

# Data model
class Item(BaseModel):
    name: str
    description: str
    price: float

@router.post("/book", response_model=Item)
async def add_item(item: Item):
    try:
        # Convert the item to dictionary and insert into MongoDB
        item_dict = item.dict()
        result = collection.insert_one(item_dict)
        
        if result.inserted_id:
            return item
        else:
            raise HTTPException(status_code=400, detail="Failed to add item")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))