'use client'

import { Badge } from '@/components/ui/badge'
import { Product } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function CategoriesContainer({categories}:{categories:string}) {

  const [listings, setListings] = useState<Product[]>();

  const getData = async (_categories:string) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/all?categories=${_categories}`).then(res=>res.json())
    return data;
  }

  useEffect(()=>{
    console.log(`CATEGORY: ${categories}`)
    getData(categories).then(data=>setListings(data))
  },[categories])

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
              <Link key={i} href={`${process.env.NEXT_PUBLIC_URL}/listings/${listing.id}`}>
                <div className='relative w-full h-[300px] bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden'>
                  { listing.imageLink && 
                    <Image src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${process.env.NEXT_PUBLIC_IMAGE_PATH}/${listing.imageLink}`} alt='image' className='object-cover object-center' fill />
                  }
                  { listing.quantityInStock === 0 && 
                    <div className='absolute w-full h-full bg-zinc-950 z-20 bg-opacity-90 flex hover:bg-opacity-25 transition-all'>
                      <p className="m-auto text-center text-4xl text-red-500 font-bold">Out of stock</p>
                    </div>
                  }
                  { listing.quantityInStock <= 5 && listing.quantityInStock > 0 && 
                    <div className='absolute w-full h-full p-3'>
                      <Badge>{listing.quantityInStock} left</Badge>
                    </div>
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
