'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function LoginButton() {
  return (
    <Button onClick={()=>{signIn()}}>Login</Button>
  )
}
