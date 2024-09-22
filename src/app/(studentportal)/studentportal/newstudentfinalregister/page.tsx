import React from 'react'
import NewStudentFinalView from '../../components/NSR/NewStudentFinalView'
import FinalSubmitButton from '../../components/NSR/FinalSubmitButton'

const page = () => {
  return (
    <div className='flex flex-col justify-items-center gap-10 pb-10'>
        <NewStudentFinalView />
        <FinalSubmitButton />
    </div>
  )
}

export default page