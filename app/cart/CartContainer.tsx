'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Cart, Product } from '@prisma/client'
import { Eye, Loader2, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface CartWithProduct extends Cart {
  product: Product
}

export default function CartContainer() {

  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartWithProduct[]>()
  const router = useRouter();

  const getData = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/list`).then(res=>res.json())
    return data;
  }

  const handleView = (productId:number) => {
    router.push(`/listings/${productId}`)
  }

  const handleRemove = async (cartItemId:number) => {
    try{
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: cartItemId
        })
      })
      getData().then(data=>setCartItems(data))
      toast({
        title: 'Cart item removed.'
      })
    }catch(err){
      toast({
        variant: 'destructive',
        title: 'Something went wrong.'
      })
    }
  }

  const handleCheckout = async () => {
    router.push('/cart/checkout')
  }

  useEffect(()=>{
    getData().then(data=>setCartItems(data))
  }, [])

  return (
    <div>
      { !cartItems && 
        <div className='flex gap-3'>
          <Loader2 className='animate-spin' />
          <h3 className='text-md'>Loading...</h3>
        </div>
      }

      { cartItems && cartItems.length === 0 && 
        <div>
          <h3 className='text-md'>You have not added anything to your cart yet.</h3>
        </div>
      }

      { cartItems && cartItems.length > 0 &&
        <>
          <p className='mb-3'>Displaying {cartItems.length} item{cartItems.length > 1 && 's'}.</p>
          <div className='w-full mb-7'>
            { cartItems.map((cartItem, i)=>(
              <div key={cartItem.id} className='mb-1 flex justify-between bg-zinc-100 dark:bg-zinc-900 p-2 first:rounded-t-lg last:rounded-b-lg'>
                <div>
                  <Link href={`/listings/${cartItem.productId}`}>
                    <p className='font-bold hover:underline underline-offset-4'>{cartItem.product.name}</p>
                  </Link>
                  <p>Qty: {cartItem.quantity}</p>
                  <p>Subtotal: Php {(cartItem.quantity * cartItem.product.price).toFixed(2) }</p>
                </div>
                <div className='my-auto flex gap-1'>
                  <Button variant={'ghost'} size={'icon'} onClick={()=>handleView(cartItem.productId)}><Eye /></Button>
                  <Button variant={'ghost'} size={'icon'} onClick={()=>handleRemove(cartItem.id)}><X /></Button>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-end'>
            <Button onClick={handleCheckout}>Checkout</Button>
          </div>
        </>
      }
    </div>
  )
}
