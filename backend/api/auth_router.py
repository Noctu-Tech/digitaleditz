from fastapi import APIRouter
router=APIRouter()

@router.post('/signup')
def createnew():
    return 0

@router.post('/login')
def login():
    return 0
