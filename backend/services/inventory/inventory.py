from typing import List
from fastapi import HTTPException
from bson import ObjectId
from permission import UserRole
from models.inventory.inventory import InventoryModel
from database.mongo import get_database

class InventoryService:
    def __init__(self):
        self.collection = get_database("inventory_collection")

    async def create_inventory(self, inventory: InventoryModel, userData: dict):
        user_id = userData["user_id"]
        inventory_dict = {**inventory.model_dump(), "user_id": ObjectId(user_id)}
        result = self.collection.insert_one(inventory_dict)
        return str(result.inserted_id)

    def get_inventory(self, inventory_id: str, userData: dict) -> dict:
        user_id, authority = userData["user_id"], userData["authority"]
        try:
            obj_id = ObjectId(inventory_id)
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid inventory ID")

        inventory = self.collection.find_one({"_id": obj_id})
        if not inventory:
            raise HTTPException(status_code=404, detail="Inventory not found")

        # Authority check
        if authority != UserRole.ADMIN and str(inventory.get("user_id")) != user_id:
            raise HTTPException(status_code=403, detail="Unauthorized to access this inventory")

        inventory["_id"] = str(inventory["_id"])
        inventory["user_id"] = str(inventory["user_id"])
        return inventory

    def get_inventories(self, userData: dict) -> List[dict]:
        user_id, authority = userData["user_id"], userData["authority"]
        query = {} if authority == UserRole.ADMIN else {"user_id": ObjectId(user_id)}
        inventories = list(self.collection.find(query))

        for item in inventories:
            item["_id"] = str(item["_id"])
            item["user_id"] = str(item["user_id"])
        return inventories

    def update_inventory(self, inventory_id: str, inventory: InventoryModel, userData: dict) -> dict:
        user_id, authority = userData["user_id"], userData["authority"]
        try:
            obj_id = ObjectId(inventory_id)
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid inventory ID")

        existing = self.collection.find_one({"_id": obj_id})
        if not existing:
            raise HTTPException(status_code=404, detail="Inventory not found")

        # Authority check
        if authority != UserRole.ADMIN and str(existing.get("user_id")) != user_id:
            raise HTTPException(status_code=403, detail="Unauthorized to update this inventory")

        self.collection.update_one({"_id": obj_id}, {"$set": inventory.model_dump()})
        return self.get_inventory(inventory_id, userData)

    def delete_inventory(self, inventory_id: str, userData: dict) -> dict:
        user_id = userData["user_id"]
        authority = userData["authority"]

        try:
            obj_id = ObjectId(inventory_id)
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid inventory ID")

        if authority != UserRole.ADMIN:
            result = self.collection.delete_one({"_id": obj_id, "user_id": ObjectId(user_id)})
            if result.deleted_count == 0:
                raise HTTPException(status_code=404, detail="Not found or unauthorized")
        else:
            result = self.collection.delete_one({"_id": obj_id})
            if result.deleted_count == 0:
                raise HTTPException(status_code=404, detail="Inventory not found")

        return {"message": "Inventory deleted successfully"}

    def bulk_create_inventory(self, inventories: List[InventoryModel], userData: dict) -> List[dict]:
        user_id = userData["user_id"]
        inventory_dicts = [
            {**inv.model_dump(), "user_id": ObjectId(user_id)} for inv in inventories
        ]
        result = self.collection.insert_many(inventory_dicts)
        return [{"id": str(_id)} for _id in result.inserted_ids]

    def bulk_delete_inventory(self, inventory_ids: List[str], userData: dict) -> dict:
        user_id = userData["user_id"]
        authority = userData["authority"]

        try:
            object_ids = [ObjectId(id) for id in inventory_ids]
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid ID in request")

        if authority == UserRole.ADMIN:
            result = self.collection.delete_many({"_id": {"$in": object_ids}})
        else:
            result = self.collection.delete_many({
                "_id": {"$in": object_ids},
                "user_id": ObjectId(user_id)
            })

        return {"deleted_count": result.deleted_count}
