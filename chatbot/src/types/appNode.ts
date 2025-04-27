import { Node } from "@xyflow/react";
import { TaskParam, TaskType } from "./task";
export interface AppNodeData{
    type:TaskType;
    inputs:Record<string,string>;
    body?:string;
    outputs?:Record<string,string>;
    dynamicOutputs?:Record<string,string>;
    [key:string]:any;
}
export interface AppNode extends Node{
    data:AppNodeData
}
export interface ParamProps {
    param:TaskParam;
    value:string;
    updateNodeParamValue:(newvalue:string)=>void;
    disabled?:boolean
}