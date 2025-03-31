from pydantic import BaseModel
from enum import Enum
from events import EventsModel
from datetime import datetime

class WorkflowType(str,Enum):
    Marketing="Marketing"
    Utility="Utility"
    Authentication="Authentication"
    Service="Service"

class WorkflowStatus(str,Enum):
    DRAFT="Draft"
    ACTIVE="Active"

class WorkflowModel(EventsModel):
    user_id:str
    w_title:str
    w_description:str
    w_definition:str   #contains all the nodes and connections
    w_type:WorkflowType
    w_cron:str
    w_status:WorkflowStatus
    lastRunAt:datetime | None = None
    lastRunId:str
    lastRunStatus:str
    nextRunAt:datetime | None = None
    createdAt:datetime | None = None
    updatedAt:datetime | None = None
