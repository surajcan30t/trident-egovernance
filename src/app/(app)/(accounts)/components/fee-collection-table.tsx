'use client'
import React, { useEffect, useState } from 'react'
import {
  fetchFeesDetailsBySession,
} from '@/app/(app)/(accounts)/server-actions-fee-collection/actions';
import { DataTable } from '@/components/data-table'
import { columns } from './fee-data-table-components/fees-details-columns'
import { useDataTable } from '@/hooks/use-data-table';
import { DataTableToolbar } from '@/components/data-table-toolbar';
import { DataTableFilterField } from '../../../../../types-global/types';
import { DataTableSkeleton } from '@/components/data-table-skeleton';
import { FeesDetailsSchema } from './fee-data-table-components/fees-details-schema';

const FeeCollectionTable = ({ query }: { query: { from: string | null, to: string | null, sessionId: string | null } }) => {
  const { from, to, sessionId } = query
  const [data, setData] = useState<any>([])
  const [totals, setTotals] = useState<any>([])
  useEffect(() => {
    const getFianance = async (from: string | null, to: string | null, sessionId: string | null) => {
      const response = await fetchFeesDetailsBySession(from, to, sessionId)
      setData(response?.collections || [])
      setTotals(response?.total)
      return { collections: response?.collections, total: response?.total }
    }
    getFianance(from, to, sessionId)
  }, [query])

  const payMode = ['CARD', 'CASH', 'CHEQUE', 'DD', 'UPI']
  const year = [1, 2, 3, 4]

  const filterFields: DataTableFilterField<FeesDetailsSchema>[] = [
    {
      id: 'paymentMode',
      label: 'Payment Mode',
      options: payMode.map((payMode) => ({
        value: payMode,
        label: payMode
      }))
    },
    {
      id: 'dueYear',
      label: 'Due Year',
      options: year.map((year) => ({
        value: year,
        label: year.toString()
      }))
    }
  ]

  const { table } = useDataTable({
    data,
    columns,
  });

  return (
    <>
      <div className="flex flex-row-reverse justify-center gap-2 mx-auto w-full">
        <div className="w-1/3">
          <h1 className='bg-gray-200 p-2 text-center text-lg font-semibold'>MR Headwise Collection</h1>
          <table className="w-full border-collapse border mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Particulars</th>
                <th className="border p-2 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {totals && Object.entries(totals).sort().map(([key, value]) => (
                <tr key={key} className="border-b">
                  <td className="border p-2">{key}</td>
                  <td className="border p-2 text-right">{(value as number).toLocaleString('en-IN')}</td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="border p-2">Grand Total</td>
                <td className="border p-2 text-right">
                  {totals && totals ? Object.values(totals).reduce((a: number, b: unknown) => a + (b as number), 0).toLocaleString('en-IN') : 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <React.Suspense
          fallback=
          {<DataTableSkeleton columnCount={5} searchableColumnCount={2} cellWidths={["5rem", "20rem", "12rem", "12rem", "8rem"]} shrinkZero />}>
          <DataTable table={table} >
            <DataTableToolbar fileName={`Fee_Collection_Report_${new Date().toLocaleDateString()}${new Date().toLocaleTimeString()}`} filterFields={filterFields} table={table} />
          </DataTable>
        </React.Suspense>
      </div>
    </>
  )
}
export default FeeCollectionTable