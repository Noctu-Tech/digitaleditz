"use client"
import { ParamProps } from '@/types/appNode'
import React from 'react'

function ProductParam({param}:ParamProps) {
  return (
    <div>
      {/* return list of products here */}
      {param.name}
    </div>
  )
}

export default ProductParam
