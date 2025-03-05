from fastapi import APIRouter
router=APIRouter()
@router.get('/get-many')
async def getmany():
    return "get many users detail"
@router.get('/get-one')
async def getone():
    return "get one user"

@router.post('/create')
async def createnew():
    return "create new"

@router.put('/update')
async def update():
    return "update user"