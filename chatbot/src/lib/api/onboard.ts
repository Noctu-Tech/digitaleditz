import { OnboardResponse } from "@/types/onboard";
import { ENV } from "../functions/config";
import { OnboardingFormData } from "@/schema/onboarding";

const url = ENV.BACKEND_URL + "/user"


export const handleOnboardApi = async (data: OnboardingFormData): Promise<OnboardResponse> => {
    try {
        const token=localStorage.getItem("token");
        const response = await fetch(`${url}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }
        const result = await response.json();
        
        return {
            token: result.token,
        };
    } catch (error) {
        throw error instanceof Error ? error : new Error('An error occurred during signin');
    }
}
