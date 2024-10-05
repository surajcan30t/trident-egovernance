import React from 'react'
import FeeDataGrid from '../components/FeeDataGrid'
import FeeSessionNav from '../components/FeeSessionNav'
import { RegdNumForm } from '../components/RegdNumForm'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <RegdNumForm />
      <FeeSessionNav />
      <FeeDataGrid />
    </div>
  )
}

export default page