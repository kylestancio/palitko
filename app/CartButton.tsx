'use client'

import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

export default function CartButton() {
  return (
    <Button variant={'ghost'} size={'default'} className='flex gap-2 my-auto'>
      <ShoppingCart />
      <p>0</p>
    </Button>
  )
}
