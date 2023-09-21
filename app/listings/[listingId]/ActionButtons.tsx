'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, Loader2, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { Save, User } from '@prisma/client'
import { signIn } from 'next-auth/react'
import prisma from '@/lib/db'

export default function ActionButtons({
    productId, 
    quantityInStock, 
    user,
    // saved
  }:{
    productId: number, 
    quantityInStock: number, 
    user:User,
    // saved: Save[]
  }) {

  const { toast } = useToast()
  const [quantity, setQuantity] = useState(0)
  const [savedStatus, setSavedStatus] = useState<boolean>()

  const getSavedStatus = async (_productId:number) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/saved/list`)
    .then(res=>res.json())
    .then(data=>data.Saved.includes(_productId))
    return data;
  }

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
  const handleAddToSaved = async () => {
    if (!user){
      signIn()
    }
    if (user){
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/saved/${savedStatus ? 'remove' : 'add'}`, {
        method: 'POST',
        headers: {
          'Content-Type':'application-json'
        },
        body:JSON.stringify({
          productId: productId
        })
      })
      getSavedStatus(productId).then(isSaved=>setSavedStatus(isSaved))
    }
  }

  useEffect(()=>{
    getSavedStatus(productId)
    .then(isSaved=>setSavedStatus(isSaved))
  }, [productId])

  return (
    <div className='flex gap-3'>
      { quantityInStock > 0 && 
        <>
          <Input className='' type='number' value={quantity} onChange={(e)=>setQuantity(Number(e.target.value))}/>
          <Button className='' onClick={handleAddToCart}><ShoppingCart className='me-3' />Add</Button>
        </>
      }
      { savedStatus != null ? 
        <Button className='' onClick={handleAddToSaved}>
          <Heart className='me-3' fill={savedStatus ? 'red' : 'none'} />{!savedStatus ? 'Save' : 'Unsave'}
        </Button>
      :
        <Button disabled>
          <Loader2 className='me-3 animate-spin' />Save
        </Button>
      }
      <p></p>
    </div>
  )
}
