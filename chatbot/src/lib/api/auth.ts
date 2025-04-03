import { AuthData, AuthResponse, SignupData } from "@/types/auth";
import { ENV } from "../functions/config"

const url = ENV.BACKEND_URL + "/auth"


export const handleSigninApi = async (data: AuthData): Promise<AuthResponse> => {
    try {
        const response = await fetch(`${url}/login`, {
            method: 'POST',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }
        
    return await response.json();
  
    } catch (error) {
        throw error instanceof Error ? error : new Error('An error occurred during signin');
    }
}

export const handleSignupApi = async (data: SignupData): Promise<AuthResponse> => {
    try {
        const backendData = {
            username: data.username,  // Changed from name
            email: data.email,
            password: data.password
        };
        
        const response = await fetch(`${url}/signup`, {
            method: 'POST',
            credentials:"include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(backendData)
        });
        console.log(response);

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        return await response.json();
    } catch (error) {
        throw error instanceof Error ? error : new Error('An error occurred during signup');
    }
}
