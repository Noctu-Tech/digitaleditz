// hooks/useChatData.ts
import apiClient from "@/lib/functionapis/apiclient";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useChatData() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["chatOverview"],
    queryFn: async()=>{
      try {
        const response = await apiClient.get('/');
        return response.data;
      } catch (e) {
        console.error("Something went wrong", e);
        throw e; 
      }
    },
    staleTime: 60 * 1000,
    onSuccess: (data) => {
      queryClient.setQueryData(["contacts"], data.contacts);
      queryClient.setQueryData(["chatMessages"], data.chatMessages);
    },
  });
}
