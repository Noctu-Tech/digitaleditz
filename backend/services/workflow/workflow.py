from pymongo import MongoClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Union
from enum import Enum
from uuid import uuid4
import os
import json

class WorkflowStage(str, Enum):
    INITIAL = "initial"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class WorkflowStep(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    keyword: str
    display_text: str
    response_template: Optional[str] = None
    sub_steps: Optional[List['WorkflowStep']] = None
    next_stage: Optional[WorkflowStage] = WorkflowStage.IN_PROGRESS

class Workflow(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    description: Optional[str] = None
    root_steps: List[WorkflowStep]
    current_stage: WorkflowStage = WorkflowStage.INITIAL

class WorkflowContext(BaseModel):
    current_workflow_id: str
    current_path: List[str] = []  # Track navigation path through workflow


class MongoWorkflowManager:
    def __init__(self, 
                 mongo_uri: str = os.getenv('MONGO_URI', 'mongodb://localhost:27017/'),
                 database_name: str = 'dynamic_workflows'):
        """
        Initialize MongoDB connection for dynamic workflow management
        
        :param mongo_uri: MongoDB connection string
        :param database_name: Name of the database to use
        """
        try:
            # Connect to MongoDB
            self.client = MongoClient(mongo_uri)
            self.db = self.client[database_name]
            self.user_workflows_collection = self.db['user_workflows']
            # Collections
            # self.workflows_collection = self.db['workflows']
            # self.user_workflows_collection = self.db['user_contexts']
            # self.user_workflows_collection.create_index('phone_number')
        
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            raise


    def assign_workflow_to_user(self, phone_number: str, workflow_id: str):
        """
        Assign a workflow to a specific phone number
        
        :param phone_number: Phone number to assign workflow to
        :param workflow_id: ID of the workflow to assign
        """
        # Normalize phone number
        phone_number = phone_number.split(":")[-1].strip()
        
        # Upsert: update if exists, insert if not
        self.user_workflows_collection.update_one(
            {'phone_number': phone_number},
            {'$set': {'workflow_id': workflow_id}},
            upsert=True
        )
        
        # Also update user context for workflow tracking
        self.update_user_context(phone_number, workflow_id)
    def create_workflow_from_dict(self, workflow_dict: Dict) -> str:
        """
        Create a workflow from a dictionary representation
        
        :param workflow_dict: Dictionary defining the workflow
        :return: Workflow ID
        """
        def create_steps(step_list):
            """Recursively create WorkflowStep objects"""
            parsed_steps = []
            for step_data in step_list:
                # Handle sub-steps recursively
                sub_steps = create_steps(step_data.get('sub_steps', [])) if 'sub_steps' in step_data else None
                
                step = WorkflowStep(
                    keyword=step_data['keyword'],
                    display_text=step_data.get('display_text', step_data['keyword']),
                    response_template=step_data.get('response_template'),
                    sub_steps=sub_steps
                )
                parsed_steps.append(step)
            return parsed_steps

        # Create Workflow object
        workflow = Workflow(
            name=workflow_dict['name'],
            description=workflow_dict.get('description'),
            root_steps=create_steps(workflow_dict['root_steps'])
        )
        
        # Insert into MongoDB
        workflow_data = workflow.model_dump()
        workflow_data['id'] = workflow.id
        
        self.user_workflows_collection.insert_one(workflow_data)
        
        return workflow.id

    def get_user_workflow(self, phone_number: str) -> Optional[str]:
        """
        Get the workflow ID assigned to a phone number
        
        :param phone_number: Phone number to check
        :return: Workflow ID or None
        """
        # Normalize phone number (removing the Twilio prefix if present)
        phone_number = phone_number.split(":")[-1].strip()
        
        # Find the user's workflow in the user_workflows_collection
        user_workflow = self.user_workflows_collection.find_one({'phone_number': phone_number})
        
        # Return the workflow_id if found, otherwise return None
        return user_workflow['workflow_id'] if user_workflow else None
    def create_workflow_from_json(self, json_str: str) -> str:
        """
        Create a workflow from a JSON string
        
        :param json_str: JSON string defining the workflow
        :return: Workflow ID
        """
        workflow_dict = json.loads(json_str)
        return self.create_workflow_from_dict(workflow_dict)

    def get_workflow(self, workflow_id: str) -> Optional[Workflow]:
        """
        Retrieve a workflow by its ID
        
        :param workflow_id: ID of the workflow to retrieve
        :return: Workflow object or None
        """
        workflow_data = self.user_workflows_collection.find_one({'id': workflow_id})
        
        if workflow_data:
            workflow_data.pop('_id', None)
            return Workflow(**workflow_data)
        
        return None

    def update_user_context(self, phone_number: str, workflow_id: str, current_path: List[str] = None):
        """
        Update or create user workflow context
        
        :param phone_number: User's phone number
        :param workflow_id: Current workflow ID
        :param current_path: Current navigation path in the workflow
        """
        context_data = {
            'phone_number': phone_number,
            'current_workflow_id': workflow_id,
            'current_path': current_path or []
        }
        
        self.user_workflows_collection.update_one(
            {'phone_number': phone_number},
            {'$set': context_data},
            upsert=True
        )

    def get_user_context(self, phone_number: str) -> Optional[WorkflowContext]:
        """
        Retrieve user's current workflow context
        
        :param phone_number: User's phone number
        :return: WorkflowContext or None
        """
        context_data = self.user_workflows_collection.find_one({'phone_number': phone_number})
        
        if context_data:
            context_data.pop('_id', None)
            return WorkflowContext(**context_data)
        
        return None

    
    def process_message(self, phone_number: str, message: str) -> Dict[str, Union[str, List[Dict[str, str]]]]:
        """
        Process an incoming message with advanced workflow navigation
        
        :param phone_number: Phone number of the sender
        :param message: Message content
        :return: Response with message and optional next steps
        """
        # Normalize phone number
        phone_number = phone_number.split(":")[-1].strip()
        
        # Get user's current context
        context = self.get_user_context(phone_number)
        
        if not context:
            # Get all available workflows for initial selection
            available_workflows = list(self.user_workflows_collection.find())
            
            return {
                'message': 'Please select a workflow:',
                'steps': [
                    {'keyword': wf['name'].lower(), 'display': wf['name']} 
                    for wf in available_workflows
                ]
            }
        
        # Retrieve the current workflow
        workflow = self.get_workflow(context.current_workflow_id)
        if not workflow:
            return {'message': 'Workflow not found. Please start over.'}
        
        # Navigate through workflow steps
        current_steps = workflow.root_steps
        for path_step in context.current_path:
            # Find the matching step with sub-steps
            current_step = next((step for step in current_steps if step.keyword.lower() == path_step.lower()), None)
            if current_step and current_step.sub_steps:
                current_steps = current_step.sub_steps
            else:
                return {'message': 'Invalid workflow navigation.'}
        
        # Process current message
        matching_steps = [
            step for step in current_steps 
            if step.keyword.lower() in message.lower()
        ]
        
        if not matching_steps:
            # If no match, show available options
            return {
                'message': 'Please select from the following options:',
                'steps': [
                    {'keyword': step.keyword, 'display': step.display_text} 
                    for step in current_steps
                ]
            }
        
        # Take the first matching step
        matched_step = matching_steps[0]
        
        # Prepare response
        response = {
            'message': matched_step.response_template or f"You selected {matched_step.display_text}"
        }
        
        # If step has sub-steps, update context and show them
        if matched_step.sub_steps:
            new_path = context.current_path + [matched_step.keyword]
            self.update_user_context(phone_number, context.current_workflow_id, new_path)
            
            response['steps'] = [
                {'keyword': step.keyword, 'display': step.display_text} 
                for step in matched_step.sub_steps
            ]
        
        return response

    def close_connection(self):
        """
        Close the MongoDB connection
        """
        if self.client:
            self.client.close()

# Example of creating a workflow dynamically
def example_workflow_creation():
    workflow_manager = MongoWorkflowManager()
    
    # Example workflow as a dictionary
    car_services_workflow = {
        "name": "Car Services",
        "description": "Workflow for car-related services",
        "root_steps": [
            {
                "keyword": "repair",
                "display_text": "Car Repair",
                "response_template": "Our car repair service will diagnose and fix your vehicle.",
                "sub_steps": [
                    {
                        "keyword": "engine",
                        "display_text": "Engine Repair",
                        "response_template": "We specialize in comprehensive engine repairs."
                    },
                    {
                        "keyword": "bodywork",
                        "display_text": "Bodywork Repair",
                        "response_template": "Our experts will restore your car's body to pristine condition."
                    }
                ]
            },
            {
                "keyword": "service",
                "display_text": "Car Service",
                "response_template": "Schedule your regular car maintenance with us.",
                "sub_steps": [
                    {
                        "keyword": "oil",
                        "display_text": "Oil Change",
                        "response_template": "We'll change your oil and perform a quick vehicle check."
                    },
                    {
                        "keyword": "tire",
                        "display_text": "Tire Service",
                        "response_template": "Tire rotation, balancing, and replacement services available."
                    }
                ]
            }
        ]
    }
    
    # Create workflow from dictionary
    workflow_id = workflow_manager.create_workflow_from_dict(car_services_workflow)
    print(f"Created workflow with ID: {workflow_id}")
    
    return workflow_manager

# Global workflow manager instance
workflow_manager = MongoWorkflowManager()
# example_workflow_creation()