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
from bson import ObjectId
from fastapi import APIRouter, Request, Form, HTTPException
from fastapi.responses import PlainTextResponse
from typing import Optional, Dict, Union
from uuid import uuid4
# Import the execution manager and message manager
from database.mongo import get_database
from services.execution.execution import MongoexecutionsManager, execution, executionsStep
from services.message.message import message_manager, MessageDirection

whatsapp_router = APIRouter()

# Initialize global execution manager
execution_manager = MongoexecutionsManager()

@whatsapp_router.post("/webhook")
async def webhook(
    request: Request,
    Body: Optional[str] = Form(None),
    From: Optional[str] = Form(None),
    To: Optional[str] = Form(None)
):
    """
    Webhook to receive incoming WhatsApp messages and process through executions
    """
    sender_number = From  # The WhatsApp user's number
    receiver_number = To  # Your Twilio WhatsApp number
    message_body = Body or ""
    execution_id = None  # Initialize execution_id to None
   
    # Log incoming message
    try:
        # Find the execution ID for this phone number (if any)
        execution_id = execution_manager.get_user_execution(receiver_number)
        
        # Log the incoming message
        message_manager.log_message(
            phone_number=sender_number,
            message_body=message_body,
            direction=MessageDirection.INCOMING,
            execution_id=execution_id
        )
    except Exception as log_error:
        print(f"Error logging message: {log_error}")
   
    # Process message through execution
    try:
        # Enhanced error handling for execution processing
        execution_response = execution_manager.process_message(receiver_number, message_body)
        print(f"execution response: {execution_response}")
        # Handle both string and dictionary responses
        if isinstance(execution_response, dict):
            # Construct a more detailed reply message
            reply_message = execution_response.get('message', 'No response')
            
            # If steps are available, format them into the reply
            if 'steps' in execution_response:
                steps_list = execution_response['steps']
                steps_text = "\n".join([f"{idx+1}. {step['display']}" for idx, step in enumerate(steps_list)])
                reply_message += f"\n\n{steps_text}"
        else:
            reply_message = execution_response
    except Exception as process_error:
        print(f"Error processing message: {process_error}")
        reply_message = "Sorry, there was an error processing your message."
    
    # Log outgoing message
    try:
        message_manager.log_message(
            phone_number=sender_number,
            message_body=reply_message,
            direction=MessageDirection.OUTGOING,
            execution_id=execution_id
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

@whatsapp_router.get("/messages/execution/{execution_id}")
async def get_messages_by_execution(execution_id: str):
    """
    Retrieve message logs for a specific execution
    """
    messages = message_manager.get_messages_by_execution(execution_id)
    return [
        {
            "id": msg.id,
            "phone_number": msg.phone_number,
            "message_body": msg.message_body,
            "direction": msg.direction,
            "timestamp": msg.timestamp.isoformat()
        } for msg in messages
    ]

@whatsapp_router.post("/create-execution")
async def create_execution(execution_data: execution):
    """
    Endpoint to create a new execution
    """
    try:
        execution_id = execution_manager.create_executions_from_dict(execution_data.model_dump())
        return {"execution_id": execution_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@whatsapp_router.post("/create-execution-from-json")
async def create_execution_from_json(json_str: str):
    """
    Endpoint to create a new execution from JSON
    """
    try:
        execution_id = execution_manager.create_executions_from_json(json_str)
        return {"execution_id": execution_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@whatsapp_router.post("/assign-execution")
async def assign_execution(phone_number: str, execution_id: str):
    """
    Endpoint to assign a execution to a specific phone number
    """
    try:
        execution_manager.assign_execution_to_user(phone_number, execution_id)
        return {"status": "execution assigned successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# New endpoint: List available executions
@whatsapp_router.get("/executions")
async def list_executions():
    """
    Retrieve a list of all available executions
    """
    try:
        # Since the original method doesn't exist, use a basic query to list executions
        executions_data = list(execution_manager.user_executionss_collection.find(
            {"name": {"$exists": True}},  # Filter for documents that are executions (have a name field)
            {"_id": 0}  # Exclude MongoDB _id field
        ))
        return executions_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# New endpoint: Reset user execution
@whatsapp_router.post("/reset-execution")
async def reset_user_execution(phone_number: str):
    """
    Reset a user's current execution
    """
    try:
        # Since the original method doesn't exist, implement reset functionality
        execution_manager.update_user_context(phone_number, "", [])
        return {"status": "execution reset successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# New endpoint: Get execution by ID
@whatsapp_router.get("/execution/{execution_id}")
async def get_execution_by_id(execution_id: str):
    """
    Get execution details by ID
    """
    try:
        execution_data = execution_manager.get_executions(execution_id)
        if not execution_data:
            raise HTTPException(status_code=404, detail="Execution not found")
        return execution_data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))