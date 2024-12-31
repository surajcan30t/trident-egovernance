import React from 'react';
import DailyCollection from '../../components/DailyCollection';
import { RedirectStudentFeeCollectionForm } from '@/app/(app)/(feecollection)/components/RegdNumForm';


const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-2 items-center gap-4">
      <div className="flex flex-row gap-4">
        <DailyCollection />
      </div>
      <RedirectStudentFeeCollectionForm />
    </div>
  );
};

export default page;

// '/account-section/payment/insert-Discount-Data'
//