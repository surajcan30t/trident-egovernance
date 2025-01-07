import React from 'react'
import {
  fetchFeesDetailsBySession,
} from '@/app/(app)/(feecollection)/server-actions-fee-collection/actions';
import { DataTable } from './fee-data-table-components/data-table'
import { columns } from './fee-data-table-components/fees-details-columns'


const getFianance = async (from: string | null, to: string | null, sessionId: string | null) => {
  const response = await fetchFeesDetailsBySession(from, to, sessionId)
  console.log(response)
  return { collections: response?.collections, total: response?.total }
}

const FeeCollectionTable = async ({ query }: { query: { from: string | null, to: string | null, sessionId: string | null } }) => {
  const { from, to, sessionId } = query
  const data = await getFianance(from, to, sessionId)
  console.log('collection', data.collections)
  return (
    <>
      <div className="flex flex-row-reverse justify-center gap-2 mx-auto w-full">
        <div className="w-1/3">
          <table className="w-full border-collapse border mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Particulars</th>
                <th className="border p-2 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.total).sort().map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="border p-2">{key}</td>
                  <td className="border p-2 text-right">{(value as number).toLocaleString('en-IN')}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="border p-2">Grand Total</td>
                <td className="border p-2 text-right">
                  {Object.values(data.total).reduce((a: number, b: unknown) => a + (b as number), 0).toLocaleString('en-IN')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <DataTable columns={columns} data={data.collections} />
      </div>
    </>
  )
}
export default FeeCollectionTable