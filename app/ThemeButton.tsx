'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, SunMoon } from 'lucide-react';

export default function ThemeButton() {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false)
  const handleToggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  useEffect(()=>{
    setMounted(true)
  },[])

  if (!mounted) return (
    <SunMoon className='my-auto' />
  )

  return (
    <button type='button' onClick={handleToggleTheme}>
      { resolvedTheme === 'dark' ? <Sun /> : <Moon /> }
    </button>
  )
}
