import React from 'react'
import NsrOptionalFacilityForm from '../../components/NSR/NsrOptionalFacilityForm'
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
}

const studentData = async (): Promise<Student | null> => {
  try {
    const NSR_token = cookies().get("NSR-Authorization");
    const response: AxiosResponse<Student> = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/NSR/get`, {
      headers: {
        'NSR-Authorization': `Bearer ${NSR_token?.value}`,
      },
      params: {
        cache: ''
      }
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
const page = async() => {
  if (!cookies().get('NSR-Authorization')) {
    redirect('/studentportal')
  }
  const data = await studentData();
  return (
    <div className='w-full h-full my-5 p-0 flex flex-col justify-center items-center'>
      <h1 className='text-2xl text-slate-600 font-bold'>Optional Facilities</h1>
      <NsrOptionalFacilityForm {...data}/>   
    </div>
  )
}

export default page