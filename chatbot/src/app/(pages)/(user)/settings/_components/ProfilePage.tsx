'use client';

import { useQuery } from '@tanstack/react-query';
import { GetProfile } from '@/lib/functions/username/profile';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Mail, Phone, MessageSquare, AlertTriangle, CheckCircle, Edit, ExternalLink, Upload } from 'lucide-react';
import EditProfileDialog from './EditProfileDialog';
import BusinessProfilePage from '../../user/_components/BusinessProfilePage';

export default function BusinessProfile() {
  const { data: business, isLoading, isError, error } = useQuery({
    queryKey: ['business'],
    queryFn: GetProfile
  });

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
return (<>
<BusinessProfilePage data={business}/>
</>)
}