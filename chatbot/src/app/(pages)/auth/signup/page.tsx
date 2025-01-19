import Link from 'next/link'
import React from 'react'

function Page() {
  return (
    <div className=' w-full h-full p-2 gap-2 flex justify-evenly place-items-center'>
      <div>
Join us and get your business running 
      </div>
   <div className='h-1/2 w-0 border-white border-2'></div>
    <div className='bg-white text-black flex flex-col gap-3 border-2 border-black p-2 '>
    Already have an account? <Link href={'../auth/signin'}>Signin</Link>
      <form className='flex flex-col gap-1'>
    <div className='border-2 border-black'>
    <input type="email" placeholder='email'/></div>
    <div className='border-2 border-black'>
    <input type="password" placeholder='Password'/></div>
      
    <div className='border-2 border-black'>
    <input type="text" placeholder='Confirm Password'/></div>
      </form>
      <div className="border-2 border-black"></div>
      <div className='flex justify-center place-items-center'>
      <button type="submit" className='flex justify-center place-items-center'>Sign up</button>
      </div>
    </div>
    </div>
  )
}

export default Page