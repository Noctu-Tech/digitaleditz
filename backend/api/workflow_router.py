
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi import Path
from services.workflow.workflow import createWorkflow, fetchWorkflow, fetchallWorkflow, workflowDelete, workflowUpdate,UpdateWorkflow
from models.workflow.workflow import WorkflowModel

router=APIRouter()

@router.get("/get/{workflowId}")
async def getworkflow(workflowId:str):
    print(workflowId)
    workflow=fetchWorkflow(workflowId)
    return JSONResponse(content=workflow)
@router.get("/getall")
async def getallworkflow():
    workflow=fetchallWorkflow()
    return JSONResponse(content=workflow)
@router.post("/create")
async def saveworkflow(data:WorkflowModel):
    print(data)
    workflowId=createWorkflow(data)
    print(workflowId)
    return workflowId

@router.post("/update/{workflowId}")
async def updateworkflow(data:UpdateWorkflow): #type: ignore
    result=workflowUpdate(data.definition,data.id)
    return JSONResponse(content=result)

@router.delete("/delete")
async def deleteworkflow(data:str):
    result=workflowDelete(data)
    return JSONResponse(content=result)

@router.post("/activate/{workflowId}")
async def activateworkflow(workflowId:str,):
    result=executeWorkflow(workflowId)
    return JSONResponse(content=result)