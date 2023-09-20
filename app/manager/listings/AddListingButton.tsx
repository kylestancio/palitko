'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AddListingButton() {

  const router = useRouter();

  const handleAddListing = () => {
    router.push('/manager/listings/add')
  }

  return (
    <Button onClick={handleAddListing}><Plus />Add Listing</Button>
  )
}
