'use client'
import { GetProfilebyId } from "@/lib/functions/username/profile";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import BusinessProfilePage from "../../_components/BusinessProfilePage";
import CustomerProfilePage from "../../_components/CustomerProfilePage";

function page({params}:{params:{userId:string}}) {
  const { userId }=params
  const {data:profile,isLoading,isError,error}=useQuery({
    queryKey:["user-profile"],
    queryFn:()=>GetProfilebyId(userId)
  })


  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-sm text-muted-foreground">Loading business profile...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <AlertTriangle className="w-6 h-6 text-destructive mx-auto mb-2" />
          <p className="text-sm text-destructive font-medium">Failed to load business profile.</p>
          <p className="text-xs text-muted-foreground mt-1">{(error as Error)?.message}</p>
        </div>
      </div>
    );
  }

 let Component:any= BusinessProfilePage;
 if (profile.u_role==="customer"){
  Component=CustomerProfilePage
 }


  return (
    <>
    <Component data={profile}/>
    </>
  )
}

export default page