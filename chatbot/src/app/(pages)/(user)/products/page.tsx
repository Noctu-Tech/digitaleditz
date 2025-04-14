'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'
import PropertyItem from './_components/PropertyItem'
import AddNew from './_components/AddNew'
import ProtectedRoute from '@/context/ProtectedRoute'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { GetProperties } from '@/lib/functions/property/getProperty'
import { PropertyProps } from '@/types/property'

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const {data:mockProducts = [],isLoading} = useQuery({
    queryKey: ['mockProducts'],
    queryFn:()=>GetProperties()
    })     
  const totalPages = Math.ceil(mockProducts.length / itemsPerPage)

  console.log("mockProducts",mockProducts);
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
              {getCurrentItems().map((property:PropertyProps) => (
                <div key={property._id} className="relative">
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