import React from 'react'
import NsrAcademicDetailsForm from '../../components/NSR/NsrAcademicDetailsForm'
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    const response: AxiosResponse<Student> = await axios.get(`${process.env.LOCAL_BACKEND_URL}/NSR/get`, {
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
const page = async () => {
  if(!cookies().get('NSR-Authorization')){
    redirect('/studentportal')
  }
  const data = await studentData();
  console.log(data)
  return (
    <div className='w-full h-full my-5 p-0 flex flex-col justify-center items-center'>
      <h1 className='text-2xl text-slate-600 font-bold'>Academic Details</h1>
      <NsrAcademicDetailsForm {...data}/>
    </div>
  )
}

export default page