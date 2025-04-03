"use client"


import { TaskParam, TaskParamType } from "@/types/task";
import StringParam from "../param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/appNode";
import { useCallback } from "react";
import { ProductMessageTask } from "../task/ProductMessage";
import ProductParam from "../param/ProductParam";

function NodeParamField({ param,nodeId,disabled }: { param: TaskParam,nodeId:string,disabled:boolean} ) {
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
        return <StringParam param={param} value={value} disabled={disabled} updateNodeParamValue={updateNodeParamValue}/>
    default:
        return <div className="w-full">
            <p className="text-xs text-muted-foreground">not implemented</p>
        </div>
    }
}
export default NodeParamField;