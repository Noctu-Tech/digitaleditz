from fastapi import APIRouter
router=APIRouter()

@router.get('/')
async def getmany():
    return "get many users detail"
@router.get('/{userid}')
async def getone():
    return "get one user"

@router.post('/create')
async def createnew():
    return "create new"

@router.put('/update')
async def update():
    return "update user"
@router.delete("/")
async def deletemany():
    return "bulk delete"
@router.delete("/{userid}")
async def deleteone():
    return "delete user"