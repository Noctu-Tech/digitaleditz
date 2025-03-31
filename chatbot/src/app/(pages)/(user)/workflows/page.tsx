import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserWorkflow from "./_components/UserWorkflow";
import NewFlowButton from "./_components/NewFlow";
import Template from "./_components/Template";
import { InboxIcon } from "lucide-react";
import CreateWorkFlowDialog from "./_components/CreateWorkFlowDialog";


const WorkflowPage = () => {
  const userWorkflows = [
    {
      id: 1,
      data:{
      title: "Client Onboarding 2024",
      description: "Updated onboarding process for enterprise clients",
      lastEdited: "2 hours ago",
      collaborators: 4,
      status: "Active"}
    },
    {
      id: 2,
      data:{
      title: "Marketing Campaign Flow",
      description: "Q1 2024 social media campaign workflow",
      lastEdited: "1 day ago",
      collaborators: 2,
      status: "Draft",
    }},
    {
      id: 3,
       data:{ title: "HR Interview Process",
      description: "Technical interview workflow for engineering",
      lastEdited: "3 days ago",
      collaborators: 6,
      status: "Draft",
    }}
  ];

  const templates = [
    {
      id: 1,
      data:{title: "Basic Newsletter",
      description: "A simple newsletter workflow with subscriber management",
      usage: "2.5k uses",
      color: "bg-blue-500",
    }},
    {
      id: 2,
    data:{  title: "Sales Pipeline",
      description: "Track leads from initial contact to close",
      usage: "1.8k uses",
      color: "bg-green-500",
    }},
    {
      id: 3,
      data:{title: "Task Manager",
      description: "Organize and track team tasks efficiently",
      usage: "3.2k uses",
      color: "bg-purple-500",
    }},
    {
      id: 4,
      data:{title: "Customer Onboarding",
      description: "Streamline your customer onboarding process",
      usage: "1.5k uses",
      color: "bg-orange-500",
    }},
  ];

  return (
    <div className="max-w-6xl mx-auto pt-6">
      <Tabs defaultValue="my-workflows" className="w-full">
        <TabsList>
          <TabsTrigger value="my-workflows">My Workflows</TabsTrigger>
          <TabsTrigger value="templates">Templates Gallery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-workflows">
          <div className="space-y-6">
            {userWorkflows.length===0 && 
            <div className="flex flex-col gap-4 h-full items-center justify-center">
              
              <div className="border-2 rounded-full h-20 w-20 flex items-center justify-center bg-accent"><InboxIcon size={40} className="stroke-primary"/></div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No Workflows created yet</p>
          <p className="text-sm text-muted-foreground">Click the button below to create your first
            workflow or choose from our templates</p>
        </div>
              <CreateWorkFlowDialog triggerText="Create New Workflow"/>
              </div>}
            
            
                {userWorkflows.length !== 0 && (
              <> 
              <div className="w-full flex justify-end items-center"><CreateWorkFlowDialog triggerText="Create new"/></div>
                  {userWorkflows.map((workflow: { id: React.Key | null | undefined; data: UserWorkflow; }) => (
                  <UserWorkflow key={workflow.id} workflow={workflow.data} />
                ))}
                </>
                )}
              </div>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NewFlowButton/>

            {templates.length!==0 && templates.map((template) => (
              <Template key={template.id} template={template.data} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkflowPage;