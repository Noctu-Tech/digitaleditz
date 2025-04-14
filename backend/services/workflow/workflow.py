from typing import Optional
from bson import ObjectId
from fastapi import Depends, HTTPException, status
from pydantic import create_model
from database.mongo import get_database
from services.auth.auth_utils import extract_user_data_from_token
from models.workflow.workflow import WorkflowModel
UpdateWorkflow = create_model(
    'UpdateWorkflow',
    **{'id':(str,...)},
    **{field: (Optional[type_], None) for field, type_ in WorkflowModel.__annotations__.items()}
)
workflow_collection=get_database("Workflow_collection")
def createWorkflow(data:WorkflowModel
                        #  ,userData:tuple = Depends(extract_user_data_from_token)
                         ):
    # user_id,role=userData
    newData=data.model_dump()
        # ,{"user_id":user_id}}
    try: 
        print("@DATA",newData)
        workflow=workflow_collection.insert_one(newData)
        # # Fetch the full inserted document
        # inserted_workflow = workflow_collection.find_one({"_id": workflow.inserted_id})
        # Convert ObjectId to string so it's JSON serializable
        # print(inserted_workflow)
        # if inserted_workflow:
        #     inserted_workflow["_id"] = str(inserted_workflow["_id"])
        id = str(workflow.inserted_id)
        return {"id":id}
         
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}"
        )
def fetchWorkflow(workflowId:str
                        # ,userData:tuple=Depends(extract_user_data_from_token)
                        ):
    # user_id,role=userData
    try: 
        # Fetch the full inserted document
        print(ObjectId(workflowId))
        
        inserted_workflow = workflow_collection.find_one({"_id": ObjectId(workflowId)}
                                                        #   "user_id":user_id}
                                                          )
        inserted_workflow["_id"]=str(inserted_workflow["_id"])
        return inserted_workflow
         
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}"
        )
    
def fetchallWorkflow(
                        # ,userData:tuple=Depends(extract_user_data_from_token)
                        ):
    # user_id,role=userData
    try: 
        # Fetch the full inserted document
        
        inserted_workflow = workflow_collection.find({}).to_list()
        for x in inserted_workflow:
            x["_id"]=str(x["_id"])
            
        print(inserted_workflow)
        return inserted_workflow
         
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}"
        )
    
def workflowUpdate(data:UpdateWorkflow,workflowId:str): # type: ignore
                        #  ,userData:tuple = Depends(extract_user_data_from_token)

    # user_id,role=userData
    
    try: 
        print("INSERTUPDATE",data)
        workflow=workflow_collection.update_one({"_id":ObjectId(workflowId)},{"$set":{'definition':str(data)}})
        print(workflow)
        # Fetch the full inserted document
        inserted_workflow = workflow_collection.find_one({"_id": ObjectId(workflowId)})
        # Convert ObjectId to string so it's JSON serializable
        print(inserted_workflow)
        if inserted_workflow:
            inserted_workflow["_id"] = str(inserted_workflow["_id"])
            del inserted_workflow["_id"]
        return inserted_workflow
         
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}"
        )
        
def workflowDelete(data:str
                        #  ,userData:tuple = Depends(extract_user_data_from_token)
                         ):
    # user_id,role=userData
    try: 
        workflow=workflow_collection.delete_one({"_id":data})
        workflow=workflow.deleted_count
        if workflow!=0:
             return workflow
         
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}"
        )
def executeWorkflow():
    # check if there are any other workflows running
    # if yes, return a message saying workflow is already running or deactivate other workflows and activate the current one 
    # if not, run the workflow
    pass