import React from 'react'
import AddListingButton from './AddListingButton';
import ListingsContainer from './ListingsContainer';

export default async function ManagerListingsPage() {
  return (
    <div>
      <div className='container mt-7'>
        <div className='flex justify-between'>
          <h1 className="text-3xl font-bold mb-5">Manage Listings</h1>
          <AddListingButton />
        </div>
        <ListingsContainer />
      </div>
    </div>
  )
}
