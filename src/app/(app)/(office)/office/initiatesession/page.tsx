import React from 'react'
import OngoingSessions from '../../components/session-initiation/OngoingSessions'
import authValidator from '@/lib/auth/role-validator'
import Unauthorized from '@/components/Unauthorized'



const getData = async (token: string) => {
  // /office/initiate-session/get-complete-ongoing-sessions
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/office/initiate-session/get-complete-ongoing-sessions`,
      {
        cache: 'no-cache',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
    if (response.status !== 200) {
      console.log(response.status)
      return;
    }
    else {
      const data = await response.json()
      return data
    }
  } catch (error) {

  }
}

const page = async () => {
  const { session, role, token } = await authValidator();
  if (!session || !token) {
    return <Unauthorized />;
  }

  if (role !== 'OFFICE') {
    return <Unauthorized />;
  }
  const data = await getData(token)
  return (
    <>
      <div className='w-full flex flex-col gap-5 justify-center items-center'>
        <h1 className='text-2xl font-bold'>Ongoing Sessions</h1>
        <div className='w-full flex flex-col gap-2'>
          <div className='w-full flex flex-row gap-2 p-2 bg-slate-50 border-2 rounded-lg font-bold top-14 sticky'>
            <div className='w-1/2 p-1 rounded-lg text-center'>
              <u>Session</u>
            </div>
            <div className='w-1/2 p-1 rounded-lg text-center'>
              <u>Course</u>
            </div>
            <div className='w-1/2 p-1 rounded-lg text-center'>
              <u>Admission Year</u>
            </div>
            <div className='w-1/2 p-1 rounded-lg text-center'>
              <u>Year</u>
            </div>
            <div className='w-1/2 p-1 rounded-lg text-center'>
              <u>Student Type</u>
            </div>
            <div className='w-1/2 p-1 rounded-lg text-center'>
              <u>Start Date</u>
            </div>
            <div className='w-1/2 p-1 rounded-lg text-center'>
              <u>End Date</u>
            </div>
            <div className='w-full p-1 rounded-lg text-center'>
              &nbsp;
            </div>
          </div>
          {data && data.map((session: any, index: number) => (
            <div key={index} className='w-full flex flex-row justify-between items-center bg-lime-100 border-dotted border-2 border-slate-500 p-1 rounded-lg'>
              <OngoingSessions data={session} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default page