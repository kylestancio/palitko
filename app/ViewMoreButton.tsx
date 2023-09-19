'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ViewMoreButton({href}:{href:string}) {

  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <Button variant={'ghost'} onClick={handleClick}>View more <ArrowRight className="ms-2" /></Button>
  )
}
