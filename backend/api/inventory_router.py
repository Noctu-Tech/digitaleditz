from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import JSONResponse
from typing import List

from pydantic import BaseModel

from services.inventory.inventory import InventoryService
from services.auth.auth_utils import extract_user_data_from_token
from models.inventory.inventory import InventoryModel
from api.user_router import handle_exception

router = APIRouter()
inventory_service = InventoryService()
class BulkDeleteRequest(BaseModel):
    ids: list[str]

@router.post('/new-item', summary="Create a single inventory item")
async def create_item(
    data: InventoryModel,
    userData: dict = Depends(extract_user_data_from_token)
):
    try:
        result = await inventory_service.create_inventory(data, userData)
        return JSONResponse(content={"id": result})
    except Exception as e:
        await handle_exception(e, "Error creating inventory item")


@router.post('/bulk', summary="Create multiple inventory items")
async def create_bulk_items(
    items: List[InventoryModel],
    userData: dict = Depends(extract_user_data_from_token)
):
    try:
        result = await inventory_service.bulk_create_inventory(items, userData)
        return JSONResponse(content=result)
    except Exception as e:
        await handle_exception(e, "Error creating bulk inventory")


@router.get('/', summary="Get all inventory items (user or admin)")
async def get_all_items(userData: dict = Depends(extract_user_data_from_token)):
    try:
        result = inventory_service.get_inventories(userData)
        return JSONResponse(content=result)
    except Exception as e:
        await handle_exception(e, "Error fetching all inventories")


@router.get('/{productId}', summary="Get a single inventory item by ID")
async def get_single_item(
    productId: str,
    userData: dict = Depends(extract_user_data_from_token)
):
    try:
        result = inventory_service.get_inventory(productId, userData)
        return JSONResponse(content=result)
    except Exception as e:
        await handle_exception(e, "Error fetching inventory")


@router.put('/{inventoryId}', summary="Update an inventory item")
async def update_item(
    inventoryId: str,
    data: InventoryModel,
    userData: dict = Depends(extract_user_data_from_token)
):
    try:
        result = inventory_service.update_inventory(inventoryId, data, userData)
        return JSONResponse(content=result)
    except Exception as e:
        await handle_exception(e, "Error updating inventory")


@router.delete('/{productId}', summary="Delete an inventory item by ID")
async def delete_item(
    productId: str,
    userData: dict = Depends(extract_user_data_from_token)
):
    try:
        result = inventory_service.delete_inventory(productId, userData)
        return JSONResponse(content=result)
    except Exception as e:
        await handle_exception(e, "Error deleting inventory")

@router.delete('/', summary="Bulk delete inventory items")
async def delete_bulk_items(
    request: BulkDeleteRequest,
    userData: dict = Depends(extract_user_data_from_token)
):
    try:
        result = inventory_service.bulk_delete_inventory(request.ids, userData)
        return JSONResponse(content=result)
    except Exception as e:
        await handle_exception(e, "Error bulk deleting inventory")