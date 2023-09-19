import Link from 'next/link'
import React from 'react'

export default function ListingsPage() {
  return (
    <div>
      <div className="container mt-7">
        <h1 className='text-4xl mb-5'>Listings</h1>
        <div className='grid grid-cols-5 gap-2'>
          { [...new Array(20)].map((_, i)=>(
            <Link key={i} href={'/listings/1'}>
              <div className='w-full h-[300px] bg-zinc-100 dark:bg-zinc-900 rounded-lg'>
                {/* IMAGE CONTAINER */}
              </div>
              <p className='text-2xl font-bold truncate'>Name</p>
              <p className='text-zinc-500 truncate mb-3'>Category</p>
              <p>Php 150.00</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
