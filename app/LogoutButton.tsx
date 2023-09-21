'use client'

import { signOut } from "next-auth/react"
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import React from 'react'

export default function LogoutButton() {

  return (
    <Button variant={'destructive'} size={'icon'} onClick={() => signOut()}><LogOut size={20} /></Button>
  )
}
