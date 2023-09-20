import Image from 'next/image'
import React from 'react'

export default function ManagerPage() {

  // PLACEHOLDER
  const user = {
    id: 1,
    name: "Admin 1",
    username: "admin1",
    role: "admin",
  }

  if ( !['admin', 'staff'].includes(user?.role)){
    return (
      <div className='w-screen h-[calc(100vh-63px)] flex'>
        <div className='m-auto'>
          <Image src={'/pose_kuyashii_man.png'} alt='pose kuyashii man' className={'mx-auto'} width={300} height={300} />
          <h1 className="text-5xl font-black m-auto">You are not allowed to access this page.</h1>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='container mt-7'>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
    </div>
  )
}
