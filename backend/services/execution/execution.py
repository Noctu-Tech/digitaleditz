from bson import ObjectId
from pymongo import MongoClient
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Union
from enum import Enum
from uuid import uuid4
import os
import json

from database.mongo import get_database

class executionsStage(str, Enum):
    INITIAL = "initial"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class executionsStep(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    keyword: str
    display_text: str
    response_template: Optional[str] = None
    sub_steps: Optional[List['executionsStep']] = None
    next_stage: Optional[executionsStage] = executionsStage.IN_PROGRESS

class execution(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid4()))
    name: str
    description: Optional[str] = None
    root_steps: List[executionsStep]
    current_stage: executionsStage = executionsStage.INITIAL

class executionsContext(BaseModel):
    current_executions_id: str
    current_path: List[str] = []  # Track navigation path through executions


class MongoexecutionsManager:
    def __init__(self):
        """
        Initialize MongoDB connection for dynamic executions management
        
        """
        try:
            # Connect to MongoDB
            self.user_executionss_collection = get_database('user_executions')
            self.workflow_collection=get_database("Workflow_collection")
            # Collections
            # self.executionss_collection = self.db['executionss']
            # self.user_executionss_collection = self.db['user_contexts']
            # self.user_executionss_collection.create_index('phone_number')
        
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            raise


    def assign_execution_to_user(self, phone_number: str, workflow_id: str):
        """
    Assign an execution to a specific phone number using a workflow ID.
    After assignment, set workflow status as 'active'.
    
    :param phone_number: Phone number to assign execution to
    :param workflow_id: ID of the workflow to fetch and create execution from
    """
    # Normalize phone number
        phone_number = phone_number.split(":")[-1].strip()

    # Fetch the workflow definition from workflow_collection
        workflow_data = self.workflow_collection.find_one({'_id': ObjectId(workflow_id)})
        if not workflow_data:
            raise ValueError(f"Workflow with ID {workflow_id} not found.")
        print("workflowdata")
        
        workflow_data.pop('_id', None)  # Remove MongoDB internal ID if presen t
        print("execution",workflow_data["definition"])
    # Create a new execution based on workflow
        new_execution_id = self.create_executions_from_dict(workflow_data["definition"])
        print("id",new_execution_id)
    # Upsert: update if exists, insert if not
        self.user_executionss_collection.update_one(
        {'phone_number': phone_number},
        {'$set': {'executions_id': new_execution_id}},
        upsert=True
    )
    
    # # Also update user context for execution tracking
    #     self.update_user_context(phone_number, new_execution_id)
    #     print("Here")
    # After successful assignment, update workflow status to 'active'
        self.workflow_collection.update_one(
        {'id': workflow_id},
        {'$set': {'status': 'ACTIVE'}}
    )
    def create_executions_from_dict(self, executions_dict: Dict) -> str:
        """
        Create a executions from a dictionary representation
        
        :param executions_dict: Dictionary defining the executions
        :return: executions ID
        """
        def create_steps(step_list):
            """Recursively create executionsStep objects"""
            parsed_steps = []
            for step_data in step_list:
                # Handle sub-steps recursively
                sub_steps = create_steps(step_data.get('sub_steps', [])) if 'sub_steps' in step_data else None
                
                step = executionsStep(
                    keyword=step_data['keyword'],
                    display_text=step_data.get('display_text', step_data['keyword']),
                    response_template=step_data.get('response_template'),
                    sub_steps=sub_steps
                )
                parsed_steps.append(step)
            return parsed_steps

        # Create executions object
        executions = execution(
            name=executions_dict['name'],
            description=executions_dict.get('description'),
            root_steps=create_steps(executions_dict['root_steps'])
        )
        
        # Insert into MongoDB
        executions_data = executions.model_dump()
        executions_data['id'] = executions.id
        
        self.user_executionss_collection.insert_one(executions_data)
        
        return executions.id

    def get_user_execution(self, phone_number: str) -> Optional[str]:
        """
        Get the executions ID assigned to a phone number
        
        :param phone_number: Phone number to check
        :return: executions ID or None
        """
        # Normalize phone number (removing the Twilio prefix if present)
        phone_number = phone_number.split(":")[-1].strip()
        
        # Find the user's executions in the user_executionss_collection
        user_executions = self.user_executionss_collection.find_one({'phone_number': phone_number})
        
        # Return the executions_id if found, otherwise return None
        return user_executions['executions_id'] if user_executions else None
    def create_executions_from_json(self, json_str: str) -> str:
        """
        Create a executions from a JSON string
        
        :param json_str: JSON string defining the executions
        :return: executions ID
        """
        executions_dict = json.loads(json_str)
        return self.create_executions_from_dict(executions_dict)

    def get_executions(self, executions_id: str) -> Optional[execution]:
        """
        Retrieve a executions by its ID
        
        :param executions_id: ID of the executions to retrieve
        :return: executions object or None
        """
        executions_data = self.user_executionss_collection.find_one({'id': executions_id})
        
        if executions_data:
            executions_data.pop('_id', None)
            return execution(**executions_data)
        
        return None

    def update_user_context(self, phone_number: str, executions_id: str, current_path: List[str] = None):
        """
        Update or create user executions context
        
        :param phone_number: User's phone number
        :param executions_id: Current executions ID
        :param current_path: Current navigation path in the executions
        """
        context_data = {
            'phone_number': phone_number,
            'current_executions_id': executions_id,
            'current_path': current_path or []
        }
        
        self.user_executionss_collection.update_one(
            {'phone_number': phone_number},
            {'$set': context_data},
            upsert=True
        )

    def get_user_context(self, phone_number: str) -> Optional[executionsContext]:
        """
        Retrieve user's current executions context
        
        :param phone_number: User's phone number
        :return: executionsContext or None
        """
        context_data = self.user_executionss_collection.find_one({'phone_number': phone_number})
        
        if context_data:
            context_data.pop('_id', None)
            return executionsContext(**context_data)
        
        return None

    
    def process_message(self, phone_number: str, message: str) -> Dict[str, Union[str, List[Dict[str, str]]]]:
        """
        Process an incoming message with advanced executions navigation
        
        :param phone_number: Phone number of the sender
        :param message: Message content
        :return: Response with message and optional next steps
        """
        # Normalize phone number
        phone_number = phone_number.split(":")[-1].strip()
        
        # Get user's current context
        context = self.get_user_context(phone_number)
        
        if not context:
            # Get all available executionss for initial selection
            available_executionss = list(self.user_executionss_collection.find())
            
            return {
                'message': 'Please select a executions:',
                'steps': [
                    {'keyword': wf['name'].lower(), 'display': wf['name']} 
                    for wf in available_executionss
                ]
            }
        
        # Retrieve the current executions
        executions = self.get_executions(context.current_executions_id)
        if not executions:
            return {'message': 'executions not found. Please start over.'}
        
        # Navigate through executions steps
        current_steps = executions.root_steps
        for path_step in context.current_path:
            # Find the matching step with sub-steps
            current_step = next((step for step in current_steps if step.keyword.lower() == path_step.lower()), None)
            if current_step and current_step.sub_steps:
                current_steps = current_step.sub_steps
            else:
                return {'message': 'Invalid executions navigation.'}
        
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
            self.update_user_context(phone_number, context.current_executions_id, new_path)
            
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

# # Example of creating a executions dynamically
# def example_executions_creation():
#     executions_manager = MongoexecutionsManager()
    
#     # Example executions as a dictionary
#     car_services_executions = {
#         "name": "Car Services",
#         "description": "executions for car-related services",
#         "root_steps": [
#             {
#                 "keyword": "repair",
#                 "display_text": "Car Repair",
#                 "response_template": "Our car repair service will diagnose and fix your vehicle.",
#                 "sub_steps": [
#                     {
#                         "keyword": "engine",
#                         "display_text": "Engine Repair",
#                         "response_template": "We specialize in comprehensive engine repairs."
#                     },
#                     {
#                         "keyword": "bodywork",
#                         "display_text": "Bodywork Repair",
#                         "response_template": "Our experts will restore your car's body to pristine condition."
#                     }
#                 ]
#             },
#             {
#                 "keyword": "service",
#                 "display_text": "Car Service",
#                 "response_template": "Schedule your regular car maintenance with us.",
#                 "sub_steps": [
#                     {
#                         "keyword": "oil",
#                         "display_text": "Oil Change",
#                         "response_template": "We'll change your oil and perform a quick vehicle check."
#                     },
#                     {
#                         "keyword": "tire",
#                         "display_text": "Tire Service",
#                         "response_template": "Tire rotation, balancing, and replacement services available."
#                     }
#                 ]
#             }
#         ]
#     }
    
#     # Create executions from dictionary
#     executions_id = executions_manager.create_executions_from_dict(car_services_executions)
#     print(f"Created executions with ID: {executions_id}")
    
#     return executions_manager

# # Global executions manager instance
# executions_manager = MongoexecutionsManager()
# example_executions_creation()