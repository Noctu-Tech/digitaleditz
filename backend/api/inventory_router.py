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

@router.get('/get-all')
async def getall():
    return "got all items"

@router.get('/get-one')
async def getone():
    return "got one item"

@router.delete('/delete-one')
async def deleteone():
    return "deleted one"

@router.delete('/delete-many')
async def deletemany():
    return "deleted many"