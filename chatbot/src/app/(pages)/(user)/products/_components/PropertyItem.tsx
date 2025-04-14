"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PropertyProps } from "@/types/property"
import ViewDetailsDialog from "./ViewDetailsDialog"
import { getStatusColor } from "@/lib/helper/statusColor"
import { useState } from "react"
import PropertyActions from "./PropertyActions"
import {useRouter} from "next/navigation"
function PropertyItem({property}:{property:PropertyProps}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Array.isArray(property.image) ? property.image : [property.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
const router=useRouter()
  return (
    <Card className="flex flex-col h-[500px] w-full transition-all duration-300 hover:shadow-lg">
      <div className="relative w-full h-48 overflow-hidden group">
        {/* <Image
          src={images[currentImageIndex]}
          alt={`${property.title} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )} */}
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(property.status)}`}>
          {property.status}
        </span>
      </div>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold truncate pr-4">{property.title}</CardTitle>
        <div className="relative">
         <PropertyActions propertyId={property._id} propertyName={property.title}/>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="font-bold text-2xl text-primary">${property.price.toLocaleString()}</p>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <p className="flex items-center gap-1">Area: {property.area} {property.unit}²</p>
          <p className="flex items-center gap-1">Front: {property.front} {property.unit}</p>
          <p className="flex items-center gap-1">Direction: {property.direction}</p>
          <p className="flex items-center gap-1">Facing: {property.facing}</p>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{property.description}</p>
      </CardContent>
      <CardFooter className="pt-4 flex gap-4">
        {property && <ViewDetailsDialog property={{ ...property }} />} 
        <Button variant="outline" className="w-full mt-4" onClick={()=>router.push(`/properties/${property._id}`)}>
                View More
              </Button>
      </CardFooter>
    </Card>
  )
}

export default PropertyItem
