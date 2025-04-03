import { userSigninSchema, UserSigninSchemaType, userSignupSchema, UserSignupSchemaType } from "@/schema/auth";
import { handleSigninApi, handleSignupApi } from "../api/auth";
import { redirect } from "next/navigation";

export const handleSignin = async (form: UserSigninSchemaType) => {
    const { success, data } = userSigninSchema.safeParse(form);
    if (!success) {
        throw new Error("Invalid form data: Please check your input");
    }

    try {
        const response = await handleSigninApi(data);
        if (!response) {
            throw new Error("Signin failed: No response from server");
        }
        return response; // Return the complete response
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during signin";
        throw new Error(errorMessage);
    }
}

export const handleSignup = async (form: UserSignupSchemaType) => {
    const { success, data } = userSignupSchema.safeParse(form);
    if (!success) {
        throw new Error("Invalid form data: Please check your input");
    }

    const newData = {
        username: data.username,
        email: data.email,
        password: data.password
    };

    try {
        const response = await handleSignupApi(newData);
        if (!response) {
            throw new Error("Signup failed: No response from server");
        }
        return response; // Return the complete response
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during signup";
        throw new Error(errorMessage);
    }
}
