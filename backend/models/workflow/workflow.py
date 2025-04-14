from typing import Optional
from pydantic import BaseModel
from enum import Enum
from datetime import datetime

class WorkflowType(str,Enum):
    Marketing="Marketing"
    Utility="Utility"
    Authentication="Authentication"
    Service="Service"

class WorkflowStatus(str,Enum):
    DRAFT="DRAFT"
    ACTIVE="ACTIVE"
    INACTIVE="INACTIVE"

class WorkflowModel(BaseModel):
    
    color:Optional[str]
    definition:str
    description:Optional[str]
    isTemplate:Optional[bool]
    name:str
    status:WorkflowStatus
    # user_id:str
    # execution_id:Optional[str]
    
   
    # lastRunAt:datetime | None = None
    # lastRunId:str
    # lastRunStatus:str
    # nextRunAt:datetime | None = None
    # createdAt:datetime | None = None
    # updatedAt:datetime | None = None
