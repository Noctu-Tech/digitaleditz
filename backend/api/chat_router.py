from fastapi import APIRouter

router=APIRouter()
#  may be use websockets here 


@router.get("/chat-history/{userid}")
def chathistory():
    return "chat history"

@router.get("/{userid}")
def chathistory():
    return "one message"

@router.post("/send/{userid}")
def sendchat():
    return "chat send"
