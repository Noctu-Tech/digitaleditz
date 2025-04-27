"use client"
import { TaskParam, TaskParamType } from "@/types/task";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/appNode";
import { useCallback } from "react";
import ProductParamBody from "../param/ProductParamBody";
import StringParamBody from "../param/StringParamBody";

function NodeParamBody({ param,nodeId }: { param: TaskParam,nodeId:string,disabled:boolean} ) {
   const {updateNodeData,getNode}=useReactFlow();
   const node=getNode(nodeId) as AppNode;
   const value =node?.data.inputs?.[param.name];
   console.log("@Value",nodeId);
   const updateNodeParamValue = useCallback((newvalue:string)=>{
       updateNodeData(nodeId,{body:{...node.data.inputs,[param.name]:newvalue}})},[updateNodeData,nodeId,param.name,node?.data.inputs]);
   switch(param.type){
    case TaskParamType.PRODUCT:
        return <ProductParamBody param={param} value={""} updateNodeParamValue={updateNodeParamValue}/>
    case TaskParamType.STRING:
        return <StringParamBody param={param} value={value}  updateNodeParamValue={updateNodeParamValue}/>
    default:
        return <div className="w-full">
            <p className="text-xs text-muted-foreground">not implemented</p>
        </div>
    }
}
export default NodeParamBody;