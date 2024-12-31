'use server';
import { z } from 'zod';
import axios from 'axios';
import { description } from '@/app/(app)/(student)/components/StudentAttendance';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

let financialSession: string | null = null;

export const getSessionFromUser = async (sessionId: string) => {
  if (!sessionId || typeof sessionId !== 'string') {
    return { success: false, message: 'No such session' };
  }
  financialSession = sessionId;
  return { success: true, message: 'Successfully updated session' };
};

export const fetchFeesDetailsBySession = async () => {
  const session = await getServerSession(authOptions);
  const today = new Date();
  const defaultSession = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
  const sessionId: string = financialSession || defaultSession;
  console.log('session', sessionId);
  try {
    if (session) {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-fee-collection/${sessionId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          cache: 'no-cache',
        },
      );
      const response = await request.json();
      console.log('response', response);
      return response;
    } else return;
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
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-list-of-headers`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          cache: 'no-cache',
        },
      );
      const response = await request.json();
      return response;
    } else return;
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
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-basic-student-details/${registrationNo}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );
      const json = await response.json();
      console.log('response', response.status);
      if (response.status !== 200) {
        return { status: 400 };
      }
      return { status: 200 };
    } else {
      return { status: 401 };
    }
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
};

export const handleDuesFeePayment = async (formData: any) => {
  const session = await getServerSession(authOptions);
  try {
    const data = formData;
    const regdNo = formData.regdNo;
    if (session) {
      if (!data) {
        console.log('No initial data found.');
        return;
      } else {
        console.log('Data in NSRALLOTMENTID function', data);
        try {
          const request = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/fees-payment/${regdNo}`,
            data,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            },
          );
          console.log('Response: \n', request.data);
          return request.status;
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else {
      return 401;
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleOtherFeesPayment = async (formData: any) => {
  const session = await getServerSession(authOptions);
  try {
    const body = formData;
    const regdNo = formData.regdNo;
    const paymentMode = formData.paymentMode;
    const totalFee = body.dynamicFields.reduce(
      (acc: number, fee: any) => acc + parseFloat(fee.amount),
      0,
    );

    const dynamicFields = body.dynamicFields.map((fee: any, index: number) => ({
      slNo: index + 1,
      particulars: fee.description,
      amount: parseFloat(fee.amount),
    }));

    const data = {
      feeCollection: {
        collectedFee: totalFee,
        paymentMode: paymentMode,
      },
      otherMrDetails: dynamicFields,
    };

    console.log(data);
    if (session) {
      if (!data) {
        console.log('No initial data found.');
        return 400;
      } else {
        console.log('Data in NSRALLOTMENTID function', data);
        const request = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/other-fees-payment/${regdNo}`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          },
        );
        console.log('Response: \n', request.data);
        return request.status;
      }
    } else return 401;
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateFeePayment = async (formData: any) => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const data = formData;
      if (!data) {
        console.log('No initial data found.');
        return;
      } else {
        console.log('Data in NSRALLOTMENTID function', data);
        try {
          const request = await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/update-fee-collection`,
            data,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            },
          );
          console.log('Response: \n', request.data);
          return request.status;
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else return 401;
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateOtherFeePayment = async (formData: any) => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const body = formData;
      const paymentMode = formData.paymentMode;
      const totalFee = body.dynamicFields.reduce(
        (acc: number, fee: any) => acc + parseFloat(fee.amount),
        0,
      );

      const dynamicFields = body.dynamicFields.map(
        (fee: any, index: number) => ({
          slNo: index + 1,
          particulars: fee.description,
          amount: parseFloat(fee.amount),
        }),
      );

      const data = {
        mrNo: formData.mrNo,
        collectedFee: totalFee,
        paymentMode: paymentMode,
        mrDetails: dynamicFields,
      };
      if (!data) {
        console.log('No initial data found.');
        return;
      } else {
        console.log('Data in handleUpdateOtherFeePayment function', data);
        try {
          const request = await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/update-fee-collection`,
            data,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            },
          );
          console.log('Response: \n', request.data);
          return request.status;
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else return 401;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMrDetails = async (mrNo: string) => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      if (!mrNo) {
        console.log('No Mr number found.');
        return;
      } else {
        console.log('Delete request for MR No :- ', mrNo);
        try {
          const request = await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/delete-fee-collection/${mrNo}`,
            {
              headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            },
          );
          console.log('Response: \n', request.data);
          return request.status;
        } catch (e) {
          console.error(e);
          return;
        }
      }
    } else return 401;
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

// /update-fee-collection
