'use client'

import { Button } from '@/components/ui/button'
import { Package2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function OrdersButton() {
  const router = useRouter()
  return (
    <Button variant={'ghost'} size={'icon'} onClick={()=>router.push('/orders')}><Package2 size={20} /></Button>
  )
}
