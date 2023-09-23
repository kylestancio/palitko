import React from 'react'
import OrdersContainer from './OrdersContainer'

export default function OrdersPage() {
  return (
    <div>
      <div className="container mt-7">
      <h1 className='text-4xl mb-5'>My Orders</h1>
        <OrdersContainer />
      </div>
    </div>
  )
}
