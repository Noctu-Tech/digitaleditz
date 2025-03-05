from pydantic import BaseModel
from enum import Enum
from events import EventsModel
class WorkflowType(str,Enum):
    Marketing="Marketing"
    Utility="Utility"
    Authentication="Authentication"
    Service="Service"
class WorkflowModel(EventsModel):
    w_title:str
    w_description:str
    w_type:WorkflowType
