'use client'

import { Button } from '@/components/ui/button'
import { Loader2, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function CartButton() {

  const router = useRouter()

  const handleOpenCart = () => {
    router.push('/cart')
  }

  return (
    <Button variant={'ghost'} size={'icon'} className='flex gap-2 my-auto' onClick={handleOpenCart}>
      <ShoppingCart size={20} />
    </Button>
  )
}
