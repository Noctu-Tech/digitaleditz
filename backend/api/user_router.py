from bson import ObjectId, errors
from fastapi import APIRouter, Depends, HTTPException, Response, status
from typing import Any, Dict, List, Optional
from fastapi.params import Query
from fastapi.responses import JSONResponse
from pydantic import create_model, BaseModel

from api.auth_router import UserData
from permission import UserRole
from database.mongo import get_database
from services.auth.auth_utils import extract_user_data_from_token
from services.user.user import Onboard
from models.user.user import OnboardSchema

router = APIRouter()
user_collection = get_database("users")
customer_collection=get_database("customer")
profile_collection=get_database("profile")
UpdateUser = create_model(
    'UpdateUser',
    **{field: (Optional[type_], None) for field, type_ in UserData.__annotations__.items()}
)

UpdateBusiness = create_model(
    'UpdateBusiness',
    **{field: (Optional[type_], None) for field, type_ in OnboardSchema.__annotations__.items()}
)

class DeleteManyRequest(BaseModel):
    user_ids: List[str]

async def handle_exception(e: Exception, detail: str, status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR):
    """Centralize exception handling."""
    raise HTTPException(status_code=status_code, detail=f"{detail}: {str(e)}")

async def check_admin_role(user_data: dict):
    """Check if the user is an admin."""
    
    user_id, authority= user_data['user_id'], user_data['authority']
    user = user_collection.find_one({"_id": ObjectId(user_id)})
    if not (user and user["u_role"] == authority and authority == UserRole.ADMIN):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    return True
@router.get('/all')
async def get_many(user_data: dict = Depends(extract_user_data_from_token)):
    try:
        isAdmin = await check_admin_role(user_data)
        print("@admin", isAdmin)
        
        if isAdmin:
            # Get admin users with properly converted ObjectIds
            admin = list(user_collection.aggregate([
                {"$addFields": {"_id": {"$toString": "$_id"}}},
                {"$project": {"password": 0}}
            ]))
            
            # Get customers with properly converted ObjectIds
            customers = list(customer_collection.aggregate([
                {"$addFields": {"_id": {"$toString": "$_id"}}}
            ]))
            
            data = admin + customers
        else:
            user_id = user_data['user_id']
            # Also convert ObjectIds for customer data
            data = list(customer_collection.aggregate([
                {"$match": {"user_id": user_id}},
                {"$addFields": {"_id": {"$toString": "$_id"}}}
            ]))
            
        return JSONResponse(content=data)
    except HTTPException as he:
        raise he
    except Exception as e:
        await handle_exception(e, "Error fetching users")
@router.get('/me')
async def get_my_profile(user_data: dict = Depends(extract_user_data_from_token)):
    try:
        user_id, tok = user_data['user_id'], user_data['authority']
        user = user_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        user["_id"] = str(user["_id"])
        del user["password"]
        return JSONResponse(content=user)
    except HTTPException as he:
        raise he
    except Exception as e:
        await handle_exception(e, "Error fetching profile")

@router.post('/create', status_code=status.HTTP_201_CREATED)
async def create_new(data: OnboardSchema, user_data: dict = Depends(extract_user_data_from_token)):
    try:
        user_id, tok = user_data['user_id'], user_data['authority']
        # new_data = data.model_dump()
        result = await Onboard(data, user_id)
        return JSONResponse(content={"message": "User onboarded successfully", "data": result})
    except HTTPException as he:
        raise he
    except Exception as e:
        await handle_exception(e, "Error onboarding user")

@router.put('/update/userinfo')
async def update_user_info(data: UpdateUser, user_data: dict = Depends(extract_user_data_from_token)):
    try:
        # await check_admin_role(user_data)
        user_id, tok = user_data['user_id'], user_data['authority']
        result = user_collection.update_one({"_id": ObjectId(user_id)}, {'$set': data.model_dump(exclude_unset=True)})
        if result.matched_count:
            if result.modified_count:
                return JSONResponse(content={"message": "User updated successfully"})
            else:
                raise HTTPException(status_code=status.HTTP_304_NOT_MODIFIED, detail="No changes were made")
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    except HTTPException as he:
        raise he
    except Exception as e:
        await handle_exception(e, "Error updating user info")

@router.put('/update/businessinfo')
async def update_business_info(data: UpdateBusiness, user_data: dict = Depends(extract_user_data_from_token)):
    try:
        # await check_admin_role(user_data)
        
        user_id, tok = user_data['user_id'], user_data['authority']
        result = user_collection.update_one({"_id": ObjectId(user_id)}, {'$set': data.model_dump(exclude_unset=True)})
        if result.matched_count:
            if result.modified_count:
                return JSONResponse(content={"message": "Business info updated successfully"})
            else:
                raise HTTPException(status_code=status.HTTP_304_NOT_MODIFIED, detail="No changes were made")
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    except HTTPException as he:
        raise he
    except Exception as e:
        await handle_exception(e, "Error updating business info")

@router.delete("/")
async def delete_many(data: DeleteManyRequest, user_data: dict = Depends(extract_user_data_from_token)):
    try:
        await check_admin_role(user_data)
        user_id, tok = user_data['user_id'], user_data['authority']
        if user_id in data.user_ids:
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Cannot delete yourself")
        object_ids = [ObjectId(uid) for uid in data.user_ids]
        result = user_collection.delete_many({"_id": {"$in": object_ids}})
        return JSONResponse(content={"deleted_count": result.deleted_count})
    except HTTPException as he:
        raise he
    except Exception as e:
        await handle_exception(e, "Error deleting users")

@router.delete("/one/{user_id}")
async def delete_one(user_id: str, user_data: tuple = Depends(extract_user_data_from_token)):
    try:
        await check_admin_role(user_data)
        current_user_id, _ = user_data
        if current_user_id == user_id:
            raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Cannot delete yourself")
        object_id = ObjectId(user_id)
        result = user_collection.delete_one({"_id": object_id})
        if result.deleted_count:
            return JSONResponse(content={"message": "User deleted successfully"})
        else:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    except HTTPException as he:
        raise he
    except Exception as e:
        await handle_exception(e, "Error deleting user")

@router.get('/me/profile')
async def get_business_profile(
    user_data: tuple = Depends(extract_user_data_from_token)
    ):
    try:
        user_id, tok = user_data['user_id'], user_data['authority']
        user=user_collection.find_one({"_id":ObjectId(user_id)})
        profile = profile_collection.find_one({'user_id':ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        
        print(user)
        print(profile)
        del profile["user_id"]
        del user['_id']
        del user['password']
        profile['_id']=str(profile['_id'])
        print(user)
        print(profile)
        combined_data={**user,**profile}
        return JSONResponse(content=combined_data)
    except HTTPException as he:
        raise he
    except Exception as e:
        await handle_exception(e, "Error fetching user")


@router.get("/verify-email")
def verify_email(token: str = Query(...)):
    try:
        email = decode_email_token(token)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Activate user
    result = user_collection.update_one({"email":email},{"$set"{"u_verified": "VERIFIED"}})
    if result.matched_count==1:
        return {"message": f"Email {email} successfully verified!"}
    else:
        raise HTTPException(status_code=404, detail="invalid email or user email not found")