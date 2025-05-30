import json
def convert_graph_to_workflow_schema(graph_json):
    """
    Convert graph JSON to workflow schema compatible with MongoWorkflowManager
    
    :param graph_json: String or dict containing the graph definition
    :return: Dict in the format expected by create_workflow_from_dict
    """
    # Parse JSON if it's a string
    if isinstance(graph_json, str):
        graph_definition = json.loads(graph_json)
    else:
        graph_definition = graph_json
    
    # Extract nodes and edges
    nodes = graph_definition.get("nodes", [])
    edges = graph_definition.get("edges", [])
    
    # Create node ID mapping
    node_map = {node["id"]: node for node in nodes}
    
    # Find all ACTION_MESSAGE nodes
    action_nodes = [node for node in nodes if node["data"].get("type") == "ACTION_MESSAGE"]
    
    # Create root steps from action nodes
    root_steps = []
    for i, action_node in enumerate(action_nodes):
        # Create step with default values
        step = {
            "keyword": f"option_{i+1}",
            "display_text": f"Option {i+1}",
            "response_template": f"You selected Option {i+1}"
        }
        
        # Extract any custom inputs if available
        if "inputs" in action_node["data"] and action_node["data"]["inputs"]:
            inputs = action_node["data"]["inputs"]
            if "keyword" in inputs:
                step["keyword"] = inputs["keyword"]
            if "displayText" in inputs:
                step["display_text"] = inputs["displayText"]
            if "responseTemplate" in inputs:
                step["response_template"] = inputs["responseTemplate"]
        
        root_steps.append(step)
    
    # Create the workflow schema
    workflow_schema = {
        "name": "WhatsApp Bot Workflow",
        "description": "Generated from graph definition",
        "root_steps": root_steps
    }
    
    return workflow_schema


data = """{"nodes":[{"id":"3eb1e865-c38d-4a64-afbe-ae75bbcc4428","type":"Node","dragHandle":".drag-handle","data":{"type":"START_CHAT","inputs":{}},"position":{"x":-600,"y":100},"measured":{"width":420,"height":228},"selected":false,"dragging":false},{"id":"53ed0729-2479-4167-b694-69a58127284c","type":"Node","dragHandle":".drag-handle","data":{"type":"ACTION_MESSAGE","inputs":{}},"position":{"x":500,"y":-200},"measured":{"width":420,"height":228},"selected":false,"dragging":false},{"id":"4fde61ac-ab68-4b6a-aeea-b5568f35127e","type":"Node","dragHandle":".drag-handle","data":{"type":"ACTION_MESSAGE","inputs":{}},"position":{"x":500,"y":48},"measured":{"width":420,"height":228},"selected":false},{"id":"b72b73dd-c1ab-4bbd-9405-43aefca3cf02","type":"Node","dragHandle":".drag-handle","data":{"type":"ACTION_MESSAGE","inputs":{}},"position":{"x":500,"y":296},"measured":{"width":420,"height":228},"selected":false},{"id":"55f5755d-cb3b-46f8-b7a8-b42d5109b622","type":"Node","dragHandle":".drag-handle","data":{"type":"END_CHAT","inputs":{}},"position":{"x":1100,"y":-200},"measured":{"width":420,"height":228},"selected":false,"dragging":false},{"id":"e9bf3777-ab5b-444e-9752-c6d70cc611ed","type":"Node","dragHandle":".drag-handle","data":{"type":"END_CHAT","inputs":{}},"position":{"x":1100,"y":50},"measured":{"width":420,"height":228},"selected":false,"dragging":false},{"id":"53e8e599-9594-48e3-813a-9702009f759a","type":"Node","dragHandle":".drag-handle","data":{"type":"END_CHAT","inputs":{}},"position":{"x":1100,"y":300},"measured":{"width":420,"height":228},"selected":false,"dragging":false},{"id":"1cef4bfa-69f7-4e08-b6a2-a84c5120e820","type":"Node","dragHandle":".drag-handle","data":{"type":"AUTHENTICATION_TASK","inputs":{}},"position":{"x":-50,"y":150},"measured":{"width":420,"height":144},"selected":false,"dragging":false}],"edges":[{"source":"53ed0729-2479-4167-b694-69a58127284c","sourceHandle":"action","target":"55f5755d-cb3b-46f8-b7a8-b42d5109b622","targetHandle":"Message Request","animated":true,"id":"xy-edge_53ed0729-2479-4167-b694-69a58127284caction-55f5755d-cb3b-46f8-b7a8-b42d5109b622Message Request"},{"source":"b72b73dd-c1ab-4bbd-9405-43aefca3cf02","sourceHandle":"action","target":"53e8e599-9594-48e3-813a-9702009f759a","targetHandle":"Message Request","animated":true,"id":"xy-edgeb72b73dd-c1ab-4bbd-9405-43aefca3cf02action-53e8e599-9594-48e3-813a-9702009f759aMessage Request"},{"source":"3eb1e865-c38d-4a64-afbe-ae75bbcc4428","sourceHandle":"Start Chat","target":"1cef4bfa-69f7-4e08-b6a2-a84c5120e820","targetHandle":"Use Authentication","animated":true,"id":"xy-edge3eb1e865-c38d-4a64-afbe-ae75bbcc4428Start Chat-1cef4bfa-69f7-4e08-b6a2-a84c5120e820Use Authentication"},{"source":"1cef4bfa-69f7-4e08-b6a2-a84c5120e820","sourceHandle":"Product","target":"4fde61ac-ab68-4b6a-aeea-b5568f35127e","targetHandle":"Message Request","animated":true,"id":"xy-edge1cef4bfa-69f7-4e08-b6a2-a84c5120e820Product-4fde61ac-ab68-4b6a-aeea-b5568f35127eMessage Request"},{"source":"1cef4bfa-69f7-4e08-b6a2-a84c5120e820","sourceHandle":"Product","target":"b72b73dd-c1ab-4bbd-9405-43aefca3cf02","targetHandle":"Message Request","animated":true,"id":"xy-edge1cef4bfa-69f7-4e08-b6a2-a84c5120e820Product-b72b73dd-c1ab-4bbd-9405-43aefca3cf02Message Request"},{"source":"1cef4bfa-69f7-4e08-b6a2-a84c5120e820","sourceHandle":"Product","target":"53ed0729-2479-4167-b694-69a58127284c","targetHandle":"Message Request","animated":true,"id":"xy-edge1cef4bfa-69f7-4e08-b6a2-a84c5120e820Product-53ed0729-2479-4167-b694-69a58127284cMessage Request"},{"source":"4fde61ac-ab68-4b6a-aeea-b5568f35127e","sourceHandle":"action","target":"e9bf3777-ab5b-444e-9752-c6d70cc611ed","targetHandle":"Message Request","animated":true,"id":"xy-edge_4fde61ac-ab68-4b6a-aeea-b5568f35127eaction-e9bf3777-ab5b-444e-9752-c6d70cc611edMessage Request"}],"viewport":{"x":-173.42526137477773,"y":125.3964824272447,"zoom":0.5743491774985173}}"""


if __name__ == "__main__":
    print(convert_graph_to_workflow_schema(data))