'use server';
import { z } from 'zod';
import axios from 'axios';
import { description } from '@/app/(app)/(student)/components/StudentAttendance';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import getGraphToken from '@/lib/auth/getGraphToken';

let financialSession: string | null = null;

export const getSessionFromUser = async (sessionId: string) => {
  if (!sessionId || typeof sessionId !== 'string') {
    return { success: false, message: 'No such session' };
  }
  financialSession = sessionId;
  return { success: true, message: 'Successfully updated session' };
};

export const fetchFeesDetailsBySession = async (
  from: string | null,
  to: string | null,
  sessionId: string | null,
) => {
  const session = await getServerSession(authOptions);
  // console.log('from:-', from);
  // console.log('to:-', to);
  // console.log('session:-', sessionId);
  try {
    if (session) {
      // console.log('fetching data');
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-collection-report`,
        {
          method: 'POST',
          body: JSON.stringify({
            fromDate: from,
            toDate: to,
            session: sessionId,
          }),
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            'Content-Type': 'application/json',
          },
          cache: 'no-cache',
        },
      );
      const response = await request.json();
      const total = response.desciptionSum;
      const collections = response.collectionReport;
      return { total, collections };
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
      // console.log('registrationNo', registrationNo);

      if (response.status !== 200 || !(await response.json())) {
        // console.log('entered else block');
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
  const data = formData;
  const regdNo = formData.regdNo;
  if (session !== null && session !== undefined && session.user.accessToken) {
    const graphToken = await getGraphToken(session.user.accessToken);
    if (graphToken.graphToken === undefined) {
      console.log('Unable to get graphtoken for USER::', session.user.name);
      return 401;
    }
    if (!data) {
      console.log('No initial data found.');
      return;
    } else {
      try {
        const responseGetNewMr = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/get-new-mrNo`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          },
        );
        if (responseGetNewMr.status === 200) {
          const newMr = responseGetNewMr.data;
          formData.mrNo = newMr;
          // console.log(formData);
          const request = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/fees-payment/${regdNo}`,
            formData,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.accessToken}`,
                oboToken: `Bearer ${graphToken.graphToken}`,
              },
            },
          );
          return request.status;
        }
      } catch (e) {
        console.error(e);
        return 500;
      }
    }
  } else {
    return 401;
  }
};

export const handleExcessFeeRefund = async (formData: any) => {
  interface Error {
    response: {
      status: number;
    };
  }
  const session = await getServerSession(authOptions);
  try {
    const data = formData;
    // const regdNo = formData.regdNo;
    if (session) {
      if (!data) {
        console.log('No initial data found.');
        return;
      } else {
        try {
          const request = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/refund-excess-fee`,
            data,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            },
          );
          return request.status;
        } catch (e: any) {
          return e.response.status;
        }
      }
    } else {
      return 401;
    }
  } catch (error: any) {
    console.log(error);
    return 500;
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
        // console.log('Data in NSRALLOTMENTID function', data);
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
        // console.log('Response: \n', request.data);
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
        // console.log('Data in NSRALLOTMENTID function', data);
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
          // console.log('Response: \n', request.data);
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
        // console.log('Data in handleUpdateOtherFeePayment function', data);
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
          // console.log('Response: \n', request.data);
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

export const handleDiscount = async (formData: any) => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const data = formData;
      // console.log('Data in handleDiscount function', data);
      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/insert-Discount-Data`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );
      // console.log('Response: \n', request.data);
      if (request.status === 200) {
        return 200;
      } else {
        return 400;
      }
    } else return 401;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const handleAdjustment = async (formData: any) => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const data = formData;
      // console.log('Data in handleDiscount function', data);
      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/apply-Adjustment`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );
      // console.log('Response: \n', request.data);
      if (request.status === 200) {
        return 200;
      } else {
        return 400;
      }
    } else return 401;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const deleteMrDetails = async (mrNo: string) => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      if (!mrNo) {
        // console.log('No Mr number found.');
        return;
      } else {
        // console.log('Delete request for MR No :- ', mrNo);
        try {
          const request = await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/payment/delete-fee-collection/${mrNo}`,
            {
              headers: {
                Authorization: `Bearer ${session.user.accessToken}`,
              },
            },
          );
          // console.log('Response: \n', request.data);
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

export const getStudentDuesDetails = async () => {
  const session = await getServerSession(authOptions);
  const course = 'BTECH';
  const branch = 'CSE';
  let regdYear;
  if (session) {
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-due-status-report?${regdYear && `regdYear=${regdYear}`}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );
      const response = await request.json();
      // console.log('response', response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};

export const handleFeeStructureGeneration = async (
  batchData: any,
  feeStructureData: any,
) => {
  const session = await getServerSession(authOptions);
  if (session) {
    const parsedBatchData = JSON.parse(batchData);
    const feeList = feeStructureData.feeTypeForm.flatMap((item: any) =>
      item.feeStructure.map((fee: any) => ({
        regdYear: parseInt(item.regdYear),
        description: fee.description,
        amount: parseInt(fee.amount),
        comments: fee.comments,
        tfwType: fee.tfwType,
        tatFees: parseInt(fee.tatFees),
        tactFees: parseInt(fee.tactFees),
        payType: fee.payType,
      })),
    );
    const data = {
      batchElements: {
        admYear: parseInt(parsedBatchData.admYear),
        course: parsedBatchData.course,
        branchCode: parsedBatchData.branchCode,
        studentType: parsedBatchData.studentType,
      },
      feesList: feeList,
    };
    try {
      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/create-fees`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );
      const status = request.status;
      const message = request.data.message;
      // console.log('data', JSON.stringify(data, null, 2));
      return { status, message };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }
  return {
    status: 401,
    message: 'Your session has expired. Please login again.',
  };
};

//accounts-section/create-fee-type
export const handleCreateNewFeeType = async (feeTypeData: any) => {
  const session = await getServerSession(authOptions);
  // console.log('process started');
  if (session) {
    // console.log('Session available');

    const formattedFeeTypeData = feeTypeData.newFees.map(
      (feeTypeData: any) => ({
        description: feeTypeData.description,
        type: feeTypeData.type,
        feeGroup: feeTypeData.feeGroup,
        mrHead: feeTypeData.mrHead,
        partOf: feeTypeData.partOf,
        semester: parseInt(feeTypeData.semester),
        deductionOrder: parseInt(feeTypeData.deductionOrder),
      }),
    );
    try {
      // console.log('inside try block');
      const request = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/create-fee-types`,
        formattedFeeTypeData,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          timeout: 3000,
        },
      );
      const status = request.status;
      const message = request.data.message;
      // console.log('data', JSON.stringify(formattedFeeTypeData, null, 2));
      return { status, message };
    } catch (error) {
      console.log(error);
      return { status: 500, message: 'Internal Server Error' };
    }
  }
  return {
    status: 401,
    message: 'Your session has expired. Please login again.',
  };
};
