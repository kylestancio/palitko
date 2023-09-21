'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

export default function ActionButtons({productId}: {productId: number}) {
  const { toast } = useToast()

  const [quantity, setQuantity] = useState(0)

  const handleAddToCart = async () => {
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

  return (
    <div className='flex gap-3'>
      <Input className='' type='number'  value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}/>
      <Button className='' onClick={handleAddToCart}><ShoppingCart className='me-3' />Add</Button>
      <Button className=''><Heart className='me-3' />Favorite</Button>
    </div>
  )
}
