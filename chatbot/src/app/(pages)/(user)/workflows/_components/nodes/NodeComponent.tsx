import { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegistry } from "../task/registry";
import {NodeInputs,NodeInput} from "./NodeInputs";
import { NodeOutputs, NodeOutput } from "./NodeOutputs";
import { Button } from "@/components/ui/button";
import NodeBody from "./NodeBody";

const NodeComponent = memo((props: NodeProps) => {
    const nodeData = props.data as AppNodeData;
    const task = TaskRegistry[nodeData.type];
   console.log("@NODEData",nodeData)
    return (<NodeCard nodeId={props.id} isSelected={!!props.selected}>
        <NodeHeader nodeId={props.id} taskType={nodeData.type} />
        <NodeInputs>{task.inputs.map(input => (<NodeInput nodeId={props.id}key={input.name} input={input} />))}</NodeInputs>
        <NodeBody body={task.body} nodeId={props.id}/>
        {!task.isEndPoint&&!task.isAuthPoint&&<div className="w-full flex items-center justify-end p-2"><Button variant={"secondary"} className="flex w-24" onClick={()=>{console.log(nodeData)}}>Add Output</Button></div>}
        <NodeOutputs>{task.outputs?.map(output => (<NodeOutput key={output.name} output={output} nodeId={props.id}/>))}</NodeOutputs>
    </NodeCard>)
})
export default NodeComponent;
NodeComponent.displayName = "NodeComponent";