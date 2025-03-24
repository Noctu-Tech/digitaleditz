# from fastapi import APIRouter, Request, Response, Form
# from fastapi.responses import PlainTextResponse

# whatsapp_router = APIRouter()

# @whatsapp_router.post("/webhook")
# async def webhook(
#     request: Request,
#     Body: str = Form(None),
#     From: str = Form(None),
#     To: str = Form(None)
# ):
#     """
#     This is the webhook that will receive the incoming messages from WhatsApp via Twilio.
#     """
#     # Twilio sends form data, not JSON
#     sender_number = From  # The WhatsApp user's number
#     receiver_number = To  # Your Twilio WhatsApp number
#     message_body = Body
    
#     print(f"Received message: '{message_body}' from {sender_number} to {receiver_number}")
    
#     # Return a TwiML response to send a message back
#     twiml_response = """<?xml version="1.0" encoding="UTF-8"?>
#     <Response>
#         <Message to="{sender}">Thank you for your message! This is an automated reply.</Message>
#     </Response>
#     """.format(sender=sender_number)
    
#     return PlainTextResponse(content=twiml_response, media_type="application/xml")





# from fastapi import APIRouter, Request, Response, Form
# from twilio.rest import Client
# import os

# whatsapp_router = APIRouter()

# # Your Twilio credentials
# account_sid = "AC2c2c98ca196721d498bfc561046b2838"
# auth_token = "3eae96052a570c5831f5cfc9f8ebd33e"
# twilio_client = Client(account_sid, auth_token)

# @whatsapp_router.post("/webhook")
# async def webhook(
#     request: Request,
#     Body: str = Form(None),
#     From: str = Form(None),
#     To: str = Form(None)
# ):
#     """
#     This is the webhook that will receive the incoming messages from WhatsApp via Twilio.
#     """
#     # Twilio sends form data, not JSON
#     sender_number = From  # The WhatsApp user's number
#     receiver_number = To  # Your Twilio WhatsApp number
#     message_body = Body
    
#     print(f"Received message: '{message_body}' from {sender_number} to {receiver_number}")
    
#     # Send a reply using the Twilio API
#     message = twilio_client.messages.create(
#         body="Thank you for your message! This is an automated reply.",
#         from_=receiver_number,  # Your Twilio WhatsApp number
#         to=sender_number        # The WhatsApp user's number
#     )
    
#     print(f"Message sent with SID: {message.sid}")
    
#     # Return a simple acknowledgment
#     return Response(status_code=200)




from fastapi import APIRouter, Request, Form
from fastapi.responses import PlainTextResponse
from services.workflow.workflow import workflow_manager, Workflow, WorkflowStep, WorkflowStage

whatsapp_router = APIRouter()

@whatsapp_router.post("/webhook")
async def webhook(
    request: Request,
    Body: str = Form(None),
    From: str = Form(None),
    To: str = Form(None)
):
    """
    Webhook to receive incoming WhatsApp messages and process through workflows.
    """
    sender_number = From  # The WhatsApp user's number
    receiver_number = To  # Your Twilio WhatsApp number
    message_body = Body
   
    print(f"Received message: '{message_body}' from {sender_number} to {receiver_number}")
   
    # Process message through workflow
    reply_message = workflow_manager.process_message(receiver_number, message_body)
   
    # Return a TwiML response to send a message back
    twiml_response = f"""<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Message to="{sender_number}">{reply_message}</Message>
    </Response>
    """
   
    return PlainTextResponse(content=twiml_response, media_type="application/xml")

@whatsapp_router.post("/create-workflow")
async def create_workflow(workflow: Workflow):
    """
    Endpoint to create a new workflow
    """
    workflow_id = workflow_manager.create_workflow(workflow)
    return {"workflow_id": workflow_id}

@whatsapp_router.post("/assign-workflow")
async def assign_workflow(phone_number: str, workflow_id: str):
    """
    Endpoint to assign a workflow to a specific phone number
    """
    workflow_manager.assign_workflow_to_user(phone_number, workflow_id)
    return {"status": "Workflow assigned successfully"}