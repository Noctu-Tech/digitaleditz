import { OnboardResponse } from "@/types/onboard";
import { OnboardingFormData } from "@/schema/onboarding";
import apiClient from "./apiclient";

export const handleOnboardApi = async (data: OnboardingFormData): Promise<OnboardResponse> => {
    try {
        console.log("data",data)
        const response = await apiClient.post('/user/create',data);
        
        // Log the successful response
        console.log("User creation response:", response.data);
        
        return {
            "message": "successful" // Fixed typo from "mesage" to "message"
        };
    } catch (error: any) {
        // More detailed error handling
        console.error("User creation failed:", error.response?.data || error.message);
        
        // You can customize error messages based on status codes
        if (error.response?.status === 409) {
            throw new Error('User already exists');
        } else if (error.response?.status === 400) {
            throw new Error(error.response.data.detail || 'Invalid data provided');
        }
        
        throw error.response?.data?.detail || 
              error.message || 
              'An error occurred during user creation';
    }
}