
from fastapi import APIRouter
router=APIRouter()
@router.post('/new-items')
async def createbulk():
    return "new items updated"
@router.post('/new-item')
async def createitem():

    return "new item created"

@router.put('/update-item')
async def updateitem():
    return "item updated successfully"

@router.get('/')
async def getall():
    return "got all items"

@router.get('/{productid}')
async def getone():
    return "got one item"

@router.delete('/{productid}')
async def deleteone():
    return "deleted one"

@router.delete('/')
async def deletemany():
    return "deleted many"