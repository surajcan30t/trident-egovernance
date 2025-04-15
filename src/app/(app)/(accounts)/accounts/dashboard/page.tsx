import React from 'react';
import DailyCollection from '../../components/DailyCollection';
import { RedirectStudentFeeCollectionForm } from '@/app/(app)/(accounts)/components/RegdNumForm';


const page = () => {
  return (
    <div className="w-full h-full flex flex-col p-2 items-center gap-4">
      <div className="flex flex-row gap-4">
        <DailyCollection />
      </div>
      <div className='w-3/4 flex flex-col justify-center items-center '>
        <h1 className="text-xl font-semibold text-center">Collect fee of a student</h1>
        <RedirectStudentFeeCollectionForm />
      </div>
    </div>
  );
};

export default page;

/** 
  /accouts-section/get-excess-fee-student-data?regdNo=''
  /accouts-section/refund-excess-fee
  post json body
  {
    "voucherNo": "1234567890",
    "regdNo": "1234567890",
    "refundAmount": 1000,
    "refundMode": ['CASH', 'UPI', 'CHEQUE'],
    "chqNo": "1234567890",
    "chqDate": "01-01-2025",
  }
*/