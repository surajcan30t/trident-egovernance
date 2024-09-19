import React from 'react'
import NsrPersonalDetailsForm from '../../components/NSR/NsrPersonalDetailsForm'
import { cookies } from 'next/headers';
import axios, { AxiosResponse } from 'axios';


interface Student {
  jeeApplicationNo: string;
  regdNo: string;
  studentName: string;
  gender: string;
  rank: number;
  phNo: string;
  status: string;
  step: number;
  allotmentId: string
}

// Define the structure of the API response

// Fetch student data asynchronously
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
const page = async () => {
  const data = await studentData();
  return (
    <div className='w-screen h-full my-5 p-0 flex flex-col justify-center items-center'>
      <h1 className='text-2xl text-slate-600 font-bold'>Personal Details</h1>
      <NsrPersonalDetailsForm {...data}/>
    </div>
  )
}

export default page