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
    
    else return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const page = async () => {
  const data = await studentData();
  return (
    <div className='w-full h-full my-5 p-0 flex flex-col justify-center items-center'>
      <h1 className='text-2xl text-slate-600 font-bold'>Personal Details</h1>
      <NsrPersonalDetailsForm {...data}/>
    </div>
  )
}

export default page