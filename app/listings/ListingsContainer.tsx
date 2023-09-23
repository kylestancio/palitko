'use client'

import { Product } from '@prisma/client';
import { ListEnd, Loader2 } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function ListinigsContainer() {

  const [listings, setListings] = useState<Product[]>();

  const getData = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/all`).then(res=>res.json())
    return data;
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
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
            { listings.map((listing, i)=>(
              <Link key={i} href={`listings/${listing.id}`}>
                <div className='relative w-full h-[300px] bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden'>
                  { listing.imageLink && 
                    <Image src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${process.env.NEXT_PUBLIC_IMAGE_PATH}/${listing.imageLink}`} alt='image' className='object-cover object-center' fill />
                  }
                  {/* IMAGE CONTAINER */}
                </div>
                <p className='text-2xl font-bold truncate'>{listing.name}</p>
                { listing.categories.length === 0 && 
                  <p className='text-zinc-500 truncate mb-3'>uncategorized</p>
                }
                { listing.categories.length > 0 && 
                  <p className='text-zinc-500 truncate mb-3'>{listing.categories.join(',')}</p>
                }
                <p>Php {listing.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </>
      }
    </div>
  )
}
