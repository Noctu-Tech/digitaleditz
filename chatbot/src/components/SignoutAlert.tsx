'use client'
import { Button } from '@/components/ui/button'
import { ArrowRightSquare } from 'lucide-react'
import React from 'react'

function SignoutAlert() {
  return (
    <Button variant={"ghost"} className='w-full flex justify-start h-full'><ArrowRightSquare className="h-4 w-4 mr-2" />
                    <span>Sign out</span></Button>)
}

export default SignoutAlert
