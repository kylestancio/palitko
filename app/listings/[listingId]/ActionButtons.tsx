'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { User } from '@prisma/client'
import { signIn } from 'next-auth/react'

export default function ActionButtons({productId, quantityInStock, user}: {productId: number, quantityInStock: number, user:User}) {
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(0)
  const handleAddToCart = async () => {

    if (!user){
      signIn()
    }

    if (user){
      try{
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: productId,
            quantity: quantity
          })
        })
        
        toast({
          title: "Product added to cart.",
        })
      }catch(err){
        toast({
          variant: 'destructive',
          title: 'Failed to add product to cart.'
        })
      }
    }
  }

  return (
    <div className='flex gap-3'>
      { quantityInStock > 0 && 
        <>
          <Input className='' type='number'  value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}/>
          <Button className='' onClick={handleAddToCart}><ShoppingCart className='me-3' />Add</Button>
        </>
      }
      <Button className=''><Heart className='me-3' />Favorite</Button>
    </div>
  )
}
