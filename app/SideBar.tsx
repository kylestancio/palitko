'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function SideBar() {

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleLinkClick = (link:string) => {
    setOpen(false);
    router.push(link)
  }

  useEffect(()=>{
    if (open){
      document.documentElement.style.overflow = 'hidden';
    }else{
      document.documentElement.style.overflow = 'auto';
    }
  }, [open])

  return (
    <div>
      <Button variant={'outline'} size={'icon'} className='me-3 lg:hidden' onClick={()=>setOpen(true)}><HamburgerMenuIcon /></Button>
      <div className={cn('z-10 transition absolute top-0 bottom-0 left-0 max-w-[400px] bg-zinc-200 dark:bg-zinc-900 shadow-md outline outline-1 outline-r outline-zinc-400 p-7 -translate-x-[400px]', open && 'translate-x-0')}>
        <div className='flex justify-between mb-5'>
          <h1 className='text-2xl font-bold'>PALITKO</h1>
          <Button variant={'ghost'} size={'icon'} onClick={()=>setOpen(false)}><X /></Button>
        </div>
        <div>
          <Button variant={'link'} className='text-xl w-full mb-4' onClick={()=>handleLinkClick('/')}>Home</Button>
          <Button variant={'link'} className='text-xl w-full mb-4' onClick={()=>handleLinkClick('/listings')}>Listings</Button>
          <Button variant={'link'} className='text-xl w-full mb-4' onClick={()=>handleLinkClick('/categories')}>Categories</Button>
        </div>
      </div>
      <div className={cn('hidden absolute inset-0 backdrop-blur-md', open && 'block')} onClick={()=>setOpen(false)}></div>
    </div>
  )
}
