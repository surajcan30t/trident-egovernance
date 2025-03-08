"use client"

import { Table } from "@tanstack/react-table"

import { PromoteStudentsDialog } from "../session-initiation/PromoteStudentsDialog"

interface SessionWiseStudentData {
  regdNo: string,
  studentName: string
}
interface TableToolbarTasksProps {
  table: Table<any>
  type: string
}


export function TableToolbarTasks({
  table,
  type
}: TableToolbarTasksProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <PromoteStudentsDialog
          type={type}
          studentData={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          unSelectedStudentData={table
            .getFilteredRowModel().rows.filter(row => !row.getIsSelected()).map(row => row.original)
          }
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
    </div>
  )
}