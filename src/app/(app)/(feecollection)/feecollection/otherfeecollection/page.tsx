import React from 'react'
import { RedirectOtherFeeCollectionForm } from '@/app/(app)/(feecollection)/components/RegdNumForm';
import OtherFeeCollectionDashboardSingleStudent
  from '@/app/(app)/(feecollection)/components/other-fee-collection-dashboard-single-student';

const page = () => {
  return (
    <>
      <div className='w-full h-full flex flex-col p-2 items-center gap-4'>
        <RedirectOtherFeeCollectionForm />
        <OtherFeeCollectionDashboardSingleStudent />
      </div>
    </>
  )
}
export default page