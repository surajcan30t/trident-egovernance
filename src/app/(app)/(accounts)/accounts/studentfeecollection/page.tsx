import React from 'react';
import { RedirectStudentFeeCollectionForm } from '@/app/(app)/(accounts)/components/RegdNumForm';
import FeeCollectionDashboardSingleStudent from '@/app/(app)/(accounts)/components/fee-collection-dashboard-single-student';

interface Props {
  searchParams: {
    registrationNo: string;
  };
}

const page = (props: Props) => {
  const { registrationNo } = props.searchParams;
  return (
    <>
      <div className="w-full h-full flex flex-col p-2 items-center gap-4">
        <h1 className="text-2xl font-bold text-start">Fees Collection</h1>
        {/* <div className='border w'> */}
          <RedirectStudentFeeCollectionForm />
        {/* </div> */}
        <FeeCollectionDashboardSingleStudent />
      </div>
    </>
  );
};
export default page;
