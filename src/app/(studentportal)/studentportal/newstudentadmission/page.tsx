import NewStudentRegistrationData from '../../components/NSR/NewStudentRegistrationData';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

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
      timeout: 500
    },
    );
    if (response.status !== 200) {
      return null;
    }

    return response.data; // Return the dashboard data
  } catch (error) {
    console.error(error);
    return null; // Return null if there's an error
  }
};

// The page component
const Page: React.FC = async () => {
  if (!cookies().get('NSR-Authorization')) {
    redirect('/studentportal')
  }
  const data = await studentData(); // Fetch the dashboard data
  return (
    <div>
      {/* {data&& */}
      <NewStudentRegistrationData {...data} />
      {/* } */}
    </div>
  );
};

export default Page;
