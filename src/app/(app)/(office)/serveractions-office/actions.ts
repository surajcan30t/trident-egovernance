'use server';

import { Students } from '../components/TableComponents/schema';

export const studentDataFetcher = async (): Promise<Students[] | undefined> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/office/continuing-students`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // next: {
        //   revalidate: 3600,
        // },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log('response: ');

    return data;
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
