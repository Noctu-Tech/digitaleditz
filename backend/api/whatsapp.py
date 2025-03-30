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

from fastapi import APIRouter, Request, Form, HTTPException
from fastapi.responses import PlainTextResponse
from typing import Optional, Dict, Union

# Import the workflow and message managers
from services.workflow.workflow import workflow_manager, Workflow
from services.message.message import message_manager, MessageDirection

whatsapp_router = APIRouter()

@whatsapp_router.post("/webhook")
async def webhook(
    request: Request,
    Body: Optional[str] = Form(None),
    From: Optional[str] = Form(None),
    To: Optional[str] = Form(None)
):
    """
    Webhook to receive incoming WhatsApp messages and process through workflows
    """
    sender_number = From  # The WhatsApp user's number
    receiver_number = To  # Your Twilio WhatsApp number
    message_body = Body or ""
    workflow_id = None  # Initialize workflow_id to None
   
    # Log incoming message
    try:
        # Find the workflow ID for this phone number (if any)
        workflow_id = workflow_manager.get_user_workflow(receiver_number)
        
        # Log the incoming message
        message_manager.log_message(
            phone_number=sender_number,
            message_body=message_body,
            direction=MessageDirection.INCOMING,
            workflow_id=workflow_id
        )
    except Exception as log_error:
        print(f"Error logging message: {log_error}")
   
    # Process message through workflow
    try:
        # Enhanced error handling for workflow processing
        workflow_response = workflow_manager.process_message(receiver_number, message_body)
        print(f"Workflow response: {workflow_response}")
        # Handle both string and dictionary responses
        if isinstance(workflow_response, dict):
            # Construct a more detailed reply message
            reply_message = workflow_response.get('message', 'No response')
            
            # If steps are available, format them into the reply
            if 'steps' in workflow_response:
                steps_list = workflow_response['steps']
                steps_text = "\n".join([f"{idx+1}. {step['display']}" for idx, step in enumerate(steps_list)])
                reply_message += f"\n\n{steps_text}"
        else:
            reply_message = workflow_response
    except Exception as process_error:
        print(f"Error processing message: {process_error}")
        reply_message = "Sorry, there was an error processing your message."
    
    # Log outgoing message
    try:
        message_manager.log_message(
            phone_number=sender_number,
            message_body=reply_message,
            direction=MessageDirection.OUTGOING,
            workflow_id=workflow_id
        )
    except Exception as log_error:
        print(f"Error logging reply message: {log_error}")
   
    # Return a TwiML response to send a message back
    twiml_response = f"""<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Message to="{sender_number}">{reply_message}</Message>
    </Response>
    """
   
    return PlainTextResponse(content=twiml_response, media_type="application/xml")
@whatsapp_router.get("/messages/{phone_number}")
async def get_messages_by_phone(phone_number: str):
    """
    Retrieve message logs for a specific phone number
    """
    messages = message_manager.get_messages_by_phone_number(phone_number)
    return [
        {
            "id": msg.id,
            "message_body": msg.message_body,
            "direction": msg.direction,
            "timestamp": msg.timestamp.isoformat()
        } for msg in messages
    ]

@whatsapp_router.get("/messages/workflow/{workflow_id}")
async def get_messages_by_workflow(workflow_id: str):
    """
    Retrieve message logs for a specific workflow
    """
    messages = message_manager.get_messages_by_workflow(workflow_id)
    return [
        {
            "id": msg.id,
            "phone_number": msg.phone_number,
            "message_body": msg.message_body,
            "direction": msg.direction,
            "timestamp": msg.timestamp.isoformat()
        } for msg in messages
    ]

@whatsapp_router.post("/create-workflow")
async def create_workflow(workflow: Workflow):
    """
    Endpoint to create a new workflow
    """
    try:
        workflow_id = workflow_manager.create_workflow(workflow)
        return {"workflow_id": workflow_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@whatsapp_router.post("/assign-workflow")
async def assign_workflow(phone_number: str, workflow_id: str):
    """
    Endpoint to assign a workflow to a specific phone number
    """
    try:
        workflow_manager.assign_workflow_to_user(phone_number, workflow_id)
        return {"status": "Workflow assigned successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# New endpoint: List available workflows
@whatsapp_router.get("/workflows")
async def list_workflows():
    """
    Retrieve a list of all available workflows
    """
    try:
        workflows = workflow_manager.list_workflows()
        return workflows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# New endpoint: Reset user workflow
@whatsapp_router.post("/reset-workflow")
async def reset_user_workflow(phone_number: str):
    """
    Reset a user's current workflow
    """
    try:
        workflow_manager.reset_user_workflow(phone_number)
        return {"status": "Workflow reset successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))