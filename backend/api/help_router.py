from fastapi import APIRouter
router = APIRouter()

@router.get("/")
def getall():
    return "al queries"

@router.get("/{userid}")
def getforuserid():
    return "get queries for user id"

@router.post("{userid}")
def creatqueryuserid():
    return "create query for user id"