import StudentAttendance from '@/components/StudentAttendance'
import User from '@/components/User'
import React from 'react'
const page = async () => {
  // if (!await usRole()) {
  //   return (
  //     <div>
  //     you are not allowed
  //   </div>
  //   )
  // }
  return(
    <div className='m-0 p-2 flex flex-row gap-4 justify-end'>
        <div>
          <StudentAttendance />
        </div>
        <div className=''>
          <User />
        </div>
      </div>
    
  )
}

export default page