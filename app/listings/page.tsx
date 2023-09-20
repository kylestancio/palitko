import React from 'react'
import ListinigsContainer from './ListingsContainer'

export default function ListingsPage() {
  return (
    <div>
      <div className="container mt-7">
        <h1 className='text-4xl mb-5'>Listings</h1>
        <ListinigsContainer />
      </div>
    </div>
  )
}
