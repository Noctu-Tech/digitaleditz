'use server'
import apiClient from "./apiclient";
const handleDemo = async (form: any) => {
  
console.log("apiClient:", apiClient);
console.log("typeof apiClient.post:", typeof apiClient?.post);

  console.log("@FORM",form)
  try {
    const response = await apiClient.post(`/demo/`, form);
    console.log("@OUTSIDE",response);
    
    if (response.status === 200) {
      console.log("@INSIde",response);
      return response.data
    }
  } catch (error: any) {
  console.error("Somethng went wrong",error)  
}
};

export { handleDemo };

