'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'
import PropertyItem from './_components/PropertyItem'
import AddNew from './_components/AddNew'
import ProtectedRoute from '@/context/ProtectedRoute'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2 } from 'lucide-react'
const mockProducts = [
  // ...Array(30).fill(0).map((_, i) => ({
  //   id: String(i + 1),
  //   title: `Property ${i + 1}`,
  //   image: `https://picsum.photos/seed/${i + 1}/400/300`,
  //   length: Math.floor(Math.random() * 100) + 20,
  //   width: Math.floor(Math.random() * 50) + 15,
  //   front: Math.floor(Math.random() * 40) + 10,
  //   direction: ['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)],
  //   facing: ['Main Road', 'Park', 'Street', 'Corner'][Math.floor(Math.random() * 4)],
  //   unit: ['ft', 'm', 'yard'][Math.floor(Math.random() * 3)],
  //   area: function() { return this.length * this.width },
  //   price: Math.floor(Math.random() * 1000000) + 100000,
  //   description: `Beautiful property with ${Math.floor(Math.random() * 5) + 2} bedrooms...`,
  //   status: ['For Sale', 'Sold', 'For Rent', 'Rented'][Math.floor(Math.random() * 4)]
  // }))
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

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const totalPages = Math.ceil(mockProducts.length / itemsPerPage)

  
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return mockProducts.slice(startIndex, startIndex + itemsPerPage)
  }

  return (
    <ProtectedRoute>
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Property Listings</h1>
        <AddNew/>
      </div>
      {getCurrentItems().length === 0 && (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
          <Building2 className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h2>
          <p className="text-gray-500 mb-4">Get started by adding your first property listing</p>
          <AddNew triggerText='Add Your First Property'/>
        </div>
      )}
      {getCurrentItems().length !== 0 && (
        <><div className="h-[calc(100vh-200px)]">
          <ScrollArea className="h-full w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
              {getCurrentItems().map((property) => (
                <div key={property.id} className="relative">
                  <PropertyItem property={property}/>
                  
                </div>
              ))}
            </div>
          </ScrollArea>
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
        </div></>
      )}
    </div>
    </ProtectedRoute>
  )
}

export default ProductPage