
import BulkSubmit from '../components/NSR/BulkSubmit'
import EnterApplicationNumber from '../components/NSR/EnterApplicationNumber'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-full my-5 p-0 flex flex-col justify-center items-center'>
      <EnterApplicationNumber />
      {/* <BulkSubmit /> */}
    </div>
  )
}

export default page