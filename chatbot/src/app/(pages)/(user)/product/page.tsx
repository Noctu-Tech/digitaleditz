'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Add this interface after imports
interface Property {
  id: number;
  title: string;
  image: string;
  length: number;
  width: number;
  front: number;
  direction: string;
  facing: string;
  unit: string;
  area: () => number;
  price: number;
  description: string;
  status: string;
}

const mockProducts = [
  ...Array(30).fill(0).map((_, i) => ({
    id: i + 1,
    title: `Property ${i + 1}`,
    image: `https://picsum.photos/seed/${i + 1}/400/300`,
    length: Math.floor(Math.random() * 100) + 20,
    width: Math.floor(Math.random() * 50) + 15,
    front: Math.floor(Math.random() * 40) + 10,
    direction: ['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)],
    facing: ['Main Road', 'Park', 'Street', 'Corner'][Math.floor(Math.random() * 4)],
    unit: ['ft', 'm', 'yard'][Math.floor(Math.random() * 3)],
    area: function() { return this.length * this.width },
    price: Math.floor(Math.random() * 1000000) + 100000,
    description: `Beautiful property with ${Math.floor(Math.random() * 5) + 2} bedrooms...`,
    status: ['For Sale', 'Sold', 'For Rent', 'Rented'][Math.floor(Math.random() * 4)]
  }))
]

const getStatusColor = (status: string) => {
  switch(status) {
    case 'For Sale': return 'bg-green-100 text-green-800'
    case 'Sold': return 'bg-red-100 text-red-800'
    case 'For Rent': return 'bg-blue-100 text-blue-800'
    case 'Rented': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const ViewDetailsDialog = ({ property }: { property: Property }) => {
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

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const totalPages = Math.ceil(mockProducts.length / itemsPerPage)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'For Sale': return 'bg-green-100 text-green-800'
      case 'Sold': return 'bg-red-100 text-red-800'
      case 'For Rent': return 'bg-blue-100 text-blue-800'
      case 'Rented': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return mockProducts.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Property Listings</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Property</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Property title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="for-rent">For Rent</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="length">Length</Label>
                  <Input id="length" type="number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="width">Width</Label>
                  <Input id="width" type="number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="front">Front</Label>
                  <Input id="front" type="number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="direction">Direction</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                      {['North', 'South', 'East', 'West'].map(dir => (
                        <SelectItem key={dir} value={dir.toLowerCase()}>{dir}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="facing">Facing</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select facing" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Main Road', 'Park', 'Street', 'Corner'].map(face => (
                        <SelectItem key={face} value={face.toLowerCase()}>{face}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ft">ft</SelectItem>
                      <SelectItem value="m">m</SelectItem>
                      <SelectItem value="yard">yard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="min-h-[100px] rounded-md border p-3"
                  placeholder="Property description..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex flex-col items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    Choose Image
                  </Button>
                  {previewUrl && (
                    <div className="relative w-full h-40">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-contain rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button>Create Listing</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="h-[calc(100vh-200px)] overflow-y-auto mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getCurrentItems().map((product) => (
            <Card key={product.id} className="flex flex-col h-[500px] w-full">
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
              <CardHeader className="flex-none">
                <CardTitle className="text-lg truncate">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-2">
                <p className="font-semibold text-xl">${product.price.toLocaleString()}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Area: {product.area()} {product.unit}²</p>
                  <p>Front: {product.front} {product.unit}</p>
                  <p>Direction: {product.direction}</p>
                  <p>Facing: {product.facing}</p>
                </div>
                <p className="text-gray-600 line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter className="flex-none">
                <ViewDetailsDialog property={product} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant="outline"
            className={cn(
              "h-10 w-10",
              currentPage === page && "bg-primary text-primary-foreground"
            )}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ProductPage