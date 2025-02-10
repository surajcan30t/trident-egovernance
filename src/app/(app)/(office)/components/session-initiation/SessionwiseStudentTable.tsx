'use client'
import React from 'react'
import { DataTable } from '@/components/data-table';
import { columns } from './StudentSessionInitiationColumn';
import { DataTableToolbar } from '@/components/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { TableToolbarTasks } from '../TableComponents/table-toolbar-tasks';

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

  const { table } = useDataTable({
    data: studentData,
    columns,
  });

  return (
    <div>
      {studentData && studentData.length > 0 &&
        <DataTable table={table} >
          <DataTableToolbar fileName='Session_Promotion-Data' table={table}>
            <TableToolbarTasks table={table} />
          </DataTableToolbar>
        </DataTable>
      }
    </div>
  )
}

export default SessionwiseStudentTable