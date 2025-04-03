from fastapi import APIRouter
router=APIRouter()

@router.get("/{userid}")
async def getworkflow():
    return "something here"

@router.post("/create")
async def saveworkflow():
    return "something here"

@router.put("/{userid}")
async def updateworkflow():
    return "something here"

@router.delete("/{userid}")
async def deleteworkflow():
    return "something here"