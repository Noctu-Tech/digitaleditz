'use client';

import { GetProfilebyId } from "@/lib/functions/username/profile";
import { useQuery } from "@tanstack/react-query";
import BusinessProfilePage from "./BusinessProfilePage";
import CustomerProfilePage from "./CustomerProfilePage";
import { AlertTriangle } from "lucide-react";

export default function ProfileRenderer({ userId }: { userId: string }) {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => GetProfilebyId(userId),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-sm text-muted-foreground">Loading business profile...</p>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <AlertTriangle className="w-6 h-6 text-destructive mx-auto mb-2" />
          <p className="text-sm text-destructive font-medium">Failed to load business profile.</p>
          <p className="text-xs text-muted-foreground mt-1">
            {(error as Error)?.message}
          </p>
        </div>
      </div>
    );
  }

  const Component =
    profile.u_role === "customer"
      ? CustomerProfilePage
      : BusinessProfilePage;

  return <Component data={profile} />;
}
