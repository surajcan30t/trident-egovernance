import React from 'react'
import { RedirectStudentFeeCollectionForm } from '@/app/(app)/(feecollection)/components/RegdNumForm';
import FeeCollectionDashboardSingleStudent from '@/app/(app)/(feecollection)/components/fee-collection-dashboard-single-student';

interface Props {
  searchParams: {
    registrationNo: string;
  };
}

const page = (props: Props) => {
  const { registrationNo } = props.searchParams;
  return (
    <>
      <div className='w-full h-full flex flex-col p-2 items-center gap-4'>
        <RedirectStudentFeeCollectionForm />
        <FeeCollectionDashboardSingleStudent />
      </div>
    </>
  )
}
export default page