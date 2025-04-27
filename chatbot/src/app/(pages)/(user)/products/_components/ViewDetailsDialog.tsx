'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PropertyProps } from "@/types/property"


import PropertyActions from "./PropertyActions"
import { useAuth } from "@/hooks/auth"

function ViewDetailsDialog({property}:{
  property: PropertyProps; // Modified type

}) {
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const images = property?.images ? (Array.isArray(property.images) ? property.images : [property.images]) : []

  // const nextImage = () => {
  //   if (images.length > 1) {
  //     setCurrentImageIndex((prev) => (prev + 1) % images.length)
  //   }
  // }

  // const prevImage = () => {
  //   if (images.length > 1) {
  //     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  //   }
  // }

  if (!property) return null
const {hasPermission}=useAuth();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Preview</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[625px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{property.title}</DialogTitle>
         <PropertyActions propertyId={property._id} propertyName={property.title}/>
        </DialogHeader>
        <ScrollArea className="max-h-[500px]">
          <div className="grid gap-6 py-4">
            {/* <div className="space-y-4">
              <div className="relative w-full h-[300px] overflow-hidden">
                {images.length > 0 && (
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${property.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full"
                    >
                      <ChevronRight className="h-4 w-4 text-white" />
                    </button>
                  </>
                )}
                <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                      currentImageIndex === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${property.title} - Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div> */}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Dimensions</h3>
                <p>Length: {property.length} {property.unit}</p>
                <p>Width: {property.width} {property.unit}</p>
                <p>Front: {property.front} {property.unit}</p>
                <p>Total Area: {property.area} {property.unit}²</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Location Details</h3>
                <p>Direction: {property.direction}</p>
                <p>Facing: {property.facing}</p>
              </div>
            </div>
  
            <div>
              <h3 className="font-semibold mb-2">Price</h3>
              <p className="text-2xl font-bold">${property.price.toLocaleString()}</p>
            </div>
  
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{property.description}</p>
            </div>
            {hasPermission(['admin'])&&<div>
              <h3 className="font-semibold mb-2">User Id:</h3>
              <p className="text-gray-600">{property.user_id}</p>
            </div>}
          </div>
        </ScrollArea>
      </DialogContent>
     
    </Dialog>
  )
}

export default ViewDetailsDialog
