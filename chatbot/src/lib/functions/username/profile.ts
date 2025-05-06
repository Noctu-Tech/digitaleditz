import { GetMyProfile,GetMy, GetProfile } from "@/lib/functionapis/profile";
import { GetAllUsers } from "@/lib/functionapis/user";

export async function GetMe() {
  console.log("GetMe function called"); 
  try {
      const data  = await GetMy();
      return data;
  } catch (error) {
      console.error('Error fetching user:', error);
      throw error; 
  }
}
export const GetUsers = async () => {
try{
  const response=await GetAllUsers();
  console.log("@RESPONSE",response)
  return response;

}catch(e){
  console.error("Error fetching users:",e)
  throw e
}
 }

export const GetmyProfile = async()=>{
  try {
    console.log("SOMETHING HERE !")
    const data= await GetMyProfile()
    console.log("Something here",data)
    return data
  } catch (error) {
    console.error("Get Profile",error)
    throw error
  }
}

export const EditProfile=async(values:any)=>{

}

export const GetProfilebyId=async(id:string)=>{
  try {
    console.log(id)
    const data= await GetProfile(id)
    console.log(data)
    return data
  } catch (error) {
    console.error("Get Profile",error)
    throw error
  }
}
