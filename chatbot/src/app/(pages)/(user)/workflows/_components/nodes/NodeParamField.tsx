"use client"
import { TaskParam, TaskParamType } from "@/types/task";
import StringParam from "../param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { AppNode } from "@/types/appNode";
import { useCallback } from "react";
import { ProductMessageTask } from "../task/ProductMessage";
import ProductParam from "../param/ProductParam";

function NodeParamField({ 
  param, 
  nodeId, 
  disabled, 
  dataType // This should be "input", "output", or "body"
}: {
  param: TaskParam,
  nodeId: string,
  disabled?: boolean,
  dataType: string // Type of data being updated
}) {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as AppNode;
  
  // Select the appropriate data object based on dataType
  let dataContainer;
  switch(dataType) {
    case "input":
      dataContainer = node?.data.inputs || {};
      break;
    case "output":
      dataContainer = node?.data.outputs || {};
      break;
    case "body":
      // For body, we'll handle it differently since it's a string not an object
      dataContainer = null;
      break;
    default:
      dataContainer = {};
  }
  
  // Get the current value based on dataType
  const value = dataType === 'body' 
    ? node?.data.body || ''
    : dataContainer ? dataContainer[param.name] || '' : '';
  
  const updateNodeParamValue = useCallback((newValue: string) => {
    // Update the appropriate data section based on dataType
    if (dataType === 'body') {
      updateNodeData(nodeId, { body: newValue });
    } else {
      // For inputs and outputs, create a new object with the updated value
      const updatedData = { ...dataContainer, [param.name]: newValue };
      
      // Update the node data with the appropriate property
      updateNodeData(nodeId, { 
        [dataType + 's']: updatedData // Add 's' to make "inputs" or "outputs"
      });
    }
  }, [updateNodeData, nodeId, param.name, dataType, dataContainer]);

  // Render the appropriate parameter component based on type
  switch(param.type) {
    case TaskParamType.PRODUCT:
      return <ProductParam 
        param={param} 
        value={value} 
        updateNodeParamValue={updateNodeParamValue}
        disabled={disabled}
      />;
      
    case TaskParamType.STRING:
      return <StringParam 
        param={param} 
        value={value} 
        disabled={disabled} 
        updateNodeParamValue={updateNodeParamValue}
      />;
      
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">not implemented</p>
        </div>
      );
  }
}

export default NodeParamField;