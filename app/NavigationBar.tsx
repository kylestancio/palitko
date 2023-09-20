import Link from 'next/link'
import React from 'react'
import ThemeButton from './ThemeButton'
import CartButton from './CartButton'
import LogoutButton from './LogoutButton'
import { getServerSession } from 'next-auth'
import LoginButton from './LoginButton'
import SignUpButton from './SignUpButton'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function NavigationBar() {

  const session = await getServerSession(authOptions);
  const user = session ? session.user : null;

  return (
    <div className='w-full h-14 border-b'>
      <div className='h-full container flex py-2'>
        <p className='text-3xl font-medium my-auto'>PALIT<span className='font-black'>KO</span></p>
        <div className='my-auto mx-3 grow'>
          <Link href={'/'} className='hover:underline underline-offset-8 me-3'>Home</Link>
          <Link href={'/listings'} className='hover:underline underline-offset-8 me-3'>Listings</Link>
          <Link href={'/categories'} className='hover:underline underline-offset-8 me-3'>Categories</Link>
        </div>
        <div className='h-full my-auto flex gap-3'>
          { user && 
            <>
              <CartButton />
              <div className='h-full aspect-square bg-gray-300 dark:bg-gray-900 rounded-md'>
                {/* AVATAR PLACEHOLDER */}
              </div>
              <LogoutButton />
            </>
          }
          { !user && 
            <>
              <LoginButton />
              <SignUpButton />
            </>
          }
          <ThemeButton />
        </div>
      </div>
    </div>
  )
}
