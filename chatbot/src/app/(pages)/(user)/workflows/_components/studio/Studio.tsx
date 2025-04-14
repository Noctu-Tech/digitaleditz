"use client"
import { WorkFlow } from "@/types/workflow"
import { ReactFlowProvider } from "@xyflow/react"
import WorkflowBuilder from "./WorkFlowBuilder"
import TopBar from "../topbar/TopBar"
import  { useCallback } from "react"
import EventBar from "./EventBar"

function Studio(
    {workflow}:{workflow:WorkFlow}
) {
  console.log("@workflow",workflow)
  return (
    <ReactFlowProvider>
        <div className="flex flex-col p-2 overflow-hidden h-full w-full">
          <TopBar title={workflow.name} subtitle={workflow.description} workflowId={workflow._id}/>
          <section className=" flex overflow-auto h-full">
            <EventBar/>
                <WorkflowBuilder workflow={workflow}/>
          </section> 
        </div>
    </ReactFlowProvider>
  )
}

export default Studio
