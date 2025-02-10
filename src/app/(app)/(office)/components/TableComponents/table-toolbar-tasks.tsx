"use client"

import { Table } from "@tanstack/react-table"

import { PromoteStudentsDialog } from "../session-initiation/PromoteStudentsDialog"

interface SessionWiseStudentData {
  regdNo: string,
  studentName: string
}
interface TableToolbarTasksProps {
  table: Table<any>
}


export function TableToolbarTasks({
  table,
}: TableToolbarTasksProps) {
  return (
    <div className="flex items-center gap-2">
      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <PromoteStudentsDialog
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