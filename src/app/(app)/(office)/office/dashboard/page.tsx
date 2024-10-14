import React from 'react'
import TotalStudent from '../../components/TotalStudent'
import TotoalAlum from '../../components/TotalAlum'
import StudentDataTable from '../../components/StudentDataTable'
const page = () => {
  return (
    <div className='w-full flex flex-col items-start gap-4'>
      <div className="flex flex-row gap-4">
        <TotalStudent />
        <TotoalAlum />
      </div>
      <div>
        <StudentDataTable />
      </div>
    </div>
  )
}

export default page