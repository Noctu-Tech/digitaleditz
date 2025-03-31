import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PropertyProps } from "@/types/property"
import Image from "next/image"
import ViewDetailsDialog from "./ViewDetailsDialog"
import { getStatusColor } from "@/lib/helper/statusColor"

function PropertyItem({property}:{property:PropertyProps}) {
  return (
    <Card  className="flex flex-col h-[500px] w-full">
    <div className="relative w-full h-48">
      <Image
        src={property.image}
        alt={property.title}
        fill
        className="object-cover rounded-t-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(property.status)}`}>
        {property.status}
      </span>
    </div>
    <CardHeader className="flex-none">
      <CardTitle className="text-lg truncate">{property.title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow space-y-2">
      <p className="font-semibold text-xl">${property.price.toLocaleString()}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <p>Area: {property.area()} {property.unit}²</p>
        <p>Front: {property.front} {property.unit}</p>
        <p>Direction: {property.direction}</p>
        <p>Facing: {property.facing}</p>
      </div>
      <p className="text-gray-600 line-clamp-2">{property.description}</p>
    </CardContent>
    <CardFooter className="flex-none">
      <ViewDetailsDialog property={property} />
    </CardFooter>
  </Card>  )
}

export default PropertyItem
