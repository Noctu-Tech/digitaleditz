
export const getWorkflow = async ({ workflowId, userId }: { workflowId: string; userId?: string; }) => {
    const workflow = {
      title:'workflow',
      description:'workflow description',
      workflow_id:workflowId,
      user_id:userId,
      status:'active',
      lastEdited:'2021-09-01',
      collaborators:1
  };
      return workflow;
  }