import React from 'react'
import CheckoutContainer from './CheckoutContainer'

export default async function CheckoutPage() {
  return (
    <div>
      <div className='container mt-7'>
        <h1 className="text-3xl font-bold mb-5">Checkout</h1>
        <CheckoutContainer />
      </div>
    </div>
  )
}
