
from fastapi import APIRouter, Request

from models.inventory.inventory import InventoryModel
from services.inventory.inventory import InventoryService
router=APIRouter()
inventory=InventoryService()
@router.post('/new-items')
async def createbulk(data:list[InventoryModel]):
    result = await inventory.bulk_create_inventory(data)
    return "new items updated"
@router.post('/new-item')
async def createitem(data:InventoryModel):
    result=await inventory.create_inventory(data)
    return "new item created"

@router.put('/update-item')
async def updateitem(inventoryId:str,data:InventoryModel):
    result=await inventory.update_inventory(inventoryId,data)
    return "item updated successfully"

@router.get('/')
async def getall():
    result=await inventory.get_all_inventories
    return "got all items"

@router.get('/{productid}')
async def getone():
    result=inventory.get_inventory()
    return "got one item"

@router.delete('/{productid}')
async def deleteone():
    result=inventory.delete_inventory()
    return "deleted one"

@router.delete('/')
async def deletemany():
    result=inventory.bulk_delete_inventory()
    return "deleted many"