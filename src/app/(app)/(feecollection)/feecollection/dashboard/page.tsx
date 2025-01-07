import React from 'react';
import DailyCollection from '../../components/DailyCollection';
import { RedirectStudentFeeCollectionForm } from '@/app/(app)/(feecollection)/components/RegdNumForm';


const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-2 items-center gap-4">
      <div className="flex flex-row gap-4">
        <DailyCollection />
      </div>
      <div className='w-3/4 flex flex-col justify-start items-start'>
        <h1 className="text-xl font-semibold text-left">Want to collect fee for a student?</h1>
        <RedirectStudentFeeCollectionForm />
      </div>
    </div>
  );
};

export default page;

// '/account-section/payment/insert-Discount-Data'
//