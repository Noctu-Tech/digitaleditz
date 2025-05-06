import { GetProfilebyId } from "@/lib/functions/username/profile";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProfileRenderer from "../../_components/ProfileRender";

export default async function Page({ params }: { params: { userId: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user-profile", params.userId],
    queryFn: () => GetProfilebyId(params.userId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileRenderer userId={params.userId} />
    </HydrationBoundary>
  );
}
