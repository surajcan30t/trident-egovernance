import React from 'react'
import NewStudentRegestrationForm from '../components/NewStudentRegestrationForm'

// const singleNSR = async () => {
//   const response = await fetch('http://localhost:8080/NSR/getByRollNo',)
// }
const page = async () => {
  return (
    <div className='w-screen h-screen p-0 flex flex-col items-center'>
      <h1 className='text-2xl text-slate-600 font-bold'>New Student Registration Form</h1>
      <NewStudentRegestrationForm />
    </div>
  )
}

export default page