'use client'

import { useQuery } from '@tanstack/react-query';
import { GetmyProfile } from '@/lib/functions/username/profile';
import BusinessProfilePage from '../../user/_components/BusinessProfilePage';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/auth';

export default function BusinessProfile() {
  const { data: business, isLoading, isError, error } = useQuery({
    queryKey: ['business'],
    queryFn: GetmyProfile
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-sm text-muted-foreground">Loading business profile...</p>
      </div>
    );
  }

  if (!business||isError) {
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
return (<>
<BusinessProfilePage data={business}/>
</>)
}