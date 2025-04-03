import {z,infer as zodInfer} from 'zod';
export const createWorkFlowSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    isTemplate: z.boolean().default(false),
    color: z.enum(['blue', 'red', 'green', 'purple', 'orange']).default('blue')
});

export type CreateWorkflowSchemaType = zodInfer<typeof createWorkFlowSchema>;