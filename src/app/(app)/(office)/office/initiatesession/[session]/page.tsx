import React from 'react'
import SessionwiseStudentTable from '../../../components/session-initiation/SessionwiseStudentTable';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import authValidator from '@/lib/auth/role-validator';
import Unauthorized from '@/components/Unauthorized';

const getData = async (token: string, admissionYear: string, course: string, regdYear: string, studentType: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/office/initiate-session/get-student-for-promotion?admYear=${admissionYear}&course=${course}&regdyear=${regdYear}&studentType=${studentType}`,
      {
        cache: 'no-cache',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    if (response.status !== 200) {
      return { status: response.status, data: null };
    }
    else {
      const data = await response.json()
      console.log(data)
      return { status: response.status, data: data }
    }
  } catch (error) {

  }
}

const page = async ({
  params,
  searchParams
}: {
  params: { session: string };
  searchParams: { [key: string]: string };
}) => {
  const { session, role, token } = await authValidator();
  if (!session || !token) {
    return <Unauthorized />;
  }

  if (role !== 'OFFICE') {
    return <Unauthorized />;
  }
  const studentData = await getData(token, searchParams.admissionYear, searchParams.course, searchParams.regdYear, searchParams.studentType)
  return (
    <div className='w-full flex flex-col gap-5 justify-center items-center'>
      <div className='w-full flex flex-row gap-2 p-2 bg-slate-200 rounded-lg font-bold'>
        <Link href={`/office/initiatesession`} className='w-1/6 p-1 rounded-lg text-center flex justify-center items-center bg-white hover:scale-105'>
          <ArrowLeft />
        </Link>
        <div className='w-full p-1 rounded-lg text-center'>
          {params.session}
        </div>
        <div className='w-full p-1 rounded-lg text-center'>
          {searchParams.course}
        </div>
        <div className='w-full p-1 rounded-lg text-center'>
          {searchParams.admissionYear}
        </div>
        <div className='w-full p-1 rounded-lg text-center'>
          {searchParams.regdYear}
        </div>
        <div className='w-full p-1 rounded-lg text-center'>
          {searchParams.studentType}
        </div>
        <div className='w-full p-1 rounded-lg text-center'>
          {searchParams.startDate}
        </div>
        <div className='w-full p-1 rounded-lg text-center'>
          {searchParams.endDate ? searchParams.endDate : 'N/A'}
        </div>
      </div>
      {studentData?.status === 200 ? studentData.data.length > 0 ? (<SessionwiseStudentTable studentData={studentData.data} />) : (<div className='w-full gap-2 p-2 bg-slate-200 rounded-lg font-bold text-center'>No data found</div>) : (
        <div className='w-full p-2 bg-slate-200 rounded-lg font-bold text-center'>Something went wrong</div>
      )}
    </div>
  )
}

export default page