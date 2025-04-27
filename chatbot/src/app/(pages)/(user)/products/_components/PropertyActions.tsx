"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { MoreVertical, PenBoxIcon, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import DeletepropertyDialog from './DeletePropertyDialog'
import { useRouter } from 'next/navigation'

interface Props{
    propertyId:string;
    propertyName:string;
}

function PropertyActions({propertyId,propertyName}:Props) {
  const [showdeleteDialog,setShowdeletedialog]=useState(false);
  const router=useRouter()
    return (
  <>
  <DeletepropertyDialog 
  open={showdeleteDialog} 
  setOpen={setShowdeletedialog} 
  propertyName={propertyName}
  propertyId={propertyId}  
  />
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="z-50" align="end">
      <DropdownMenuItem className="cursor-pointer text-yellow-600 flex justify-start"><Button variant={"ghost"} onClick={()=>{router.push(`products/view-product/${propertyId}`)}}><PenBoxIcon size={12}/>Edit</Button></DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer text-destructive flex justify-start"><Button variant={"ghost"} onClick={()=>setShowdeletedialog((prev)=>!prev)}><Trash2Icon size={12}/>Delete</Button></DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu></>
   )
}

export default PropertyActions
