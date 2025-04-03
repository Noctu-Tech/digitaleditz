from fastapi import APIRouter, Request, HTTPException, status
from typing import Dict, Any

from utils.sample_pfp import get_sample_pfp
from services.auth.auth_utils import extract_token
from services.user.user import Onboard
from models.user.user import OnboardSchema, Status, Subscription, UserOnboardingSchema, UserRole, Verified
router=APIRouter()

@router.get('/')
async def getmany():
    return "get many users detail"
@router.get('/me')
async def getone():
    return "get one user"

@router.post('/create', status_code=status.HTTP_201_CREATED)
async def createnew(req: Request, data: OnboardSchema) -> Dict[str, Any]:
    try:
        print(req)
        userId = "somethinghere"
        if not userId:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token"
            )
        print("@data",data)
        uData = {
            'u_id':userId,
            'u_pfp': "Something here",
            'u_subscription': Subscription.FREE,
            'u_verified': Verified.UNVERIFIED,
            'u_role': UserRole.CLIENT,
            'u_status': Status.DEACTIVATED            
        }
        print(data,uData)    
        newData = {**uData, **data.model_dump()} 
        print("@NEWDATA",newData)
        result = await Onboard(newData, userId)
        return result
        
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}"
        )

@router.put('/update')
async def update():
    return "update user"
@router.delete("/")
async def deletemany():
    return "bulk delete"
@router.delete("/{userid}")
async def deleteone():
    return "delete user"