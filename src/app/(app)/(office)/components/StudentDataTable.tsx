'use client'
import React, { useState } from 'react';
import { columns } from './TableComponents/StudentColumns';
import { Students } from './TableComponents/schema';
import { useDataTable } from '@/hooks/use-data-table';
import { DataTable } from '@/components/data-table';
import { DataTableToolbar } from '@/components/data-table-toolbar';
import { useParticulars } from '../../(accounts)/components/FeeDetailsFilterProvider';
import { DataTableFilterField } from '../../../../../types-global/types';


const StudentDataTable = ({ studentData }: { studentData: Students[] | undefined }) => {
  let data: Students[] = [];
  if (!data.length) data = studentData || [];
  else return

  const { branches } = useParticulars();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const studentType = ['REGULAR', 'LE']
  const currentYear = ['1', '2', '3', '4']
  const filterFields: DataTableFilterField<Students>[] = [
    {
      id: 'course',
      label: 'Course',
      options: Object.keys(branches).map((course) => ({
        value: course,
        label: course
      }))
    },
    {
      id: 'branchCode',
      label: "Branch",
      options: selectedCourses.length > 0
        ? selectedCourses.flatMap(course =>
          Object.values(branches[course]).map(branchInfo => ({
            value: branchInfo.branchCode,
            label: `${branchInfo.branchCode} (${course})`  // Adding course name for clarity
          }))
        )
        : []
    },
    {
      id: 'currentYear',
      label: 'Current Year',
      options: currentYear.map((currentYear) => ({
        value: currentYear,
        label: currentYear
      }))
    },
    {
      id: 'studentType',
      label: 'Student Type',
      options: studentType.map((studentType) => ({
        value: studentType,
        label: studentType
      }))
    }
  ]


  const { table } = useDataTable({
    data,
    columns,
    onFilterChange: (filters) => {
      const courseFilter = filters.find(f => f.id === 'course');
      if (courseFilter) {
        const courseValues = Array.isArray(courseFilter.value)
          ? courseFilter.value
          : [courseFilter.value];
        setSelectedCourses(courseValues);
      }
    }
  });
  return (
    <div className="container mx-auto w-full">
      <DataTable table={table} >
        <DataTableToolbar fileName='Student-Data' table={table} filterFields={filterFields}></DataTableToolbar>
      </DataTable>
    </div>
  );
};

export default StudentDataTable;
