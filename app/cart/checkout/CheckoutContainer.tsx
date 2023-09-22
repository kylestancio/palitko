'use client'

import { Cart, Product } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import PaymentContainer from './PaymentContainer'

interface CartWithProduct extends Cart {
  product: Product
}

export default function CheckoutContainer() {

  const [cartItems, setCartItems] = useState<CartWithProduct[]>()

  const getData = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/list`).then(res=>res.json())
    return data;
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
          <h3 className='text-md'>You don&lsquo;t have anything to checkout yet.</h3>
        </div>
      }

      { cartItems && cartItems.length > 0 && 
        <div className='grid grid-cols-2 gap-3 rounded-lg border overflow-hidden'>
          <div className='bg-zinc-100 dark:bg-zinc-900 p-14'>
            <h2 className='text-2xl mb-14'>My Items</h2>
            <div className='px-3'>
              { cartItems.map((item) => (
                <div key={item.id} className='p-2 last:mb-14 border bg-white dark:bg-zinc-800 first:rounded-t-lg last:rounded-b-lg flex justify-between'>
                  <div>
                    <p className='font-bold'>{item.product.name}</p>
                    <p>Qty: { item.quantity }</p>
                  </div>
                  <div className='my-auto'>
                    <p>Php {item.product.price.toFixed(2).toLocaleString()} </p>
                  </div>
                </div>
              )) }
            </div>
            <div className='p-2 flex justify-between'>
              <p className='font-bold my-auto'>Total</p>
              <p className='text-4xl my-auto'>Php {cartItems.reduce((a, item)=>a + item.product.price * item.quantity, 0).toFixed(2).toLocaleString()}</p>
            </div>
          </div>
          <PaymentContainer className='p-14' />
        </div>
      }
    </div>
  )
}
