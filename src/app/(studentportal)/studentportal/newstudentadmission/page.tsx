// 'use client'
import NewStudentRegistrationData from '@/app/(studentportal)/components/NSR/NewStudentRegistrationData';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import React from 'react';

// Define the structure of the student data returned by the API
interface Student {
  jeeApplicationNo: string;
  regdNo: string;
  studentName: string;
  gender: string;
  rank: number;
  phNo: string;
  status: string;
  step: number;
}

const studentData = async (): Promise<Student | null> => {
  try {
    const NSR_token = cookies().get("NSR-Authorization");
    const response: AxiosResponse<Student> = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/NSR/get`, {
      headers: {
        'NSR-Authorization': `Bearer ${NSR_token?.value}`,
      },
    },
  );
    if (response.status !== 200) {
      return null;
    }
    
    return response.data; // Return the student data
  } catch (error) {
    console.error(error);
    return null; // Return null if there's an error
  }
};

// The page component
const Page: React.FC = async () => {
  const data = await studentData(); // Fetch the student data
  return (
    <div>
      {/* {data&& */}
        <NewStudentRegistrationData {...data} />
      {/* } */}
    </div>
  );
};

export default Page;
