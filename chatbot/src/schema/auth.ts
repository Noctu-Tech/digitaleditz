import {z,infer as zodInfer} from 'zod';
export const userSigninSchema = z.object({
    email: z.string()
        .email("Invalid email format")
        .max(50, "Email cannot exceed 50 characters"),
    password:z.string()
        .min(8, "Password must be at least 8 characters")
        .max(80)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})

export type UserSigninSchemaType = zodInfer<typeof userSigninSchema>;

export const userSignupSchema = z.object({
    username:z.string().max(50),
    email: z.string()
        .email("Invalid email format")
        .max(50, "Email cannot exceed 50 characters"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(80)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export type UserSignupSchemaType = zodInfer<typeof userSignupSchema>;