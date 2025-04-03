import { OnboardingFormData, onboardingSchema } from "@/schema/onboarding";
import { handleOnboardApi } from "../api/onboard";


export const handleOnboarding=async(form:OnboardingFormData )=>{
const {success,data}=onboardingSchema.safeParse(form);
if(!success){
    throw new Error("invalid form data")
}

const result=await handleOnboardApi(data);
console.log(result);
if(!result){
    console.log("@inside")
    throw new Error("Failed to OnBoard")
}

}
