from fastapi import APIRouter, Request
router = APIRouter()


@router.post('/create-new')
def createnew(req:Request):

    return 0

@router.get("/view")
def getone():
    return 0

@router.get("/view-many")
def getmany():
    return 0

@router.put('/update')
def updatestatus():
    return 0

