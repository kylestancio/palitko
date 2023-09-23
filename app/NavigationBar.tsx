import Link from 'next/link'
import React from 'react'
import ThemeButton from './ThemeButton'
import CartButton from './CartButton'
import LogoutButton from './LogoutButton'
import { getServerSession } from 'next-auth'
import LoginButton from './LoginButton'
import SignUpButton from './SignUpButton'
import { authOptions } from './api/auth/[...nextauth]/route'
import SideBar from './SideBar'
import OrdersButton from './OrdersButton'

export default async function NavigationBar() {

  const session = await getServerSession(authOptions);
  const user = session ? session.user : null;

  return (
    <div className='w-full h-14 border-b'>
      <div className='h-full container flex py-2'>
        <SideBar />
        <p className='text-3xl font-medium my-auto hidden lg:block'>PALIT<span className='font-black'>KO</span></p>
        <p className='text-3xl font-medium my-auto block lg:hidden grow lg:grow-0'>P</p>
        <div className='my-auto mx-3 grow hidden lg:block'>
          <Link href={'/'} className='hover:underline underline-offset-8 me-3'>Home</Link>
          <Link href={'/listings'} className='hover:underline underline-offset-8 me-3'>Listings</Link>
          <Link href={'/categories'} className='hover:underline underline-offset-8 me-3'>Categories</Link>
        </div>
        <div className='h-full my-auto flex gap-3'>
          { user && 
            <>
              <CartButton />
              <OrdersButton />
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
