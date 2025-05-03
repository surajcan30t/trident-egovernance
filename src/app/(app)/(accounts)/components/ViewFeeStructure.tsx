'use client';
import React, { useEffect, useState } from 'react';
import BatchGenerationForm from './BatchGenerationForm';
import FeeStructure from './FeeStructure';

const ViewFeeStructure = ({ token }: { token: string }) => {
  const [feeStructure, setFeeStructure] = useState<any>();
  const [serverStatus, setServerStatus] = useState<number>(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleBatchGeneration = () => {
    window.localStorage.removeItem('step');
    setRefreshTrigger(refreshTrigger + 1);
  };
  useEffect(() => {
    const getFeeStructure = async () => {
      const data = window.localStorage.getItem('batchData');
      try {
        if (!data) return;
        const parsedData = JSON.parse(data);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-fee-structure?course=${parsedData.course}&admYear=${parsedData.admYear}&studentType=${parsedData.studentType}&branchCode=${parsedData.branchCode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const feeData = await response.json();
        setFeeStructure(feeData);
        setServerStatus(response.status);
      } catch (error) {
        setServerStatus(500);
      }
    };
    getFeeStructure();
  }, [refreshTrigger]);
  // const feeData = {
  //   '1': {
  //     NTFW: [
  //       {
  //         feeId: 9959,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'COLLEGE FEES - SEM1',
  //         amount: 625000,
  //         comments: 'TEST',
  //         tfwType: 'NTFW',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 9960,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'COLLEGE FEES - SEM2',
  //         amount: 625000,
  //         comments: 'TEST',
  //         tfwType: 'NTFW',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //     ],
  //     ALL: [
  //       {
  //         feeId: 9954,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'HOSTEL FEE - IN-CAMPUS - SEM1',
  //         amount: 44500,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 9955,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'HOSTEL FEE - IN-CAMPUS - SEM2',
  //         amount: 44500,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 9952,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'PRE PLACEMENT TRAINING FEE - SEM2',
  //         amount: 1500,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 9956,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'BPUT REGISTRATION FEE - SEM2',
  //         amount: 1500,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 9953,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'PRE PLACEMENT TRAINING FEE - SEM1',
  //         amount: 1500,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 9957,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'TRANSPORT FEE - Y1',
  //         amount: 20000,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 9962,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'BPUT REGISTRATION FEE - SEM1',
  //         amount: 5000,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 9961,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'BLAZER, UNIFORM FEE',
  //         amount: 5000,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //     ],
  //     TFW: [
  //       {
  //         feeId: 9951,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'COLLEGE FEES - SEM1',
  //         amount: 22500,
  //         comments: 'TEST',
  //         tfwType: 'TFW',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 9958,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 1,
  //         description: 'COLLEGE FEES - SEM2',
  //         amount: 22500,
  //         comments: 'TEST',
  //         tfwType: 'TFW',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //     ],
  //   },
  //   '2': {
  //     NTFW: [
  //       {
  //         feeId: 10001,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 2,
  //         description: 'COLLEGE FEES - SEM3',
  //         amount: 650000,
  //         comments: 'TEST',
  //         tfwType: 'NTFW',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 10002,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 2,
  //         description: 'COLLEGE FEES - SEM4',
  //         amount: 650000,
  //         comments: 'TEST',
  //         tfwType: 'NTFW',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //     ],
  //     ALL: [
  //       {
  //         feeId: 10003,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 2,
  //         description: 'HOSTEL FEE - IN-CAMPUS - SEM3',
  //         amount: 45000,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 10004,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 2,
  //         description: 'HOSTEL FEE - IN-CAMPUS - SEM4',
  //         amount: 45000,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 10005,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 2,
  //         description: 'TRANSPORT FEE - Y2',
  //         amount: 22000,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //     ],
  //     TFW: [
  //       {
  //         feeId: 10006,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 2,
  //         description: 'COLLEGE FEES - SEM3',
  //         amount: 25000,
  //         comments: 'TEST',
  //         tfwType: 'TFW',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 10007,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 2,
  //         description: 'COLLEGE FEES - SEM4',
  //         amount: 25000,
  //         comments: 'TEST',
  //         tfwType: 'TFW',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //     ],
  //   },
  //   '3': {
  //     NTFW: [
  //       {
  //         feeId: 10008,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 3,
  //         description: 'COLLEGE FEES - SEM5',
  //         amount: 675000,
  //         comments: 'TEST',
  //         tfwType: 'NTFW',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 10009,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 3,
  //         description: 'COLLEGE FEES - SEM6',
  //         amount: 675000,
  //         comments: 'TEST',
  //         tfwType: 'NTFW',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //     ],
  //     ALL: [
  //       {
  //         feeId: 10010,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 3,
  //         description: 'HOSTEL FEE - IN-CAMPUS - SEM5',
  //         amount: 46000,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 10011,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 3,
  //         description: 'HOSTEL FEE - IN-CAMPUS - SEM6',
  //         amount: 46000,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //       {
  //         feeId: 10012,
  //         batchElements: {
  //           admYear: 2025,
  //           course: 'BTECH',
  //           branchCode: 'CSE',
  //           studentType: 'REGULAR',
  //         },
  //         regdYear: 3,
  //         description: 'TRANSPORT FEE - Y3',
  //         amount: 24000,
  //         comments: 'TEST',
  //         tfwType: 'ALL',
  //         tatFees: 0,
  //         tactFfees: null,
  //         payType: 'YEARLY',
  //       },
  //     ],
  //     // Note: TFW is intentionally removed from year 3
  //   },
  // };

  return (
    <div>
      <BatchGenerationForm batchGenerationSubmit={handleBatchGeneration} />
      <div className="mt-5">
        {serverStatus === 200 && feeStructure && (
          <FeeStructure feeData={feeStructure} />
        )}
        {serverStatus !== 200 && (
          <div className='flex flex-col justify-center items-center text-red-500'>
            <h1 className='text-lg'>Error fetching data!</h1>
            <h1>Please try after some time or contact the administrator</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewFeeStructure;
