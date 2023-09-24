import React from 'react'
import PaymentsContainer from './PaymentsContainer'

export default function ManagerPaymentsPage() {
  return (
    <div>
      <div className='container mt-7'>
        <h1 className="text-3xl font-bold mb-5">Manage Payments</h1>
        <PaymentsContainer />
      </div>
    </div>
  )
}
