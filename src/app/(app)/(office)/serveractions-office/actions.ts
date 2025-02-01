'use server';

import {
  AdmissionReport,
  SessionwiseReport,
  Students,
  TotalAdmissionsReport,
} from '../components/TableComponents/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export const studentDataFetcher = async (): Promise<Students[] | undefined> => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/continuing-students`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          cache: 'no-cache',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      return data;
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getAdmissionYear = async (formData: string | null) => {
  console.log(formData);
  return 200;
};

export const admissionReportFetcher = async (
  admissionYear: string,
): Promise<AdmissionReport[] | undefined> => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/get-admission-data-year-wise-reports/${admissionYear}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          next: {
            revalidate: 0,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('response: ', data);

      return data;
    } else return;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const totalAdmissionsReportFetcher = async (
  course: string,
  branch: string,
): Promise<TotalAdmissionsReport[] | undefined> => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/get-total-admission-data-reports?${course ? `&course=${course}` : ''}${branch ? `&branch=${branch}` : ''}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          next: {
            revalidate: 0,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('response: ', data);

      return data;
    } else return;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const sessionwiseContinuingReportFetcher = async (
  type: string,
): Promise<SessionwiseReport[] | undefined> => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/get-session-wise-reports?status=${type}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          next: {
            revalidate: 0,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('response: ', data);

      return data;
    } else return;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const sessionwiseAlumniReportFetcher = async (): Promise<
  SessionwiseReport[] | undefined
> => {
  const session = await getServerSession(authOptions);
  try {
    if (session) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/office/get-admission-data-year-wise-reports/alumni`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.user.accessToken}`,
          },
          next: {
            revalidate: 0,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('response: ', data);

      return data;
    } else return;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getAllBranches = async () => {
  try {
    const response = await studentDataFetcher();

    const uniqueBranchCodes = Array.from(
      new Set(response?.map((student: Students) => student.branchCode)),
    );

    const branchCodeHeader = uniqueBranchCodes.map((branchCode) => ({
      value: branchCode,
    }));

    console.log(branchCodeHeader);
    return branchCodeHeader;
  } catch (err) {
    console.log(err);
    return [];
  }
};
