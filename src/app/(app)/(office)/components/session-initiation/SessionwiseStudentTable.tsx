import React from 'react'
import { DataTable } from '@/app/(app)/(office)/components/TableComponents/data-table';
import { columns } from './StudentSessionInitiationColumn';

interface SessionWiseStudentData {
  regdNo: string,
  studentName: string
}

const SessionwiseStudentTable = (
  {
    studentData
  }: {
    studentData: SessionWiseStudentData[]
  }
) => {

  return (
    <div>
      {studentData && studentData.length > 0 && <DataTable actions={[]} columns={columns} data={studentData} />}
    </div>
  )
}

export default SessionwiseStudentTable