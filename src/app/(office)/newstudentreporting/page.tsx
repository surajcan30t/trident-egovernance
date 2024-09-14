import React from 'react'
import NewStudentRegestrationForm1 from '../components/NewStudentRegestrationForm1'

const singleNSR = async () => {
  const response = await fetch('http://localhost:8080/NSR/getByRollNo', )
}
const page = async () => {
  return (
    <div className='w-screen h-full my-5 p-0 flex flex-col justify-center items-center'>
        <NewStudentRegestrationForm1 />
    </div>
  )
}

export default page