"use client"
import { useAuth } from "@/hooks/auth";
import { GetProperty } from "@/lib/functions/property/getProperty"
import { useQuery } from "@tanstack/react-query"
import { MapPin, Ruler, Compass, DollarSign, User, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import EditPropertyDialog from "./EditPropertyDialog";

function PropertyItemPage({propertyId}:{propertyId:string}) {
    const productId = propertyId;
   
    const { hasPermission } = useAuth();
    const { data: property, isLoading } = useQuery({
        queryKey: ['property', productId],
        queryFn: () => GetProperty({productId})
    });

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <Skeleton className="h-12 w-1/2 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Skeleton className="h-64" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <Card className="max-w-4xl mx-auto my-8">
                <CardContent className="pt-6">
                    <div className="flex items-center justify-center h-32 text-muted-foreground">
                        <Info className="mr-2 h-5 w-5" />
                        Property not found or error loading property details.
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="w-full mx-auto py-8 px-4 space-y-6">
            <div className="space-y-2 flex justify-between">
                <h1 className="text-3xl font-bold tracking-tight">{property.title || "Property Details"}</h1>
<EditPropertyDialog propertyValues={property}/>
            </div>

            <Card>
               <Badge>{property.status}</Badge>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center">
                        <DollarSign className="mr-2 h-5 w-5" />
                        Pricing
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">
                        ${property.price ? property.price.toLocaleString() : 'N/A'}
                    </p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center">
                            <Ruler className="mr-2 h-5 w-5" />
                            Dimensions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-sm text-muted-foreground">Length</p>
                                <p className="font-medium">{property.length ?? 'N/A'} {property.unit}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Width</p>
                                <p className="font-medium">{property.width ?? 'N/A'} {property.unit}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <p className="text-sm text-muted-foreground">Front</p>
                                <p className="font-medium">{property.front ?? 'N/A'} {property.unit}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Area</p>
                                <p className="font-medium">{property.area ?? 'N/A'} {property.unit}²</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
    <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Location Details
        </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
        <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-medium">{property.address ?? 'No address available.'}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
            <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium">{property.city ?? 'N/A'}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">State</p>
                <p className="font-medium">{property.state ?? 'N/A'}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Zip Code</p>
                <p className="font-medium">{property.zip ?? 'N/A'}</p>
            </div>
        </div>
    </CardContent>
</Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center">
                            <Compass className="mr-2 h-5 w-5" />
                            Site Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <p className="text-sm text-muted-foreground">Direction</p>
                            <p className="font-medium">{property.direction ?? 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Facing</p>
                            <p className="font-medium">{property.facing ?? 'N/A'}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center">
                        <Info className="mr-2 h-5 w-5" />
                        Description
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        {property.description ?? 'No description available.'}
                    </p>
                </CardContent>
            </Card>

            {hasPermission(['admin']) && (
 <>   <Separator/>            <Card className="bg-muted/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center">
                            <User className="mr-2 h-5 w-5" />
                            Admin Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <p className="text-sm text-muted-foreground">User ID</p>
                            <p className="font-medium">{property.user_id}</p>
                        </div>
                    </CardContent>
                </Card>
   </>         )}
        </div>
    );
}

export default PropertyItemPage