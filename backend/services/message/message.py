from pymongo import MongoClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum
from uuid import uuid4
import os
from datetime import datetime

class MessageDirection(str, Enum):
    INCOMING = "incoming"
    OUTGOING = "outgoing"

class WhatsAppMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    phone_number: str
    message_body: str
    direction: MessageDirection
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    workflow_id: Optional[str] = None
    additional_metadata: Optional[Dict[str, Any]] = None

class MongoMessageManager:
    def __init__(self, 
                 mongo_uri: str = os.getenv('MONGO_URI', 'mongodb://localhost:27017/'),
                 database_name: str = 'whatsapp_workflows'):
        """
        Initialize MongoDB connection for message logging
        
        :param mongo_uri: MongoDB connection string
        :param database_name: Name of the database to use
        """
        try:
            # Connect to MongoDB
            self.client = MongoClient(mongo_uri)
            self.db = self.client[database_name]
            
            # Collections
            self.messages_collection = self.db['messages']
            
            # Create indexes for efficient querying
            self.messages_collection.create_index('phone_number')
            self.messages_collection.create_index('timestamp')
            self.messages_collection.create_index('workflow_id')
        
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            raise

    def log_message(self, 
                    phone_number: str, 
                    message_body: str, 
                    direction: MessageDirection, 
                    workflow_id: Optional[str] = None,
                    additional_metadata: Optional[Dict[str, Any]] = None) -> str:
        """
        Log a WhatsApp message in the database
        
        :param phone_number: Phone number of the sender/receiver
        :param message_body: Content of the message
        :param direction: Direction of the message (incoming/outgoing)
        :param workflow_id: Optional workflow ID associated with the message
        :param additional_metadata: Optional additional information
        :return: Message log ID
        """
        message = WhatsAppMessage(
            phone_number=phone_number,
            message_body=message_body,
            direction=direction,
            workflow_id=workflow_id,
            additional_metadata=additional_metadata
        )
        
        # Convert Pydantic model to dictionary
        message_dict = message.model_dump()
        
        # Insert message
        result = self.messages_collection.insert_one(message_dict)
        
        return str(result.inserted_id)

    def get_messages_by_phone_number(self, 
                                     phone_number: str, 
                                     limit: int = 50) -> List[WhatsAppMessage]:
        """
        Retrieve messages for a specific phone number
        
        :param phone_number: Phone number to retrieve messages for
        :param limit: Maximum number of messages to retrieve
        :return: List of messages
        """
        messages = self.messages_collection.find(
            {'phone_number': phone_number}
        ).sort('timestamp', -1).limit(limit)
        
        return [WhatsAppMessage(**message) for message in messages]

    def get_messages_by_workflow(self, 
                                 workflow_id: str, 
                                 limit: int = 50) -> List[WhatsAppMessage]:
        """
        Retrieve messages associated with a specific workflow
        
        :param workflow_id: Workflow ID to retrieve messages for
        :param limit: Maximum number of messages to retrieve
        :return: List of messages
        """
        messages = self.messages_collection.find(
            {'workflow_id': workflow_id}
        ).sort('timestamp', -1).limit(limit)
        
        return [WhatsAppMessage(**message) for message in messages]

    def close_connection(self):
        """
        Close the MongoDB connection
        """
        if self.client:
            self.client.close()

# Global message manager instance
message_manager = MongoMessageManager()