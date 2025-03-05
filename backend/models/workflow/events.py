from pydantic import BaseModel


# class something to define buttons in the whatsapp messaging template 

class EventsModel(BaseModel):
    e_title:str
    e_body:str
    e_trigger:str
    e_options:dict()  # type: ignore # come back here to for buttons etc
    e_wid:str