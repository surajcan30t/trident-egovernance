import React from 'react'
import NewStudentFinalView from '../../components/NSR/NewStudentFinalView'
import FinalSubmitButton from '../../components/NSR/FinalSubmitButton'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const page = () => {
  if (!cookies().get('NSR-Authorization')) {
    redirect('/studentportal')
  }
  return (
    <div className='flex flex-col justify-items-center gap-10 pb-10'>
        <NewStudentFinalView />
        <FinalSubmitButton />
    </div>
  )
}

export default page