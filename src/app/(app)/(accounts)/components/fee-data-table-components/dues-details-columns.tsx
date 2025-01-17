'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import { useParticulars } from '@/app/(app)/(accounts)/components/FeeDetailsFilterProvider';
import { StudentDuesDetails } from '@/app/(app)/(accounts)/feecollection-schemas/schema';
// import { DataTableFilterField } from '@/../../types/types';
// import { useState } from 'react';

type FilterFields = {
  [key: string]: number[] | string[]
}

function FilterFields() {
  const { branches } = useParticulars();
  const filterFields: FilterFields = {
    'regdYear': [1, 2, 3, 4],
    'course': Array.from(Object.keys(branches)),
    'branch': Array.from(Object.values(branches).flatMap(branchObj =>
      Object.values(branchObj).map(b => b.branchCode)
    ))
  }
  return filterFields
}
export const columns: ColumnDef<StudentDuesDetails>[] = [
  {
    accessorKey: 'regdNo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Registration No." />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('regdNo')}
          </span>
        </div>
      );
    },
    footer: 'Total',
  },
  {
    accessorKey: 'name',
    header: () => <div className="">Name</div>,
    cell: ({ row }) => <div className="">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'regdYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Regd Year" />
    ),
    cell: ({ row }) => {
      const filterFields = FilterFields(); // Store the result in a variable
      const filteredRegdYear = filterFields['regdYear'].find(
        (regdYear) => Number(regdYear) === Number(row.original.regdYear)
      );
      console.log('filteredregdyear', filteredRegdYear);
      if (!filteredRegdYear) return null;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.regdYear}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = Number(row.getValue(id)); // Convert to Number for comparison
      console.log('Row Value:', rowValue, 'Filter Value:', value);
      return Array.isArray(value) && value.includes(rowValue);
    },
  },
  {
    accessorKey: 'course',
    header: () => <div className="">Course</div>,
    cell: ({ row }) => {
      const course = FilterFields()['course'].find(
        (singleCourse) => singleCourse === row.getValue('course')
      )
      if (!course) return null;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {course}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'branch',
    header: () => <div className="">Branch</div>,
    cell: ({ row }) => {
      const branch = FilterFields()['branch'].find(
        (branch) => branch === row.getValue('branch')
      );

      if (!branch) return null;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {branch}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'arrearsDue',
    header: () => <div className="">Arrears Due</div>,
    cell: ({ row }) => <div className="">{row.getValue('arrearsDue')}</div>,
  },
  {
    accessorKey: 'arrearsPaid',
    header: () => <div className="">Arrears Paid</div>,
    cell: ({ row }) => <div className="">{row.getValue('arrearsPaid')}</div>,
  },
  {
    accessorKey: 'currentDuesPaid',
    header: () => <div className="">Current Dues Paid</div>,
    cell: ({ row }) => <div className="">{row.getValue('currentDuesPaid')}</div>,
  },
  {
    accessorKey: 'currentDues',
    header: () => <div className="">Current Dues</div>,
    cell: ({ row }) => <div className="">{row.getValue('currentDues')}</div>,
  },
  {
    accessorKey: 'totalPaid',
    header: () => <div className="">Total Paid</div>,
    cell: ({ row }) => <div className="">{row.getValue('totalPaid')}</div>,
  },
  {
    accessorKey: 'phNo',
    header: () => <div className="">Phone No.</div>,
    cell: ({ row }) => <div className="">{row.getValue('phNo')}</div>,
  },
  {
    accessorKey: 'parentContact',
    header: () => <div className="">Parent Contact</div>,
    cell: ({ row }) => <div className="">{row.getValue('parentContact')}</div>,
  },
  {
    accessorKey: 'totalDues',
    header: () => <div className="">Total Dues</div>,
    cell: ({ row }) => <div className="">{row.getValue('totalDues')}</div>,
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];

