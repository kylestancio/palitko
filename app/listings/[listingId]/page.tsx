import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Heart, ShoppingCart } from 'lucide-react'
import React from 'react'

export default function ListingDetailsPage() {
  return (
    <div>
      <div className='container mt-7'>
        <div className='grid grid-cols-12 gap-36'>
          <div className='col-span-4'>
            <div className='w-full h-[600px] bg-zinc-100 dark:bg-zinc-900 rounded-xl'>
              {/* IMAGE CONTAINER */}
            </div>
          </div>
          <div className='col-span-8'>
            <h1 className="text-3xl font-bold">Product Name</h1>
            <h2 className="text-xl font-bold text-zinc-500">Category</h2>
            <p className='my-14'><span className='text-6xl font-black'>₱10</span><span className='text-2xl'>.00</span></p>

            <Button className='me-3'><ShoppingCart className='me-3' />Add to Cart</Button>
            <Button className='me-3'><Heart className='me-3' />Favorite</Button>
          </div>
        </div>

        <Separator className='my-7' />
        <h1 className='text-3xl font-medium mb-5'>Product Description</h1>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem 
          aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo 
          enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos 
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
          adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat 
          voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut 
          aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam 
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur</p>
      </div>
    </div>
  )
}
