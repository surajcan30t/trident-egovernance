import React from 'react'
import NsrOptionalFacilityForm from '../../components/NSR/NsrOptionalFacilityForm'

const page = () => {
  return (
    <div className='w-screen h-full my-5 p-0 flex flex-col justify-center items-center'>
      <h1 className='text-2xl text-slate-600 font-bold'>Optional Facilities</h1>
      <NsrOptionalFacilityForm />   
    </div>
  )
}

export default page