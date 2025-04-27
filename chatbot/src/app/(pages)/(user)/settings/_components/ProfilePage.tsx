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

export default function BusinessProfile() {
  const { data: business, isLoading, isError, error } = useQuery({
    queryKey: ['business'],
    queryFn: GetProfile
  });


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return { variant: 'default' as const, icon: <CheckCircle className="h-3 w-3 mr-1" /> };
      case 'DEACTIVATED':
        return { variant: 'destructive' as const, icon: <AlertTriangle className="h-3 w-3 mr-1" /> };
      case 'PENDING':
        return { variant: 'outline' as const, icon: <AlertTriangle className="h-3 w-3 mr-1" /> };
      default:
        return { variant: 'secondary' as const, icon: null };
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return { variant: 'default' as const, icon: <CheckCircle className="h-3 w-3 mr-1" /> };
      case 'UNVERIFIED':
        return { variant: 'outline' as const, icon: <AlertTriangle className="h-3 w-3 mr-1" /> };
      default:
        return { variant: 'secondary' as const, icon: null };
    }
  };

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

  if (!business) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-sm text-muted-foreground">Business profile not found.</p>
      </div>
    );
  }

  const statusBadge = getStatusBadge(business.u_status);
  const verificationBadge = getVerificationBadge(business.u_verified);

  return (
    <>
    {/* Main container */}
    <div className="container mx-auto py-6 max-w-6xl">
      {/* Header with status information */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{business?.businessName}</h1>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant={statusBadge.variant} className="text-xs">
              {statusBadge.icon} {business?.u_status}
            </Badge>
            <Badge variant={verificationBadge.variant} className="text-xs">
              {verificationBadge.icon} {business?.u_verified}
            </Badge>
            <Badge variant="secondary" className="text-xs">{business?.u_subscription}</Badge>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <EditProfileDialog triggerEl={<Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>} userData={business}/>
          {/* <Button size="sm" onClick={() => {setUpgragePayment((prev) => !prev)}}>
            <Upload className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button> */}
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Business info */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="flex items-center text-center pb-2">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={business?.u_pfp} alt={business?.businessName} />
                  <AvatarFallback>{business?.businessName.charAt(0)}</AvatarFallback>
                </Avatar>
              <CardTitle className="text-xl mt-2">{business?.businessName}</CardTitle>
              <CardDescription className="text-sm">{business?.businessType === 'all' ? 'Agricultural, Commercial & Residential' : business.businessType}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Contact Information</h3>
                  <Separator className="my-2" />
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 mr-2 mt-0.5 text-slate-400" />
                      <span>{business?.email}</span>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-4 w-4 mr-2 mt-0.5 text-slate-400" />
                      <span>{business?.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-slate-400" />
                      <span>{business?.whatsAppPhone} (WhatsApp)</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-slate-400" />
                      <div>
                        <p>{business?.address}</p>
                        <p>{business?.city}, {business?.state} {business?.zip}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Additional Details</h3>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-slate-500">Founded</div>
                    <div className="text-right">{business?.foundedYear}</div>
                    <div className="text-slate-500">Team Size</div>
                    <div className="text-right">{business?.employees}</div>
                    <div className="text-slate-500">Role</div>
                    <div className="text-right capitalize">{business.u_role}</div>
                    <div className="text-slate-500">Business ID</div>
                    <div className="text-right truncate text-xs" title={business?._id}>
                      {business?._id.substring(9, 17)}...
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-3.5 w-3.5 mr-1" />
                    Visit Website
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Tabs with details */}
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {/* <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger> */}
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Business Overview</CardTitle>
                  <CardDescription>Complete profile information and business details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">About</h3>
                    <p className="text-sm text-slate-600">{business?.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Services Offered</h3>
                    <div className="flex flex-wrap gap-2">
                      {business?.services.map((service:any, index:any) => (
                        <Badge key={index} variant="secondary">{service}</Badge>
                      ))}
                    </div>
                  </div>
{/*                   
                  <div>
                    <h3 className="text-sm font-medium mb-2">Business Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">45</div>
                          <p className="text-xs text-slate-500">Clients</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">67</div>
                          <p className="text-xs text-slate-500">Projects</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold">89%</div>
                          <p className="text-xs text-slate-500">Satisfaction</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            </TabsContent>
{/*             
            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Services & Products</CardTitle>
                  <CardDescription>Manage your business offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-500 italic">
                    Service content would appear here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Business Analytics</CardTitle>
                  <CardDescription>Performance metrics and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-500 italic">
                    Analytics content would appear here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-500 italic">
                    Settings content would appear here
                  </div>
                </CardContent>
              </Card>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </div>
</> 
  );
}
