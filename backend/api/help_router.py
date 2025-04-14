from fastapi import APIRouter, Request

from models.help.query import HelpModel
router = APIRouter()


@router.post('/create-new')
def createnew(data:HelpModel):

    return 0

@router.get("/view")
def getone():
    return 0

@router.get("/view-many")
def getmany():
    return 0

@router.put('/update')
def update():
    return 0

