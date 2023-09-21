import React from 'react'
import CartContainer from './CartContainer'

export default function CartPage() {
  return (
    <div>
      <div className="container mt-7">
        <h1 className='text-3xl font-bold'>Cart</h1>
        <CartContainer />
      </div>
    </div>
  )
}
