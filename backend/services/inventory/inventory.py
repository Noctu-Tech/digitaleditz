from typing import List, Optional
from fastapi import HTTPException, Depends
from services.auth.auth_utils import verify_and_refresh_tokens
from models.inventory.inventory import InventoryModel
from database.mongo import get_database
from bson import ObjectId
# auth/auth_utils.py

class InventoryService:
    def __init__(self):
        self.db = get_database("inventory_collection")
        self.collection = self.db.inventory

    def create_inventory(self, inventory: InventoryModel, user_id: str = Depends(verify_and_refresh_tokens)
                               ) :
        inventory_dict = inventory.dict()
        inventory_dict['user_id'] = user_id
        inventory_dict=inventory.model_dump()
        result = self.collection.insert_one(inventory_dict)
        return {"id": str(result.inserted_id), **inventory_dict}

    def get_inventory(self, inventory_id: str,
                    #    user_id: str = Depends(verify_and_refresh_tokens)
                       ) -> dict:
        inventory = self.collection.find_one({"_id": ObjectId(inventory_id)})
        if not inventory:
            raise HTTPException(status_code=404, detail="Inventory not found")
        # if inventory.get('user_id') != user_id:
        #     raise HTTPException(status_code=403, detail="Not authorized to access this inventory")
        inventory["_id"]=str(inventory["_id"])
        return inventory
    def get_all_inventory(self,skip: int = 0, limit: int = 10,):
        inventory =  self.collection.find().skip
        if not inventory:
            raise HTTPException(status_code=404, detail="Inventory not found")
        return {**inventory, "id": str(inventory["_id"])}

    def get_inventories(self, user_id: str = Depends(verify_and_refresh_tokens)) -> List[dict]:
        inventories = self.collection.find({
            # "user_id": user_id    
                                       }).to_list()
        for x in inventories:
            x["_id"]=str(x["_id"])
            
        return inventories

    def update_inventory(self, inventory_id: str, inventory: InventoryModel, user_id: str = Depends(verify_and_refresh_tokens)) -> dict:
        existing =  self.collection.find_one({"_id": ObjectId(inventory_id)})
        if not existing:
            raise HTTPException(status_code=404, detail="Inventory not found")
        if existing.get('user_id') != user_id:
            raise HTTPException(status_code=403, detail="Not authorized to update this inventory")
            
        update_data = inventory.model_dump()
        self.collection.update_one(
            {"_id": ObjectId(inventory_id)},
            {"$set": update_data}
        )
        return  self.get_inventory(inventory_id, user_id)

    def delete_inventory(self, inventory_id: str, user_id: str = Depends(verify_and_refresh_tokens)) -> dict:
        existing =  self.collection.find_one({"_id": ObjectId(inventory_id)})
        if not existing:
            raise HTTPException(status_code=404, detail="Inventory not found")
        if existing.get('user_id') != user_id:
            raise HTTPException(status_code=403, detail="Not authorized to delete this inventory")
            
        self.collection.delete_one({"_id": ObjectId(inventory_id)})
        return {"message": "Inventory deleted successfully"}

    def bulk_create_inventory(self, inventories: List[InventoryModel], user_id: str = Depends(verify_and_refresh_tokens)) -> List[dict]:
        inventory_dicts = [inv.dict() | {"user_id": user_id} for inv in inventories]
        result =  self.collection.insert_many(inventory_dicts)
        return [{"id": str(id)} for id in result.inserted_ids]

    def bulk_delete_inventory(self, inventory_ids: List[str], user_id: str = Depends(verify_and_refresh_tokens)) -> dict:
        object_ids = [ObjectId(id) for id in inventory_ids]
        result =  self.collection.delete_many({
            "_id": {"$in": object_ids},
            "user_id": user_id
        })
        return {"deleted_count": result.deleted_count}