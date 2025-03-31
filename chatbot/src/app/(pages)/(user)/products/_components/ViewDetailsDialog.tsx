import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getStatusColor } from "@/lib/helper/statusColor"
import { PropertyProps } from "@/types/property"
import Image from "next/image"

function ViewDetailsDialog({property}:{property:PropertyProps}) {
  return (
    <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">View Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{property.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="relative w-full h-[300px]">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(property.status)}`}>
                  {property.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Dimensions</h3>
                  <p>Length: {property.length} {property.unit}</p>
                  <p>Width: {property.width} {property.unit}</p>
                  <p>Front: {property.front} {property.unit}</p>
                  <p>Total Area: {property.area()} {property.unit}²</p>
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
            </div>
          </DialogContent>
        </Dialog>
  )
}

export default ViewDetailsDialog
