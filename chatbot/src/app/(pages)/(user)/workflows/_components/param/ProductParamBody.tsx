"use client"
import { ParamProps } from '@/types/appNode'
import React from 'react'

function ProductParamBody({param}:ParamProps) {
  return (
    <div>
      {/* return list of products here */}
      {param.name}
    </div>
  )
}

export default ProductParamBody
