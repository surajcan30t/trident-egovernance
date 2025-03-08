'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation';
import { parseCourse } from '@/lib/course-parser';


const OngoingSessions = ({
  data,
  type
}: {
  data: any,
  type: string
  }) => {
  const router = useRouter()

  function onButtonClick(data: any){
    if(type === 'promoted'){
      router.push(`/office/initiatesession/${data.prevSessionId}?course=${parseCourse(data.course)}&admissionYear=${data.admissionYear}&regdYear=${data.regdYear}&startDate=${data.startDate}&studentType=${data.studentType}&sessionId=${data.sessionId}`)
    }else{
      router.push(`/office/demotedstudents/${data.prevSessionId}?course=${parseCourse(data.course)}&admissionYear=${data.admissionYear}&regdYear=${data.regdYear}&startDate=${data.startDate}&studentType=${data.studentType}&sessionId=${data.sessionId}`)
    }
  }

  return (
    <>
      <div className='w-full flex flex-col gap-2'>
        <div className='w-full flex flex-row gap-2 p-2 bg-slate-200 rounded-lg font-bold'>
          <div className='w-1/6 p-1 rounded-lg text-center'>
            {data.sessionId}
          </div>
          <div className='w-1/6 p-1 rounded-lg text-center'>
            {data.course}
          </div>
          <div className='w-1/6 p-1 rounded-lg text-center'>
            {data.admissionYear}
          </div>
          <div className='w-1/6 p-1 rounded-lg text-center'>
            {data.regdYear}
          </div>
          <div className='w-1/6 p-1 rounded-lg text-center'>
            {data.studentType}
          </div>
          <div className='w-1/6 p-1 rounded-lg text-center'>
            {data.startDate}
          </div>
          <div className='w-1/6 p-1 rounded-lg text-center'>
            {data.endDate ? data.endDate : 'N/A'}
          </div>
          <Button onClick={()=>onButtonClick(data)} className='w-1/3' size='default' variant='modify'>Promote</Button>
        </div>
      </div>
    </>
  )
}

export default OngoingSessions