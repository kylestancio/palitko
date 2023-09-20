import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function ManagerPage() {

  const session = await getServerSession(authOptions);
  const user = session ? session.user : null;

  // if (user && !['admin', 'staff'].includes(user.role)){
  //   return (
  //     <div className='w-screen h-[calc(100vh-63px)] flex'>
  //       <div className='m-auto'>
  //         <Image src={'/pose_kuyashii_man.png'} alt='pose kuyashii man' className={'mx-auto'} width={300} height={300} />
  //         <h1 className="text-5xl font-black m-auto">You are not allowed to access this page.</h1>
  //         <p>{JSON.stringify(user)}</p>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div>
      <div className='container mt-7'>
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
    </div>
  )
}
