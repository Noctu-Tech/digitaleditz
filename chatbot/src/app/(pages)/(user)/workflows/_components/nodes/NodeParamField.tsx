"use client"


import { TaskParam, TaskParamType } from "@/types/task";
import StringParam from "../param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/appNode";
import { useCallback } from "react";
import { ProductMessageTask } from "../task/ProductMessage";
import ProductParam from "../param/ProductParam";

function NodeParamField({ param,nodeId }: { param: TaskParam,nodeId:string }) {
   const {updateNodeData,getNode}=useReactFlow();
   const node=getNode(nodeId) as AppNode;
   const value =node?.data.inputs?.[param.name];
   console.log("@Value",nodeId);
   const updateNodeParamValue = useCallback((newvalue:string)=>{
       updateNodeData(nodeId,{inputs:{...node.data.inputs,[param.name]:newvalue}})},[updateNodeData,nodeId,param.name,node?.data.inputs]);
   switch(param.type){
    case TaskParamType.PRODUCT:
        return <ProductParam param={param} value={""} updateNodeParamValue={updateNodeParamValue}/>
    case TaskParamType.STRING:
        return <StringParam param={param} value={value} updateNodeParamValue={updateNodeParamValue}/>
    default:
        return <div className="w-full">
            <p className="text-xs text-muted-foreground">not implemented</p>
        </div>
    }
}
export default NodeParamField;