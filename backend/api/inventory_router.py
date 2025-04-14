
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

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
    return result.inserted_id

@router.put('/update-item')
async def updateitem(inventoryId:str,data:InventoryModel):
    result=await inventory.update_inventory(inventoryId,data)
    return "item updated successfully"

@router.get('/')
async def getall():
    result=inventory.get_inventories()
    return JSONResponse(result)

@router.get('/{productId}')
async def getone(productId:str):
    result=inventory.get_inventory(productId)
    return JSONResponse(result)
 
@router.delete('/{productid}')
async def deleteone():
    result=inventory.delete_inventory()
    return "deleted one"

@router.delete('/')
async def deletemany():
    result=inventory.bulk_delete_inventory()
    return "deleted many"