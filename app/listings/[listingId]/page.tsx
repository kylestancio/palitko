import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/db'
import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import ActionButtons from './ActionButtons'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function ListingDetailsPage({params}:{params:{listingId:string}}) {

  const session = await getServerSession(authOptions)
  const user = session ? session.user : null;

  const listing = await prisma.product.findFirst({
    where: {
      id: Number(params.listingId)
    }
  })

  if (listing==null){
    return (
      <div className='w-screen h-[calc(100vh-63px)] flex'>
        <div className='m-auto'>
          <Image src={'/pose_ng_man.png'} alt='pose kuyashii man' className={'mx-auto'} width={300} height={300} />
          <h1 className="text-5xl font-black m-auto">Cannot find the product you&lsquo;re looking for.</h1>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='container mt-7'>
        <div className='grid grid-cols-12 gap-10'>
          <div className='col-span-4'>
            <div className='w-full h-[600px] bg-zinc-100 dark:bg-zinc-900 rounded-xl'>
              {/* IMAGE CONTAINER */}
            </div>
          </div>
          <div className='col-span-8'>
            <h1 className="text-3xl font-bold">{listing.name}</h1>
            { listing.categories.length === 0 && 
              <h2 className="text-xl font-bold text-zinc-500">Uncategorized</h2>
            }
            { listing.categories.length > 0 && 
              <h2 className="text-xl font-bold text-zinc-500">{listing.categories.join(',')}</h2>
            }
            <div className='my-14'>
              <p><span className='text-6xl font-black'>₱{listing.price.toFixed(0)}</span><span className='text-2xl'>.{listing.price.toFixed(2).toString().slice(-2)}</span></p>
              { listing.quantityInStock > 0 ?   
                <p>In Stock: {listing.quantityInStock}</p>
                :
                <p className='text-red-600'>Out of stock.</p>
              }
            </div>
            <ActionButtons productId={listing.id} quantityInStock={listing.quantityInStock} user={user} />
          </div>
        </div>

        <Separator className='my-7' />
        <h1 className='text-3xl font-medium mb-5'>Product Description</h1>
        <p>{listing.description}</p>
      </div>
    </div>
  )
}
