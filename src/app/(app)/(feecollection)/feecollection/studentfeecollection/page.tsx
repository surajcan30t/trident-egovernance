import React from 'react'
import { RegdNumForm } from '@/app/(app)/(feecollection)/components/RegdNumForm';
import DailyCollection from '@/app/(app)/(feecollection)/components/DailyCollection';
import FeeCollectionDashboardSingleStudent
  from '@/app/(app)/(feecollection)/components/fee-collection-dashboard-single-student';

const page = () => {
  return (
    <>
      <div className='w-full h-full flex flex-col p-2 items-center gap-4'>
        <RegdNumForm />
        <FeeCollectionDashboardSingleStudent />
      </div>
    </>
  )
}
export default page