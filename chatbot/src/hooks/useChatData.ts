// hooks/useChatData.ts
import { fetchOverview } from "@/lib/functions/messages";
import { useQuery, useQueryClient } from "@tanstack/react-query";
    
export function useChatData() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["chatOverview"],
    queryFn: fetchOverview,
    staleTime: 60 * 1000,
    onSuccess: (data) => {
      queryClient.setQueryData(["contacts"], data.contacts);
      queryClient.setQueryData(["chatMessages"], data.chatMessages);
    },
  });
}
