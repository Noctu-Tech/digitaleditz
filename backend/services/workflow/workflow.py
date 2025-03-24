from pymongo import MongoClient
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum
from uuid import uuid4
import os

class WorkflowStage(str, Enum):
    INITIAL = "initial"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class WorkflowStep(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    keyword: str
    response_template: str
    next_stage: Optional[WorkflowStage] = WorkflowStage.IN_PROGRESS

class Workflow(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    description: Optional[str] = None
    steps: List[WorkflowStep]
    current_stage: WorkflowStage = WorkflowStage.INITIAL

class MongoWorkflowManager:
    def __init__(self, 
                 mongo_uri: str = os.getenv('MONGO_URI', 'mongodb://localhost:27017/'),
                 database_name: str = 'whatsapp_workflows'):
        """
        Initialize MongoDB connection for workflow management
        
        :param mongo_uri: MongoDB connection string
        :param database_name: Name of the database to use
        """
        try:
            # Connect to MongoDB
            self.client = MongoClient(mongo_uri)
            self.db = self.client[database_name]
            
            # Collections
            self.workflows_collection = self.db['workflows']
            self.user_workflows_collection = self.db['user_workflows']
            
            # Create indexes for efficient querying
            self.workflows_collection.create_index('id', unique=True)
            self.user_workflows_collection.create_index('phone_number', unique=True)
        
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            raise

    def create_workflow(self, workflow: Workflow) -> str:
        """
        Create a new workflow in MongoDB
        
        :param workflow: Workflow object to create
        :return: Workflow ID
        """
        workflow_dict = workflow.model_dump()
        
        # Ensure unique ID
        workflow_dict['id'] = workflow.id or str(uuid4())
        
        # Insert workflow
        self.workflows_collection.insert_one(workflow_dict)
        
        return workflow_dict['id']

    def get_workflow(self, workflow_id: str) -> Optional[Workflow]:
        """
        Retrieve a workflow by its ID
        
        :param workflow_id: ID of the workflow to retrieve
        :return: Workflow object or None
        """
        workflow_data = self.workflows_collection.find_one({'id': workflow_id})
        
        if workflow_data:
            # Remove MongoDB's internal _id field
            workflow_data.pop('_id', None)
            return Workflow(**workflow_data)
        
        return None

    def assign_workflow_to_user(self, phone_number: str, workflow_id: str):
        """
        Assign a workflow to a specific phone number
        
        :param phone_number: Phone number to assign workflow to
        :param workflow_id: ID of the workflow to assign
        """
        # Upsert: update if exists, insert if not
        self.user_workflows_collection.update_one(
            {'phone_number': phone_number},
            {'$set': {'workflow_id': workflow_id}},
            upsert=True
        )

    def get_user_workflow(self, phone_number: str) -> Optional[str]:
        """
        Get the workflow ID assigned to a phone number
        
        :param phone_number: Phone number to check
        :return: Workflow ID or None
        """
        print(phone_number)
        phone_number = phone_number
        user_workflow = self.user_workflows_collection.find_one({'phone_number': phone_number})
        return user_workflow['workflow_id'] if user_workflow else None

    def process_message(self, phone_number: str, message: str) -> str:
        """
        Process an incoming message based on the user's assigned workflow
        
        :param phone_number: Phone number of the sender
        :param message: Message content
        :return: Response message
        """
        phone_number = phone_number.split(":")[1]
        print(phone_number)
        # Find the workflow assigned to this phone number
        workflow_id = self.get_user_workflow(phone_number)
        
        if not workflow_id:
            return "No active workflow found. Please start a workflow."

        workflow = self.get_workflow(workflow_id)
        
        if not workflow:
            return "Workflow not found."

        # Find matching step based on keyword
        for step in workflow.steps:
            if step.keyword.lower() in message.lower():
                return step.response_template

        return "I did not understand your message. Please try again."

    def close_connection(self):
        """
        Close the MongoDB connection
        """
        if self.client:
            self.client.close()

# Global workflow manager instance
# Set MONGO_URI environment variable or use default local connection
workflow_manager = MongoWorkflowManager()