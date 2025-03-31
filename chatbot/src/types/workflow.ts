export enum WorkflowStatus {
    DRAFT="DRAFT",
    ACTIVE="ACTIVE",
    DISABLED="DISABLED",
    PUBLISHED="PUBLISHED"
}

export interface WorkFlow{
    [key:string]:any;
}

export interface UserWorkFlow {
    title: string;
    description: string;
    status: string;
    lastEdited: string;
}
