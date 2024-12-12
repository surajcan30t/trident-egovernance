'use server';
import { z } from 'zod';
import axios from 'axios';

let financialSession: string | null = null;

export const getSessionFromUser = async (sessionId: string) => {
  if (!sessionId || typeof sessionId !== 'string') {
    return { success: false, message: 'No such session' };
  }
  financialSession = sessionId;
  return { success: true, message: 'Successfully updated session' };
};

export const fetchFeesDetailsBySession = async () => {
  const today = new Date();
  const defaultSession = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
  const session: string = financialSession || defaultSession;
  console.log('session', session);
  try {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-fee-collection/${session}`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    );
    const response = await request.json();

    return response;
  } catch (error) {
    console.error('Error', error);
    return;
  }
};

type DistinctValues = {
  [key: string]: any[];
};
export const getOptionalValues = async (): Promise<
  DistinctValues | undefined
> => {
  try {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-list-of-headers`,
      {
        method: 'GET',
        cache: 'no-cache',
      },
    );
    const response = await request.json();
    return response;
  } catch (e) {
    console.error(e);
  }
};

//get-fee-collection-history/{regdno} for fee collection details
// {
//   "year1": [
//   {
//     "mrNo": 9,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 10,
//     "collectedFee": 1.23,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 23,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 24,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 25,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 11,
//     "collectedFee": 1.23,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 19,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 20,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 21,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 22,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 3,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 12,
//     "collectedFee": 1.23,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 13,
//     "collectedFee": 1.23,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 14,
//     "collectedFee": 1.23,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 15,
//     "collectedFee": 1.23,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 16,
//     "collectedFee": 5000,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 17,
//     "collectedFee": 54000,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 18,
//     "collectedFee": 30000,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 4,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 5,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 6,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 7,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "2023",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   },
//   {
//     "mrNo": 8,
//     "collectedFee": 107348.34,
//     "paymentMode": "CASH",
//     "ddNo": null,
//     "ddDate": null,
//     "ddBank": null,
//     "paymentDate": "06-11-2024",
//     "dueYear": 1,
//     "sessionId": "2024-2025"
//   }
// ],
//   "year2": null,
//   "year3": null,
//   "year4": null
// }
//getDuesDetails for dues details
//
type FeeCollectionSingleStudentDetails = {
  status: number;
};

export const feeCollectionSingleStudentDetails = async (
  registrationNo: string,
): Promise<FeeCollectionSingleStudentDetails> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-basic-student-details/${registrationNo}`,
    );
    const json = await response.json();
    console.log('response', response.status);
    if (response.status !== 200) {
      return { status: 400 };
    }
    return { status: 200 };
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
};

export const handleDuesFeePayment = async (formData: any) => {
  try {
    const data = formData;
    const regdNo = formData.regdNo;
    if (!data) {
      console.log('No initial data found.');
      return;
    } else {
      console.log('Data in NSRALLOTMENTID function', data);
      try {
      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/fees-payment/${regdNo}`,
        data,
      );
      console.log('Response: \n', request.data);
      return request.status;
      }cat
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleOtherFeesPayment = async (formData: any) => {
  try {
    const data = formData;
    const regdNo = formData.regdNo;
    console.log('Data in OTHERFEESPAYMENT ', data);
    // if (!data) {
    //   console.log('No initial data found.');
    //   return;
    // }
    // console.log('Data in NSRALLOTMENTID function', data);
    // const request = await axios.post(
    //   `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/fees-payment/${regdNo}`,
    //   data,
    // );
    // console.log('Response: \n', request.data);
    // return request.status;
  } catch (error) {
    console.log(error);
  }
};

// const generateFeeCollectionTable = async() => {
//     try{
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/get-fee-collection-history/${regdNo}`)
//     }catch (e) {
//       console.error(e);
//     }
// }
// const generateFeeDuesTable = async(registrationNo: string) => {
//     try{
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/get-fee-collection-history/${registrationNo}`)
//     }catch (e) {
//       console.error(e);
//     }
// }

/*
other fees - dropdown menu of particulars from backend - /accounts-section/get-other-fees
* */
