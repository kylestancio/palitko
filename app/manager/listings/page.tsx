import { Edit, Eye, X } from 'lucide-react';
import React from 'react'
import AddListingButton from './AddListingButton';
import { Product } from '@prisma/client';
import prisma from '@/lib/db';
import { Button } from '@/components/ui/button';

export default async function ManagerListingsPage() {

  const listings = await prisma.product.findMany({})

  return (
    <div>
      <div className='container mt-7'>
        <div className='flex justify-between'>
          <h1 className="text-3xl font-bold mb-5">Manage Listings</h1>
          <AddListingButton />
        </div>
        
        { listings && listings.length === 0 && 
          <div>
            <h3 className='text-md'>No listings found.  </h3>
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
                    <Button variant={'ghost'} size={'icon'}><Eye /></Button>
                    <Button variant={'ghost'} size={'icon'}><Edit /></Button>
                    <Button variant={'ghost'} size={'icon'}><X /></Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        }

      </div>
    </div>
  )
}
