"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserWorkflow from "./_components/UserWorkflow";
import NewFlowButton from "./_components/NewFlow";
import Template from "./_components/Template";
import { InboxIcon } from "lucide-react";
import CreateWorkFlowDialog from "./_components/CreateWorkFlowDialog";
import ProtectedRoute from "@/context/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { getAllWorkflows, getWorkflow } from "@/lib/functions/workflow/getWorkflow";
import { WorkFlow } from "@/types/workflow";


const WorkflowPage = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["workflows"],
    queryFn: () => getAllWorkflows()
  });
  // console.log("@DATA",data);
  // console.error("@error",error);

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const userWorkflows = data?.filter((workflow: { isTemplate: boolean; }) => workflow.isTemplate === false) || [];
  
  const templates = data?.filter((workflow: { isTemplate: boolean; }) => workflow.isTemplate === true) || [];

  return (<ProtectedRoute requiredRoles={["admin","manager"]}>
    <div className="max-w-6xl mx-auto pt-6">
      <Tabs defaultValue="my-workflows" className="w-full">
        <TabsList>
          <TabsTrigger value="my-workflows">My Workflows</TabsTrigger>
          <TabsTrigger value="templates">Templates Gallery</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-workflows">
        <div className="space-y-6">
          {userWorkflows.length === 0 ? (
            <div className="flex flex-col gap-4 h-full items-center justify-center">
              <div className="border-2 rounded-full h-20 w-20 flex items-center justify-center bg-accent">
                <InboxIcon size={40} className="stroke-primary"/>
              </div>
              <div className="flex flex-col gap-1 text-center">
                <p className="font-bold">No Workflows created yet</p>
                <p className="text-sm text-muted-foreground">
                  Click the button below to create your first workflow or choose from our templates
                </p>
                <CreateWorkFlowDialog triggerText="Create New Workflow"/>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full flex justify-end items-center">
                <CreateWorkFlowDialog triggerText="Create new"/>
              </div>
              {userWorkflows.map((workflow:WorkFlow) => (
                <UserWorkflow key={workflow._id} workflow={workflow} />
              ))}
            </>
          )}
        </div>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NewFlowButton/>

            {templates.length!==0 && templates.map((template:WorkFlow) => (
              <Template key={template._id} template={template} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </ProtectedRoute>
  );
};

export default WorkflowPage;