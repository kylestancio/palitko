'use client'

import React, { useEffect, useState } from 'react'
import { Edit, Eye, Loader2, X } from 'lucide-react';
import { Product } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ListingsContainer() {

  const router = useRouter()
  const [listings, setListings] = useState<Product[]>();
  const getData = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manager/listings/all`).then(res=>res.json())
    return data;
  }
  const handleView = (listingId:number) => {
    router.push(`/listings/${listingId}`)
  }
  const handleEdit = (listingId:number) => {
    router.push(`/manager/listings/edit/${listingId}`)
  }
  const handleDelete = async (listingId:number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/manager/listings/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: listingId})
    })

    getData().then(data=>setListings(data))

  }

  useEffect(()=>{
    getData().then(data=>setListings(data))
  },[])

  return (
    <div>
      { !listings && 
        <div className='flex gap-3'>
          <Loader2 className='animate-spin' />
          <h3 className='text-md'>Loading...</h3>
        </div>
      }

      { listings && listings.length === 0 && 
        <div>
          <h3 className='text-md'>No listings found.</h3>
        </div>
      }

      { listings && listings.length > 0 &&
        <>
          <p className='mb-3'>Displaying {listings.length} item{listings.length > 1 && 's'}.</p>
          <div className='w-full'>
            { listings.map((listing, i)=>(
              <div key={listing.id} className='mb-1 flex justify-between bg-zinc-100 dark:bg-zinc-900 p-2 first:rounded-t-lg last:rounded-b-lg'>
                <div>
                  <p className='font-bold'>{listing.name}</p>
                  <p>{ listing.categories.length > 0 && listing.categories.join(', ')}</p>
                  <p>{ listing.categories.length === 0 && 'no tags'}</p>
                  <p>In stock: {listing.quantityInStock}</p>
                </div>
                <div className='my-auto flex gap-1'>
                  <Button variant={'ghost'} size={'icon'} onClick={()=>handleView(listing.id)}><Eye /></Button>
                  <Button variant={'ghost'} size={'icon'} onClick={()=>handleEdit(listing.id)}><Edit /></Button>
                  <Button variant={'ghost'} size={'icon'} onClick={()=>handleDelete(listing.id)}><X /></Button>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    </div>
  )
}
