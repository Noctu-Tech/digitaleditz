from fastapi import APIRouter, Request, HTTPException, status
from typing import Dict, Any

from utils.sample_pfp import get_sample_pfp
from services.auth.auth_utils import verify_token
from services.user.user import Onboard
from models.user.user import OnboardSchema, Status, Subscription, UserOnboardingSchema, UserRole, Verified
router=APIRouter()

@router.get('/')
async def getmany():
    return "get many users detail"
@router.get('/{userid}')
async def getone():
    return "get one user"

@router.post('/create', status_code=status.HTTP_201_CREATED)
async def createnew(req: Request, data: OnboardSchema) -> Dict[str, Any]:
    try:
        token = req.headers.get("Authorization")
        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authorization header missing"
            )
            
        userId = verify_token(token)
        if not userId:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token"
            )
            
        uData = {
            'u_pfp': get_sample_pfp(userId),
            'u_subscription': Subscription.FREE,
            'u_verified': Verified.UNVERIFIED,
            'u_role': UserRole.CLIENT,
            'u_status': Status.DEACTIVATED            
        }
        newData = {**uData, **data}
        
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