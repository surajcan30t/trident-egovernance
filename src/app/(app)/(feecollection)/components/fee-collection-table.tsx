import React from 'react'
import {
  fetchFeesDetailsBySession,
} from '@/app/(app)/(feecollection)/server-actions-fee-collection/actions';
import { DataTable } from './fee-data-table-components/data-table'
import { columns } from './fee-data-table-components/fees-details-columns'


const getFianance = async() =>{
  const response = await fetchFeesDetailsBySession()

  return response
}

const FeeCollectionTable = async () => {
  const data = await getFianance()
  return (
    <>
      <div className="container mx-auto w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
export default FeeCollectionTable