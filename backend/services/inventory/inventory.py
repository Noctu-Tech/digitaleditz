from typing import List, Optional
from fastapi import HTTPException, Depends
from models.inventory.inventory import InventoryModel
from database.mongo import get_database
from bson import ObjectId
# auth/auth_utils.py

class InventoryService:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db.inventory

    async def create_inventory(self, inventory: InventoryModel, user_id: str = Depends(verify_token)) -> dict:
        inventory_dict = inventory.dict()
        inventory_dict['user_id'] = user_id
        result = await self.collection.insert_one(inventory_dict)
        return {"id": str(result.inserted_id), **inventory_dict}

    async def get_inventory(self, inventory_id: str, user_id: str = Depends(verify_token)) -> Optional[dict]:
        inventory = await self.collection.find_one({"_id": ObjectId(inventory_id)})
        if not inventory:
            raise HTTPException(status_code=404, detail="Inventory not found")
        if inventory.get('user_id') != user_id:
            raise HTTPException(status_code=403, detail="Not authorized to access this inventory")
        return {**inventory, "id": str(inventory["_id"])}

    async def get_all_inventories(self, skip: int = 0, limit: int = 10, user_id: str = Depends(verify_token)) -> List[dict]:
        cursor = self.collection.find({"user_id": user_id}).skip(skip).limit(limit)
        inventories = await cursor.to_list(length=limit)
        return [{**inv, "id": str(inv["_id"])} for inv in inventories]

    async def update_inventory(self, inventory_id: str, inventory: InventoryModel, user_id: str = Depends(verify_token)) -> dict:
        existing = await self.collection.find_one({"_id": ObjectId(inventory_id)})
        if not existing:
            raise HTTPException(status_code=404, detail="Inventory not found")
        if existing.get('user_id') != user_id:
            raise HTTPException(status_code=403, detail="Not authorized to update this inventory")
            
        update_data = inventory.dict(exclude_unset=True)
        await self.collection.update_one(
            {"_id": ObjectId(inventory_id)},
            {"$set": update_data}
        )
        return await self.get_inventory(inventory_id, user_id)

    async def delete_inventory(self, inventory_id: str, user_id: str = Depends(verify_token)) -> dict:
        existing = await self.collection.find_one({"_id": ObjectId(inventory_id)})
        if not existing:
            raise HTTPException(status_code=404, detail="Inventory not found")
        if existing.get('user_id') != user_id:
            raise HTTPException(status_code=403, detail="Not authorized to delete this inventory")
            
        await self.collection.delete_one({"_id": ObjectId(inventory_id)})
        return {"message": "Inventory deleted successfully"}

    async def bulk_create_inventory(self, inventories: List[InventoryModel], user_id: str = Depends(verify_token)) -> List[dict]:
        inventory_dicts = [inv.dict() | {"user_id": user_id} for inv in inventories]
        result = await self.collection.insert_many(inventory_dicts)
        return [{"id": str(id)} for id in result.inserted_ids]

    async def bulk_delete_inventory(self, inventory_ids: List[str], user_id: str = Depends(verify_token)) -> dict:
        object_ids = [ObjectId(id) for id in inventory_ids]
        result = await self.collection.delete_many({
            "_id": {"$in": object_ids},
            "user_id": user_id
        })
        return {"deleted_count": result.deleted_count}