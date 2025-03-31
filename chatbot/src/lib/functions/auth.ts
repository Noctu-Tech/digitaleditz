import { userSigninSchema, UserSigninSchemaType, userSignupSchema, UserSignupSchemaType } from "@/schema/auth";
import { handleSigninApi, handleSignupApi } from "../api/auth";
import { redirect } from "next/navigation";


export const handleSignin=async(form:UserSigninSchemaType )=>{
const {success,data}=userSigninSchema.safeParse(form);
if(!success){
    throw new Error("invalid form data")
}

const result=await handleSigninApi(data);
console.log(result);
if(!result){
    throw new Error("Failed to Signin")
}
localStorage.setItem("token",result.token);
redirect(`/dashboard`)
}

export const handleSignup = async (form: UserSignupSchemaType) => {
    const {success,data}=userSignupSchema.safeParse(form);
    if(!success){
        throw new Error("invalid form data")
    }
    const newdata={username:data.username,email:data.email,password:data.password}
    const result=await handleSignupApi(newdata);
    if(!result || !result.token){
        throw new Error("Failed to Signup")
    }
    localStorage.setItem("token",result.token);
    
    
    
}
